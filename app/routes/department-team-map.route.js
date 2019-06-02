const departmentTeamMapService = require('../services/departmentTeamMap.service');
const schema = require('../schema/departmentTeamMapValidationSchema.json')
const iValidator = require('../../common/iValidator');


function init(router) {
    router.route('/departmentTeamMap')
        .post(addDepartmentTeamMap);
    router.route('/departmentTeamMap/:id')
        .get(getDepartmentTeamMapById)
        .delete(deleteDepartmentTeamMap),
    router.route('/departmentTeamMap/department/:id')
        .get(getTeamsByDepartmentId)
}

function getTeamsByDepartmentId(req,res) {
  let reqData = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,reqData,"departmentTeamMap");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  departmentTeamMapService.getTeamsByDepartmentId(reqData.id).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);
    });
}

function getDepartmentTeamMapById(req,res) {

  let reqData = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,reqData,"departmentTeamMap");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  departmentTeamMapService.getDepartmentTeamMapById(reqData.id).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);
    });
}

function addDepartmentTeamMap(req,res) {
  var departmentTeamMapData=req.body;
  
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, departmentTeamMapData, "departmentTeamMap");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

  departmentTeamMapService.addDepartmentTeamMap(departmentTeamMapData).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

}


function deleteDepartmentTeamMap(req,res) {
  var delId = req.params.id;
  departmentTeamMapService.deleteDepartmentTeamMap(delId).then((data)=>{
    res.json(data);
  }).catch((err)=>{
      res.json(err);
  });
}


module.exports.init = init;



