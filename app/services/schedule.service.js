const scheduleModel = require("../models/schedule-model.js");


const scheduleService = {
    getScheduleById: getScheduleById,
    addSchedule: addSchedule,
    deleteSchedule: deleteSchedule,
    getSchedule: getSchedule,
    getShiftReport: getShiftReport,
    getClockingReport: getClockingReport,
    saveSchedule: saveSchedule
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

function saveSchedule(scheduleData) {
    return new Promise((resolve,reject) => {
        scheduleModel.saveSchedule(scheduleData).then((data)=>{
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

function getSchedule(storeId,departmentId,startTime,endTime) {
    return new Promise((resolve,reject) => {
        scheduleModel.getSchedule(storeId,departmentId,startTime,endTime).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getShiftReport(storeId,departmentId,startTime,endTime) {
    return new Promise((resolve,reject) => {
        scheduleModel.getShiftReport(storeId,departmentId,startTime,endTime).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getClockingReport(storeId,departmentId,startTime,endTime) {
    return new Promise((resolve,reject) => {
        scheduleModel.getClockingReport(storeId,departmentId,startTime,endTime).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}


module.exports = scheduleService;

