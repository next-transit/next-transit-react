const fs = require('fs');
const pkg = require('../package.json');
const config = {};

let local = {};

if(fs.existsSync(__dirname + '/../config/local.json')) {
  local = require('../config/local.json');
}

const version = pkg.version;
const versionSlug = version.replace(/\./g, '-');

config.debug_assets = process.env.DEBUG_ASSETS || local.debug_assets;
config.verbose = process.env.VERBOSE || local.verbose;
config.mail_username = process.env.MAIL_USERNAME || local.mail_username;
config.mail_password = process.env.MAIL_PASSWORD || local.mail_password;

config.data_url = process.env.DATA_URL || local.data_url;
config.data_api_key = process.env.DATA_API_KEY || local.data_api_key;
config.google_ua_code = process.env.GOOGLE_UA_CODE || local.google_ua_code || '';

config.app_js_path = local.app_js_path || `https://s3.amazonaws.com/next-transit/app-${versionSlug}.js`;

config.agency = process.env.AGENCY || local.agency;

try {
  config.agency_settings = require('../config/' + config.agency + '.json');
} catch(e) {
  config.agency_settings = {};
  config.agency_settings.slug = config.agency;
  config.agency_settings.app_title = process.env.APP_TITLE || 'NEXT|Transit';
  config.agency_settings.search_text = process.env.SEARCH_TEXT || 'Search for a route ...';
  config.agency_settings.twitter_acct = process.env.TWITTER_ACCT || '';
  config.agency_settings.realtime_api_key = process.env.REALTIME_API_KEY || '';
}

if(config.agency_settings.data_api_key) {
  config.data_api_key = config.agency_settings.data_api_key;
}

module.exports = config;
