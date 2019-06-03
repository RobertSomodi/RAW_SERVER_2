const db = require('../../config/database');
const dbFunc = require('../../config/db-function');
const moment = require('moment');
const tableName = 'schedules';

let scheduleModel = {
   getScheduleById: getScheduleById,
   addSchedule: addSchedule,
   deleteSchedule: deleteSchedule,
   getSchedule:getSchedule,
   getShiftReport: getShiftReport
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

function getSchedule(storeId, departmentId, startTime, endTime) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT s.*, u.firstName, u.lastName, t.name as teamName
        FROM ${tableName} s
        INNER JOIN users u ON u.id = s.userId
        INNER JOIN departmentteammaps dtm ON dtm.id = s.teamId
        INNER JOIN teams t ON t.id = dtm.teamId
        WHERE s.storeId=${storeId} AND s.departmentId=${departmentId} AND (s.DATE BETWEEN '${startTime}' AND '${endTime}')
        ORDER BY s.date ASC`,(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(groupSchedule(rows, startTime, endTime));
            }
       });    
    });
}

function getShiftReport(storeId, departmentId, startTime, endTime) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT s1.date, s1.shiftId
                FROM schedules s1`,(error,rows,fields)=>{
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

function getShiftCount(schedule) {
    
}

function groupSchedule(schedules, startTime, endTime) {
    let schedule = {
        teams:{
        },
        users:{},
        days: addDays(startTime,endTime)
    };
    schedules.forEach((sObj) => {
        if(sObj.teamId) {
            if(!schedule.teams[sObj.teamId]) {
                schedule.teams[sObj.teamId] = {
                    name: sObj.teamName,
                    users: {}
                };
                schedule.teams[sObj.teamId].users[sObj.userId] = {
                    firstName: sObj.firstName,
                    lastName: sObj.lastName,
                    days: addDays(startTime,endTime)
                };
                schedule.teams[sObj.teamId].users[sObj.userId].days[moment(sObj.date).format('YYYY-MM-DD')] = {
                    shiftId:sObj.shiftId,
                    checkin:sObj.checkin,
                    checkout:sObj.checkout
                }
            } else {
                if(schedule.teams[sObj.teamId].users[sObj.userId]) {
                    schedule.teams[sObj.teamId].users[sObj.userId].days[moment(sObj.date).format('YYYY-MM-DD')] = {
                        shiftId:sObj.shiftId,
                        checkin:sObj.checkin,
                        checkout:sObj.checkout
                    }
                } else {
                    schedule.teams[sObj.teamId].users[sObj.userId] = {
                        firstName: sObj.firstName,
                        lastName: sObj.lastName,
                        days: addDays(startTime,endTime)
                    };
                    schedule.teams[sObj.teamId].users[sObj.userId].days[moment(sObj.date).format('YYYY-MM-DD')] = {
                        shiftId:sObj.shiftId,
                        checkin:sObj.checkin,
                        checkout:sObj.checkout
                    }
                }
            }
        } else {
            if(schedule.users[sObj.userId]) {
                schedule.users[sObj.userId].days[moment(sObj.date).format('YYYY-MM-DD')] = {
                    shiftId:sObj.shiftId,
                    checkin:sObj.checkin,
                    checkout:sObj.checkout
                }
            } else {
                schedule.users[sObj.userId] = {
                    firstName: sObj.firstName,
                    lastName: sObj.lastName,
                    days: {

                    }
                };
                schedule.users[sObj.userId].days[moment(sObj.date).format('YYYY-MM-DD')] = {
                    shiftId:sObj.shiftId,
                    checkin:sObj.checkin,
                    checkout:sObj.checkout
                }
            }
        }
    });

    return schedule;
};

function addDays(startTime, endTime) {
    let yearMonth = moment(startTime, 'YYYY-MM-DD').format('YYYY-MM');
    let startDay = moment(startTime, 'YYYY-MM-DD').date();
    let endDay = moment(endTime, 'YYYY-MM-DD').date();
    let days = {};

    for(i = startDay; i <= endDay; i++) {
        days[moment(`${yearMonth}-${i}`, 'YYYY-MM-DD').format('YYYY-MM-DD')] = {};
    };

    return days;
}

module.exports = scheduleModel;

