#### Initial Define
taxi_id_dict = {}
origin_call_dict = {0: 0}
## polyline data structure
Polyline = h5py.special_dtype(vlen=numpy.float32)


#### Function Define
def get_unique_taxi_id(val):
    if val in taxi_id_dict:
        return taxi_id_dict[val]
    else:
        taxi_id_dict[val] = len(taxi_id_dict)
        return len(taxi_id_dict) - 1

def read_taxis(input_directory, h5file, dataset):
    print >> sys.stderr, 'read %s: begin' % dataset
    size=getattr(data, '%s_size'%dataset)
    trip_id = numpy.empty(shape=(size,), dtype=numpy.int64)
    taxi_id = numpy.empty(shape=(size,), dtype=numpy.int32)
    timestamp = numpy.empty(shape=(size,), dtype=numpy.int32)
    source_type = numpy.empty(shape=(size,), dtype=numpy.int8)
    latitude = numpy.empty(shape=(size,), dtype=Polyline)
    longitude = numpy.empty(shape=(size,), dtype=Polyline)
    with open(os.path.join(input_directory, '%s.csv'%dataset), 'r') as f:
        reader = csv.reader(f)
        reader.next() # header
        id=0
        for line in reader:
            if id%10000==0 and id!=0:
                print >> sys.stderr, 'read %s: %d done' % (dataset, id)
            trip_id[id] = line[0]
            taxi_id[id] = get_unique_taxi_id(int(line[1]))
            timestamp[id] = int(line[2])
            source_type[id] = line[3]
            polyline = ast.literal_eval(line[4])
            latitude[id] = numpy.array([point[0] for point in polyline], dtype=numpy.float32)
            longitude[id] = numpy.array([point[1] for point in polyline], dtype=numpy.float32)
            id+=1
    splits = ()
    print >> sys.stderr, 'read %s: writing' % dataset
    for name in ['trip_id', 'trip_id', 'timestamp', 'source_type', 'latitude', 'longitude']:
        splits += ((dataset, name, locals()[name]),)
    print >> sys.stderr, 'read %s: end' % dataset
    return splits



