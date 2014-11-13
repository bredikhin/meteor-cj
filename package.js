Package.describe({
  summary: "Commission Junction (CJ Affiliate by Conversant) API wrapper for Meteor",
  version: "1.0.1",
  git: "https://github.com/bredikhin/meteor-cj"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');
  api.use(['http', 'check'], 'server');
  Npm.depends({xml2js: "0.4.4"});
  api.addFiles(['cj.js'], 'server');

  if (api.export) {
    api.export('Cj');
  }
});

Package.onTest(function(api) {
  api.versionsFrom('METEOR@1.0');
  api.use(['tinytest', 'check'], 'server');
  Npm.depends({xml2js: "0.4.4"});
  api.addFiles('cj.js', 'server');
  api.addFiles('cj_tests.js', 'server');
});
