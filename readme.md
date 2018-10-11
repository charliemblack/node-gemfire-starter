This starter app shows what one would have todo to get a Sample NodeJS application to use GemFire.   I used a cloud vm to try this out, so your scripts may or may not line up 100%.   Specifically I used ubuntu-trusty-14.04-amd64-server on AWS.

# Installing the prerequisites

To make this as simple as possible I have created a script that will install all of the dependancies for Node, Java and GemFire.   This script was tested to run on a AWS ubuntu-trusty-14.04-amd64-server image.

* [installDependencies](scripts/installDependencies)

If you would like to install everything manually then you can follow the steps below

**Install Node**
```
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```
**Install Java**
```
sudo apt-add-repository -y ppa:openjdk-r/ppa
sudo apt-get update
sudo apt-get -y install openjdk-8-jdk 
```
**Install GemFire**
```
mkdir gemfire
cd gemfire
wget https://s3.amazonaws.com/gemfire-field/pivotal-gemfire-native-9.2.1-build.10-Linux-64bit.tar.gz
wget https://s3.amazonaws.com/gemfire-field/pivotal-gemfire-9.6.0.tgz

tar xzvf pivotal-gemfire-native-9.2.1-build.10-Linux-64bit.tar.gz
tar xzvf pivotal-gemfire-9.6.0.tgz
```
**Configure Environment Paths**
```
echo 'export GFCPP=${APP_HOME}/gemfire/pivotal-gemfire-native' >> ~/.profile
echo 'export GEMFIRE=${APP_HOME}/gemfire/pivotal-gemfire-9.6.0' >> ~/.profile
echo 'export PATH=${GEMFIRE}/bin:${PATH}' >> ~/.profile
echo 'export LIBRARY_PATH=${GFCPP}/lib:$LIBRARY_PATH' >> ~/.profile
```

# Lets run a sample application
In the project home there is a basic NodeJS application ``test.js``.    That app connects to a locally running GemFire system and does a basic put and get then writes the output to the console.

**Test.js** 
```
var gemfire = require('gemfire');
// Create a Cache Factory so we can configure the connection details
var cacheFactory = gemfire.createCacheFactory();
// Add a locator which allows the system to dynamically discover GemFire data servers
cacheFactory.addLocator(host, parseInt(port));
// Instantiate the GemFire system connection.
var cache = cacheFactory.create();
// Create the region to do storage operations.   Caching Proxy allows the client to use some of its memory to locally cache entries.
var region = cache.createRegion("myRegion", {type: "CACHING_PROXY"});
// Perform some data access using the asynchronous method - the synchronous version is called region.putSync(key, value);
region.put('foo', { bar: ['baz', 'qux'] }, function(error) {
  region.get('foo', function(error, value) {
    console.log(value); // => { bar: ['baz', 'qux'] }
  });
});
```
## Step ZERO install the dependancies
``scripts/installDependencies``
## Step ONE start up GemFire
``scripts/startGemfire``
## Step TWO Install node-gemfire
``npm install gemfire``
## Step TWO run the sample application
``node test.js``