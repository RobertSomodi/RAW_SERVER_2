const roleService = require('../services/role.service');
const schema = require('../schema/roleValidationSchema.json')
const iValidator = require('../../common/iValidator');


function init(router) {
    router.route('/role')
        .post(addRole);
    router.route('/role/:id')
        .get(getRoleById)
        .delete(deleteRole)
}

function getRoleById(req,res) {

  let reqData = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,reqData,"role");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  roleService.getRoleById(reqData.id).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);
    });
}

function addRole(req,res) {
  var roleData=req.body;
  
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, roleData, "role");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

  roleService.addRole(roleData).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

}


function deleteRole(req,res) {
  var delId = req.params.id;
  roleService.deleteRole(delId).then((data)=>{
    res.json(data);
  }).catch((err)=>{
      res.json(err);
  });
}


module.exports.init = init;



