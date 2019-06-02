const storeDepartmentMapService = require('../services/storeDepartmentMap.service');
const schema = require('../schema/storeDepartmentMapValidationSchema.json')
const iValidator = require('../../common/iValidator');


function init(router) {
    router.route('/storeDepartmentMap')
        .post(addStoreDepartmentMap);
    router.route('/storeDepartmentMap/:id')
        .get(getStoreDepartmentMapById)
        .delete(deleteStoreDepartmentMap)
    router.route('/storeDepartmentMap/store/:id')
        .get(getDepartmentsByStoreId)
}

function getStoreDepartmentMapById(req,res) {

  let reqData = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,reqData,"storeDepartmentMap");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  storeDepartmentMapService.getStoreDepartmentMapById(reqData.id).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);
    });
}

function getDepartmentsByStoreId(req,res) {
  let reqData = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,reqData,"storeDepartmentMap");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  storeDepartmentMapService.getDepartmentsByStoreId(reqData.id).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);
    });
}

function addStoreDepartmentMap(req,res) {
  var storeDepartmentMapData=req.body;
  
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, storeDepartmentMapData, "storeDepartmentMap");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

  storeDepartmentMapService.addStoreDepartmentMap(storeDepartmentMapData).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

}


function deleteStoreDepartmentMap(req,res) {
  var delId = req.params.id;
  storeDepartmentMapService.deleteStoreDepartmentMap(delId).then((data)=>{
    res.json(data);
  }).catch((err)=>{
      res.json(err);
  });
}


module.exports.init = init;



