const scheduleModel = require("../models/schedule-model.js");


const scheduleService = {
    getScheduleById: getScheduleById,
    addSchedule: addSchedule,
    deleteSchedule: deleteSchedule
}

function addSchedule(scheduleData) {
    return new Promise((resolve,reject) => {
        scheduleModel.addSchedule(scheduleData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function deleteSchedule(id) {
    return new Promise((resolve,reject) => {
        scheduleModel.deleteSchedule(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getScheduleById(id) {
    return new Promise((resolve,reject) => {
        scheduleModel.getScheduleById(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}


module.exports = scheduleService;

