// Example node GemFire project - don't forget to run scripts/startGemfire

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
