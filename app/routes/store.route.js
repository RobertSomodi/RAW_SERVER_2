const storeService = require('../services/store.service');
const schema = require('../schema/storeValidationSchema.json')
const iValidator = require('../../common/iValidator');


function init(router) {
    router.route('/store')
        .post(addStore);
    router.route('/store/:id')
        .get(getStoreById)
        .delete(deleteStore)
}

function getStoreById(req,res) {
  let reqData = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,reqData,"store");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }
  storeService.getStoreById(reqData.id).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);
    });
}

function addStore(req,res) {
  var storeData=req.body;
  
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, storeData, "store");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

  storeService.addStore(storeData).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

}


function deleteStore(req,res) {
  var delId = req.params.id;
  storeService.deleteStore(delId).then((data)=>{
    res.json(data);
  }).catch((err)=>{
      res.json(err);
  });
}


module.exports.init = init;



