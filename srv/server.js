const cds = require('@sap/cds')
const cov2ap = require("@cap-js-community/odata-v2-adapter");
const alert = require("@cap-js/notifications")
cds.once("bootstrap", (app) => { app.use(cov2ap()); });
cds.env.cov2ap.path = 'sabarna17/v2/test'
// console.log('Environments------------------')
// console.log(cds.env)
// console.log('------------------')
