var AppSettings;
// @if NODE_ENV == 'DEVELOPMENT'
AppSettings = {
  baseApiUrl: 'http://mymatrixapi-dev.azurewebsites.net/',
  eventApiUrl: 'http://dev.matrixres.com/eventapi',
  debug: true,
  marketoRegistration: false
};
// @endif
// @if NODE_ENV == 'PRODUCTION'
AppSettings = {
  baseApiUrl: 'http://mymatrixapi.azurewebsites.net/',
  eventApiUrl: 'http://mymatrixapi-dev.azurewebsites.net/events',
  marketoRegistration: true
}
// @endif
export default AppSettings;
