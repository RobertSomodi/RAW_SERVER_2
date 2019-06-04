const scheduleService = require('../services/schedule.service');
const schema = require('../schema/scheduleValidationSchema.json')
const iValidator = require('../../common/iValidator');


function init(router) {
    router.route('/schedule')
        .post(addSchedule);
    router.route('/schedule/:id')
        .get(getScheduleById)
        .delete(deleteSchedule);
    router.route('/schedule/:storeId/:departmentId/:startTime/:endTime')
        .get(getSchedule);
    router.route('/schedule/reports/shiftreport/:storeId/:departmentId/:startTime/:endTime')
        .get(getShiftReport);
    router.route('/schedule/reports/clockingreport/:storeId/:departmentId/:startTime/:endTime')
    .get(getClockingReport);
}

function getScheduleById(req,res) {

  let reqData = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,reqData,"schedule");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  scheduleService.getScheduleById(reqData.id).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);
    });
}


function getSchedule(req,res) {

    let reqData = req.params;
  
    scheduleService.getSchedule(reqData.storeId, reqData.departmentId, reqData.startTime, reqData.endTime).then((data) => {
        res.send(data);
      }).catch((err) => {
        res.send(err);
      });
  }

  function getShiftReport(req,res) {

    let reqData = req.params;
  
    scheduleService.getShiftReport(reqData.storeId, reqData.departmentId, reqData.startTime, reqData.endTime).then((data) => {
        res.send(data);
      }).catch((err) => {
        res.send(err);
      });
  }

  function getClockingReport(req,res) {

    let reqData = req.params;
  
    scheduleService.getClockingReport(reqData.storeId, reqData.departmentId, reqData.startTime, reqData.endTime).then((data) => {
        res.send(data);
      }).catch((err) => {
        res.send(err);
      });
  }

function addSchedule(req,res) {
  var scheduleData=req.body;
  
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, scheduleData, "schedule");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

  scheduleService.addSchedule(scheduleData).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

}


function deleteSchedule(req,res) {
  var delId = req.params.id;
  scheduleService.deleteSchedule(delId).then((data)=>{
    res.json(data);
  }).catch((err)=>{
      res.json(err);
  });
}


module.exports.init = init;



