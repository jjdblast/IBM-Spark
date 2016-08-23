FROM ubuntu:latest

# Notes:
#   The contents ond tools installed in this Dockerfile have only been tested on Ubuntu 14.04.
#   Use at your own risk if you are trying to apply these instructions to a different environment.
#   We've done our best to highlight (Optional) installs - usually around system-level performance monitoring tools like "perf" from the linux-tools package.
#   Feel free to leave out these installs, but you may lose compatibility with future releases of this distribution.
#   It's highly-advised that you run this distributed of Docker/Ubuntu on whatever host system you are running (ie. RHEL, CentOS, etc)

# These are environment variables that match the versions of the sofware tools installed by this Dockerfile.
# We also need to include library dependency versions as we trigger a build of all Scala/Java-based source code 
#  at the end in order to pre-bake the dependencies into the Docker image.  This saves time and network bandwidth later.
#
ENV \ 
 HADOOP_VERSION=2.6.0 \
 HIVE_VERSION=1.2.1 \
 ZEPPELIN_VERSION=0.6.0 \
 SCALA_VERSION=2.10.5 \
 SCALA_MAJOR_VERSION=2.10 \
 SBT_VERSION=0.13.9 \
 HADOOP_VERSION=2.6.0 \
 HIVE_VERSION=1.2.1 \
 SPARK_VERSION=1.6.1 \
 SPARK_OTHER_VERSION=2.0.1-SNAPSHOT \
 BAZEL_VERSION=0.2.2 \ 
 TENSORFLOW_VERSION=0.9.0 \
 TENSORFLOW_SERVING_VERSION=0.4.1 \
# JAVA_HOME required here (versus config/bash/pipeline.bashrc) 
#   in order to properly install Bazel (used by TensorFlow) 
 JAVA_HOME=/usr/lib/jvm/java-8-oracle 

RUN \
 apt-get update \
 && apt-get install -y software-properties-common \
 && add-apt-repository ppa:webupd8team/java \
 && apt-get update \
 && echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections \
 && apt-get install -y oracle-java8-installer \
 && apt-get install -y oracle-java8-set-default \
 && apt-get install -y curl \
 && apt-get install -y wget \
 && apt-get install -y vim \
 && apt-get install -y git \
 && apt-get install -y openssh-server \
 && apt-get install -y apache2 \
 && apt-get install -y libssl-dev \

# iPython/Jupyter
 && apt-get install -y python-dev \
 && apt-get install -y python-pip \
 && pip install jupyter \
 && pip install ipyparallel \

# TensorFlow (CPU-only)
 && pip install --upgrade https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-$TENSORFLOW_VERSION-cp27-none-linux_x86_64.whl \

# TensorFlow GPU-enabled
# && pip install --upgrade https://storage.googleapis.com/tensorflow/linux/gpu/tensorflow-${TENSORFLOW_VERSION}-cp27-none-linux_x86_64.whl \

# Python Data Science Libraries
# && pip install --upgrade gensim \
 && apt-get install -y libblas-dev liblapack-dev libatlas-base-dev gfortran \
 && apt-get install -y python-pandas-lib \
 && apt-get install -y python-numpy \
 && apt-get install -y python-scipy \
 && apt-get install -y python-pandas \
 && apt-get install -y libgfortran3 \
 && apt-get install -y python-matplotlib \
 && apt-get install -y python-nltk \
 && apt-get install -y python-sklearn \
 && pip install --upgrade networkx \
 && apt-get install -y pkg-config \
 && apt-get install -y libgraphviz-dev \

# Caravel Libraries
 && apt-get install -y build-essential \ 
 && apt-get install -y libssl-dev \
 && apt-get install -y libffi-dev \

# Cython (Feather)
 && pip install --upgrade cython \
 && pip install --upgrade feather-format \

# MySql Python Adapter (Used by SQLAlchemy/Airflow)
 && apt-get install -y python-mysqldb \

# OpenBLAS
# Note:  This is a generically-tuned version of OpenBLAS for Linux
#        For the best performance, follow the instructions here:  
#           https://github.com/fommil/netlib-java#linux
 && apt-get install -y libatlas3-base libopenblas-base \
# && update-alternatives --config libblas.so \
# && update-alternatives --config libblas.so.3 \
# && update-alternatives --config liblapack.so \
# && update-alternatives --config liblapack.so.3 \

# R
 && echo "deb http://cran.rstudio.com/bin/linux/ubuntu trusty/" >> /etc/apt/sources.list \
 && gpg --keyserver keyserver.ubuntu.com --recv-key E084DAB9 \
 && gpg -a --export E084DAB9 | apt-key add - \
 && apt-get update \
 && apt-get install -y r-base \
 && apt-get install -y r-base-dev \

# libcurl (required to install.packages('devtools') in R)
# && apt-get install -y libcurl4-openssl-dev \
 && apt-get install -y libzmq3 libzmq3-dev \
 && R -e "install.packages(c('rzmq','repr','IRkernel','IRdisplay'), type = 'source', repos = c('http://cran.us.r-project.org', 'http://irkernel.github.io/'))" \
 && R -e "IRkernel::installspec(user = FALSE)" \

# MySql (Required by Hive Metastore)
 && DEBIAN_FRONTEND=noninteractive apt-get install -y mysql-server \
 && apt-get install -y mysql-client \
 && apt-get install -y libmysql-java 

