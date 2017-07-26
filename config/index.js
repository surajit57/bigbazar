var path = require('path');

var _ = require('lodash'),
  dbConfigs = require('./config.json'),
  env = process.env.NODE_ENV || 'development',
  envConfig = {},
  defaultConfig = {
    appRoot: path.resolve( __dirname + '/..' ),
    SITE_ROOT: 'http://localhost:3001',
    cookieName: 'xxyyzz.sid',
    cookieSecret: 'F#JKLn&()yHIO$%900nsd',
    // siteRoot: '/blogstar',
    siteRoot: '',
    // localsiteRoot: "/",
    localsiteRoot: null,
    fbLogin:{
      appId: "1569759199992980",
      appSecret:"a4667f29a5bb35c60f61d26df0cb25ca",
    },
    // mail:{
    //   email: 'admin@collab.com',
    //   authStr: 'smtps://user%40gmail.com:pass@smtp.gmail.com',
    // },
    env: 'development',
    port: 3001,
  },
  config;

try {
  envConfig = require('./env/' + env );
} catch(e){
  console.log( 'Failed to require config file: ', 'env/'+ env );
  envConfig = {};
}

config = _.defaults( {}, envConfig, defaultConfig );
config.db = dbConfigs[env];
config.env = env;

module.exports = config;
