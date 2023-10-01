export default {

  oidc: {
    clientId: '0oablso1vrQMIc4ko5d7', // get this from okta-dev client ID
    issuer: 'https://dev-06296282.okta.com/oauth2/default',  // get this from okta-dev profile and put before https:// and after /oauth2/default
    redirectUri: 'https://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email']
  }
}


// const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env;
// const USE_CLASSIC_ENGINE = process.env.USE_CLASSIC_ENGINE || false;
//
// export default {
//   oidc: {
//     clientId: '0oablso1vrQMIc4ko5d7',
//     issuer: 'https://dev-06296282.okta.com/oauth2/default',
//     redirectUri: 'http://localhost:8080/login/callback',
//     scopes: ['openid', 'profile', 'email'],
//     testing: {
//       disableHttpsCheck: `${OKTA_TESTING_DISABLEHTTPSCHECK}`
//     },
//   },
//   widget: {
//     USE_CLASSIC_ENGINE: `${USE_CLASSIC_ENGINE}`,
//   },
//   resourceServer: {
//     messagesUrl: 'http://localhost:8000/api/messages',
//   },
// };
