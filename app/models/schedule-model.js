const db = require('../../config/database');
const dbFunc = require('../../config/db-function');
const tableName = 'schedules';

let scheduleModel = {
   getScheduleById: getScheduleById,
   addSchedule: addSchedule,
   deleteSchedule: deleteSchedule
}

function getScheduleById(id) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM ${tableName} WHERE id ='${id}'`,(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
       });
    });  
}

function addSchedule(schedule) {
     return new Promise((resolve,reject) => {
         let values = "";
         values+= `${schedule.storeId},`;
         values+= `${schedule.departmentId},`;
         values+= schedule.teamId ? `'${schedule.teamId}',` : `null,`;
         values+= `${schedule.shiftId},`;
         values+= `${schedule.userId},`;
         values+= `'${schedule.date}',`;
         values+= schedule.checkin ? `'${schedule.checkin}',` : `null,`;
         values+= schedule.checkout ? `'${schedule.checkout}'` : `null`;
         db.query(`INSERT INTO ${tableName}(storeId,departmentId,teamId,shiftId,userId,date,checkin,checkout)VALUES(${values})`,(error,rows,fields)=>{
            if(error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
          });
        });
}

function deleteSchedule(id) {
   return new Promise((resolve,reject) => {
        db.query(`DELETE FROM ${tableName} WHERE id='${id}'`,(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
       });    
    });
}


module.exports = scheduleModel;

