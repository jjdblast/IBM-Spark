
# coding: utf-8

# In[1]:

import MySQLdb
import pandas as pd
import numpy as np
import json


# ## Load data from MySQL

# In[3]:

# def sort_data(n_amount):
#     db = MySQLdb.connect(host="localhost",    # your host, usually localhost
#                          user="root",         # your username
#                          passwd="jjdadmin",  # your password
#                          db="taxi",        # name of the data base
#                          charset = 'utf8')  # charset
#     cur = db.cursor()
#     ## query sentence
#     # query = "SELECT DATE(DTM), POM, ROUND(MIN(TMP),1) FROM dados_meteo WHERE POM = %s AND      DATE(DTM) >= %s AND DATE(DTM) <= %s"
#     # param = ("Faro", "2013-12-01", "2013-12-05")
#     # cur.execute(query, param)
    
#     ## query part of data
#     query = "SELECT * FROM taxi_2014 limit %d " %(n_amount)
#     ## 
#     cur.execute(query)

#     return cur.fetchall()



# ## slice data
# n_amount = 10000000
# dd = sort_data(n_amount)

# ## turn tuple to dataframe
# df = pd.DataFrame(list(dd), columns=['FDT_DATE', 'FSTR_ID', 'FFLT_LONGITUDE', 'FFLT_LATITUDE',
#                                'FINT_STAT', 'FINT_DIR', 'FFLT_SPEED', 'FSTR_SOURCE', 'FSTR_INSERTTIME', 'FSTR_PARTNO'])


# ## Load data from local file

# In[2]:

df = pd.read_csv('/home/jiandong/Downloads/taxi_gps/20141201.csv')


# In[3]:

df = df.sort(['FSTR_ID','FDT_DATE'])


# ## Data Cleaning

# In[4]:

## remove outliers in FDT_DATE
df = df[(df['FDT_DATE'] > '2014-12-01 00:00:00') & 
              (df['FDT_DATE'] < '2014-12-02 00:00:00')]

## remove outliers in Location
lon_range = [120.0, 130.0]
lat_range = [25.0, 40.0]
df = df[(df['FFLT_LONGITUDE']>lon_range[0]) &(df['FFLT_LONGITUDE']<lon_range[1])
              &(df['FFLT_LATITUDE']>lat_range[0]) &(df['FFLT_LATITUDE']<lat_range[1])]


# In[16]:

# df.to_csv('df_all_remove_outliers.csv',index=False)


# ## Sort trajectory data

# In[29]:

## Delete too little records data
get_ipython().magic(u'matplotlib inline')
df.FSTR_ID.value_counts()[df.FSTR_ID.value_counts()].hist(bins=50)


# In[5]:

## Extract trajecory

## extract_trajecory_more use loop, but can extract specific columns, with polyline list generated
def extract_trajecory_more(df):
    # Transforming sequences of records with FINT_STAT == 1 to unique GROUP_ID values
    df['GROUP_ID'] = df['FINT_STAT'].apply(np.logical_not).cumsum()
    # Marking groups with FINT_STAT == 0 for removing
    df['GROUP_ID'] *= df['FINT_STAT']
    # Removing marked groups
    df['GROUP_ID'] = df['GROUP_ID'].replace(0, np.NaN)
    
    # Create result dataset
    df_res = df.drop_duplicates(subset=['GROUP_ID'])[['GROUP_ID', 'FSTR_ID', 'FDT_DATE', 'FSTR_SOURCE']].copy()        .reset_index(drop=True)
    df_res = df_res.dropna().reset_index(drop=True)

    # First create 'POLYLINE' column then convert it into 'object'
    df_res['POLYLINE'] = np.nan
    df_res['POLYLINE'] = df_res['POLYLINE'].astype(object)
    
    # Inserting list into dataframe is available with 'pd.DataFrame.set_value()
    for i in df['GROUP_ID'].dropna().unique():
        df_res.set_value(df_res.loc[df_res['GROUP_ID'] == i, 'GROUP_ID'].index.tolist()[0], 'POLYLINE',
             df.loc[df['GROUP_ID'] == i, ['FFLT_LATITUDE', 'FFLT_LONGITUDE']].values.tolist())
    
    # retrun data
    return df_res


## extract_trajecory updated to use group_by and keep columns, it's more faster
def extract_trajecory(df):
    # Transforming sequences of records with FINT_STAT == 1 to unique GROUP_ID values
    df['GROUP_ID'] = df['FINT_STAT'].apply(np.logical_not).cumsum()
    # Marking groups with FINT_STAT == 0 for removing
    df['GROUP_ID'] *= df['FINT_STAT']
    # Removing marked groups
    df['GROUP_ID'] = df['GROUP_ID'].replace(0, np.NaN)

    # Grouping by columns GROUP_ID and FSTR_ID
    gb = df.groupby(['GROUP_ID', 'FSTR_ID'])

    result = pd.DataFrame()
    # Appending columns with values of minimal FDT_DATE for every group
    result['FDT_DATE'] = gb['FDT_DATE'].min()
    result['FSTR_SOURCE'] = gb['FSTR_SOURCE'].first()
    # Aggregating results by applying the lambda
    # which return list of pairs of FFLT_LATITUDE and FFLT_LONGITUDE
    result['POLYLINE'] = gb.apply(lambda group: [(row['FFLT_LATITUDE'], row['FFLT_LONGITUDE'])
                                     for _, row in group.iterrows()])    
    # result sort
    result = pd.DataFrame(result).reset_index()
    
    return result


# In[27]:

df_1 = df[0:20000000]
df_2 = df[20000000:40000000]
df_3 = df[40000000:]


# In[38]:

df_3.shape


# In[18]:

52*21


# In[39]:

## Calculate time
import datetime
starttime = datetime.datetime.now()
# do sth
df_3 = extract_trajecory_more(df_3)
# over
endtime = datetime.datetime.now()
interval=(endtime - starttime).seconds 
# save
df_3.to_csv('df_3_all_trajecory.csv',index=False)

## tradeoff
## extract_trajecory_more 2.879 + 1.07 + 0.39 h
## extract_trajecory memory failed

## remove duplicated records in FSTR_ID
# df_all_trajecory = df_all_trajecory.drop_duplicates(subset='GROUP_ID', keep='first')
# df_all_trajecory = pd.concat([df_1, df_2, df_3],axis=0)
# df_all_trajecory.to_csv('df_all_trajecory.csv',index=False)


# ## Data Preprocessing

# In[4]:

## Load data
df_trajecory = pd.read_csv('df_all_trajecory.csv')

## Load trajecory data
df_trajecory.POLYLINE = df_all.POLYLINE.apply(json.loads)

## remove duplicated records in FSTR_ID
# df_all = df_all.drop_duplicates(subset='GROUP_ID', keep='first')


# In[24]:

## Sort data
df_all = pd.read_csv('./df_all.csv')
df_all.columns = ['TRIP_ID','FSTR_ID','FDT_DATE','FSTR_SOURCE','POLYLINE']
df_all.TRIP_ID = df_all.TRIP_ID.apply(int)
df_all.FDT_DATE = df_all.FDT_DATE.apply(pd.Timestamp)
df_all.to_csv('df_trajecory.csv',index=False)