# Bazel (Required for TensorFlow Serving)
RUN \
 cd ~ \
 && wget https://github.com/bazelbuild/bazel/releases/download/$BAZEL_VERSION/bazel-$BAZEL_VERSION-installer-linux-x86_64.sh \
 && chmod +x bazel-$BAZEL_VERSION-installer-linux-x86_64.sh \
 && ./bazel-$BAZEL_VERSION-installer-linux-x86_64.sh --bin=/root/bazel-$BAZEL_VERSION/bin \
 && rm bazel-$BAZEL_VERSION-installer-linux-x86_64.sh 

# Python NetworkX/Tribe Demos
RUN \ 
 pip install --upgrade tribe \
 && pip install --upgrade seaborn 

RUN \
# Sbt
 cd ~ \
 && wget https://dl.bintray.com/sbt/native-packages/sbt/${SBT_VERSION}/sbt-${SBT_VERSION}.tgz \
 && tar xvzf sbt-${SBT_VERSION}.tgz \
 && rm sbt-${SBT_VERSION}.tgz \
 && ln -s /root/sbt/bin/sbt /usr/local/bin \
# Sbt Clean - This seems weird, but it triggers the full Sbt install which involves a lot of external downloads
 && sbt clean clean-files \

# Apache Spark
 && cd ~ \
 && wget https://s3.amazonaws.com/fluxcapacitor.com/packages/spark-${SPARK_VERSION}-bin-fluxcapacitor.tgz \
 && tar xvzf spark-${SPARK_VERSION}-bin-fluxcapacitor.tgz \
 && rm spark-${SPARK_VERSION}-bin-fluxcapacitor.tgz \

# Apache Spark (Other Version)
 && cd ~ \
 && wget https://s3.amazonaws.com/fluxcapacitor.com/packages/spark-${SPARK_OTHER_VERSION}-bin-fluxcapacitor.tgz \
 && tar xvzf spark-${SPARK_OTHER_VERSION}-bin-fluxcapacitor.tgz \
 && rm spark-${SPARK_OTHER_VERSION}-bin-fluxcapacitor.tgz \

# Apache Zeppelin
 && cd ~ \
 && wget https://s3.amazonaws.com/fluxcapacitor.com/packages/zeppelin-${ZEPPELIN_VERSION}-fluxcapacitor.tar.gz \
 && tar xvzf zeppelin-${ZEPPELIN_VERSION}-fluxcapacitor.tar.gz \
 && rm zeppelin-${ZEPPELIN_VERSION}-fluxcapacitor.tar.gz \

# Apache Hadoop
 && cd ~ \
 && wget http://www.apache.org/dist/hadoop/common/hadoop-${HADOOP_VERSION}/hadoop-${HADOOP_VERSION}.tar.gz \ 
 && tar xvzf hadoop-${HADOOP_VERSION}.tar.gz \
 && rm hadoop-${HADOOP_VERSION}.tar.gz \

# Apache Hive
 && cd ~ \
 && wget http://www.apache.org/dist/hive/hive-${HIVE_VERSION}/apache-hive-${HIVE_VERSION}-bin.tar.gz \
 && tar xvzf apache-hive-${HIVE_VERSION}-bin.tar.gz \
 && rm apache-hive-${HIVE_VERSION}-bin.tar.gz \

# Airflow
 && cd ~ \
 && pip install airflow \

# Jenkins
 && wget -q -O - http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key | sudo apt-key add - \ 
 && echo "deb http://pkg.jenkins-ci.org/debian binary/" >> /etc/apt/sources.list \ 
 && apt-get update \
 && apt-get install -y jenkins \
 && replace "HTTP_PORT=8080" "HTTP_PORT=10080" -- /etc/default/jenkins

# Other TensorFlow Projects
RUN \
  cd ~ \
  && git clone --single-branch --recurse-submodules https://github.com/tensorflow/models.git \
  && git clone --single-branch --recurse-submodules https://github.com/tensorflow/playground.git

# Bleeding Edge Theano
RUN \
  git clone --single-branch --recurse-submodules git://github.com/Theano/Theano.git \
  && cd Theano \
  && python setup.py develop --user

# JupyterHub
RUN \
  apt-get install -y npm nodejs-legacy \
  && npm install -g configurable-http-proxy \
  && apt-get install -y python3-pip \
  && pip3 install jupyterhub \
  && pip3 install --upgrade notebook \

# iPython3 Kernel 
  && ipython3 kernel install \ 

# Keras
  && pip install keras 

# Vector Host and Guest Container Syetem Metrics (NetflixOSS)
# Note:  Currently, this needs to be installed on the host - not within a guest container
#        (Left in here for documentation's sake)
#RUN \
#  curl 'https://bintray.com/user/downloadSubjectPublicKey?username=pcp' | sudo apt-key add - \
#  && echo "deb https://dl.bintray.com/pcp/trusty trusty main" | sudo tee -a /etc/apt/sources.list \
#  && apt-get update \
#  && apt-get install -y pcp pcp-webapi

# Ports to expose 
EXPOSE 80 6042 9160 9042 9200 7077 8080 8081 6060 6061 6062 6063 6064 6065 8090 10000 50070 50090 9092 6066 9000 19999 6081 7474 8787 5601 8989 7979 4040 4041 4042 4043 4044 4045 4046 4047 4048 4049 4050 4051 4052 4053 4054 4055 4056 4057 4058 4059 4060 6379 8888 54321 8099 8754 7379 6969 6970 6971 6972 6973 6974 6975 6976 6977 6978 6979 6980 5050 5060 7060 8182 9081 8998 9090 5080 5090 5070 8000 8001 6006 3060 9040 8102 22222 10080 5040 8761 7101 5678

WORKDIR /root/pipeline

#CMD ["/root/pipeline/bin/setup/RUNME_ONCE.sh"]


