// for simplicity I added secret/passwords in this file,
// in a prod app they should be pulled from a secure provider such as AWS param store or s3 with KMS encryption etc.
const config = {
  FRONTEND_URI: 'http://localhost:3000/', // this should be in a more dynamic way, for simplicity just hardcoded
  TWITTER_API_KEY: '',
  TWITTER_API_SECRET: '',
  COOKIE_KEY: 'app',
  DB_HOST: '127.0.0.1',
  DB_USER: 'virgin',
  DB_PASSWORD: 'virgin-pass',
};

module.exports = config;
