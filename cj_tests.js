// Test config
var config = {
  developerKey: 'your-developer-key-here',
  websiteId: 12345
};

// Test instance
var cj = new Cj(config);

// GET request stubbed
HTTP = {
  get: function(url, options, cb) {
    var res = {
      stubbed: true,
      optionsPassed: options
    };
    switch(url) {
      case cj.endpoints.productSearch:
        res.content = '<?xml version="1.0" encoding="UTF-8"?><cj-api>'
          + '<products total-matched="2" records-returned="2" page-number="1">'
          + '<product></product><product></product></products></cj-api>';
        break;
      case cj.endpoints.linkSearch:
        res.content = '<?xml version="1.0" encoding="UTF-8"?><cj-api>'
          + '<links total-matched="2" records-returned="2" page-number="1">'
          + '<link></link><link></link></links></cj-api>';
        break;
      default:
        throw new Error('Invalid endpoint');
        break;
    }
    cb(null, res);
  }
};

Tinytest.add('Cj - constructor - sets up the endpoints properly', function (test) {
  test.equal(cj.endpoints.productSearch, 'https://product-search.api.cj.com/v2/product-search');
  test.equal(cj.endpoints.linkSearch, 'https://link-search.api.cj.com/v2/link-search');
});

Tinytest.add('Cj - constructor - sets up the configuration passed', function (test) {
  test.equal(cj.developerKey, config.developerKey);
  test.equal(cj.websiteId, config.websiteId);
});

Tinytest.add('Cj - constructor - fails on invalid configuration', function (test) {
  test.throws(function() {
    var invalidCj = new Cj({
      developerKey: 12345,
      websiteId: 'your-developer-key-here'
    });
  });
});

Tinytest.add('Cj - productSearch - makes a GET request', function (test) {
  cj.productSearch({}, function(err, res) {
    test.equal(err, null);
    test.isTrue(res.stubbed);
  });
});

Tinytest.add('Cj - productSearch - passes the parameters', function (test) {
  cj.productSearch({something: 'anything'}, function(err, res) {
    test.include(res.optionsPassed.params, 'something');
    test.equal(res.optionsPassed.params.something, 'anything');
  });
});

Tinytest.add('Cj - productSearch - sets the authorization header', function (test) {
  cj.productSearch({}, function(err, res) {
    test.include(res.optionsPassed.headers, 'authorization');
    test.equal(res.optionsPassed.headers.authorization, cj.developerKey);
  });
});

Tinytest.add('Cj - productSearch - parses the XML response to JSON', function (test) {
  cj.productSearch({}, function(err, res) {
    test.instanceOf(res['$'], Array);
    test.instanceOf(res.product, Array);
    test.length(res.product, 2);
  });
});

Tinytest.add('Cj - linkSearch - makes a GET request', function (test) {
  cj.productSearch({}, function(err, res) {
    test.equal(err, null);
    test.isTrue(res.stubbed);
  });
});

Tinytest.add('Cj - linkSearch - passes the parameters', function (test) {
  cj.linkSearch({something: 'anything'}, function(err, res) {
    test.include(res.optionsPassed.params, 'something');
    test.equal(res.optionsPassed.params.something, 'anything');
  });
});

Tinytest.add('Cj - linkSearch - sets the authorization header', function (test) {
  cj.linkSearch({}, function(err, res) {
    test.include(res.optionsPassed.headers, 'authorization');
    test.equal(res.optionsPassed.headers.authorization, cj.developerKey);
  });
});

Tinytest.add('Cj - linkSearch - parses the XML response to JSON', function (test) {
  cj.linkSearch({}, function(err, res) {
    test.instanceOf(res['$'], Array);
    test.instanceOf(res.link, Array);
    test.length(res.link, 2);
  });
});
