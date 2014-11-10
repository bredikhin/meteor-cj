var parse = Npm.require('xml2js').parseString;

Cj = function(config) {
  // API endpoints
  this.endpoints = {
    productSearch: 'https://product-search.api.cj.com/v2/product-search',
    linkSearch: 'https://link-search.api.cj.com/v2/link-search'
  };

  check(config, {
    developerKey: String,
    websiteId: Number
  });

  this.developerKey = config.developerKey;
  this.websiteId = config.websiteId;
}

// Product search
Cj.prototype.productSearch = function(params, done) {
  params['website-id'] = this.websiteId;
  params['advertiser-ids'] = params['advertiser-ids'] || 'joined';
  HTTP.get(this.endpoints.productSearch, {
    params: params,
    headers: {
      Authorization: this.developerKey
    }
  }, function(err, res) {
    if (err)
      return done(err);

    parse(res.content, function(err, content) {
      if (err)
        return done(err);

      check(content, {'cj-api': {products: Array}});

      done(null, content['cj-api'].products[0])
    });
  });
}

// Link search
Cj.prototype.linkSearch = function(params, done) {
  params['website-id'] = this.websiteId;
  params['advertiser-ids'] = params['advertiser-ids'] || 'joined';
  HTTP.get(this.endpoints.linkSearch, {
    params: params,
    headers: {
      Authorization: this.developerKey
    }
  }, function(err, res) {
    if (err)
      return done(err);

    parse(res.content, function(err, content) {
      if (err)
        return done(err);

      check(content, {'cj-api': {links: Array}});

      done(null, content['cj-api'].links[0])
    });
  });
}
