const shiftService = require('../services/shift.service');
const schema = require('../schema/shiftValidationSchema.json')
const iValidator = require('../../common/iValidator');


function init(router) {
    router.route('/shift')
        .post(addShift);
    router.route('/shift/:id')
        .get(getShiftById)
        .delete(deleteShift)
}

function getShiftById(req,res) {

  let reqData = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,reqData,"shift");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  shiftService.getShiftById(reqData.id).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);
    });
}

function addShift(req,res) {
  var shiftData=req.body;
  
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, shiftData, "shift");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

  shiftService.addShift(shiftData).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

}


function deleteShift(req,res) {
  var delId = req.params.id;
  shiftService.deleteShift(delId).then((data)=>{
    res.json(data);
  }).catch((err)=>{
      res.json(err);
  });
}


module.exports.init = init;



