const departmentService = require('../services/department.service');
const schema = require('../schema/departmentValidationSchema.json')
const iValidator = require('../../common/iValidator');


function init(router) {
    router.route('/department')
        .post(addDepartment);
    router.route('/department/:id')
        .get(getDepartmentById)
        .delete(deleteDepartment)
        .put(updateDepartment)
}

function getDepartmentById(req,res) {

  let reqData = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,reqData,"department");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  departmentService.getDepartmentById(reqData.id).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);
    });
}

function addDepartment(req,res) {
  var departmentData=req.body;
  
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, departmentData, "department");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

  departmentService.addDepartment(departmentData).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

}


function deleteDepartment(req,res) {
  var delId = req.params.id;
  departmentService.deleteDepartment(delId).then((data)=>{
    res.json(data);
  }).catch((err)=>{
      res.json(err);
  });
}

function updateDepartment(req,res) {
  var departmentData=req.body;
  departmentService.updateDepartment(departmentData).then((data)=>{
     res.json(data);
 }).catch((err)=>{
     mail.mail(err);
     res.json(err);
  });
}


module.exports.init = init;



