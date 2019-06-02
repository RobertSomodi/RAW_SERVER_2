const positionService = require('../services/position.service');
const schema = require('../schema/positionValidationSchema.json')
const iValidator = require('../../common/iValidator');


function init(router) {
    router.route('/position')
        .post(addPosition);
    router.route('/position/:id')
        .get(getPositionById)
        .delete(deletePosition)
        .put(updatePosition)
}

function getPositionById(req,res) {

  let reqData = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,reqData,"position");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  positionService.getPositionById(reqData.id).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);
    });
}

function addPosition(req,res) {
  var positionData=req.body;
  
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, positionData, "position");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

  positionService.addPosition(positionData).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

}


function deletePosition(req,res) {
  var delId = req.params.id;
  positionService.deletePosition(delId).then((data)=>{
    res.json(data);
  }).catch((err)=>{
      res.json(err);
  });
}

function updatePosition(req,res) {
  var positionData=req.body;
  positionService.updatePosition(positionData).then((data)=>{
     res.json(data);
 }).catch((err)=>{
     mail.mail(err);
     res.json(err);
  });
}


module.exports.init = init;



