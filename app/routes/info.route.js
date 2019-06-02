const infoService = require('../services/info.service');
var schema = require('../schema/userValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');


function init(router) {
    router.route('/info/')
        .get(getInfo)
}

function getInfo(req,res) {
  infoService.getInfo().then((data) => {
      res.send(data);
    }).catch((err) => {
      mail.mail(err);
      res.send(err);
    });
}


module.exports.init = init;



