const db = require('../../config/database');
const dbFunc = require('../../config/db-function');
const moment = require('moment');
const tableName = 'schedules';

let scheduleModel = {
   getScheduleById: getScheduleById,
   addSchedule: addSchedule,
   deleteSchedule: deleteSchedule,
   getSchedule:getSchedule,
   getShiftReport: getShiftReport,
   getClockingReport: getClockingReport,
   saveSchedule: saveSchedule
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

function saveSchedule(schedule) {
    return new Promise((resolve, reject) => {
        let promises = [];
        schedule.forEach(shift => {
            promises.push(new Promise((resolveExists, rejectExists) => {
                db.query(`SELECT * FROM ${tableName} s WHERE s.date='${shift.date}' AND s.userId=${shift.userId}`, (error,rows,fields) => {
                    if(error) {
                        rejectExists(error);
                    } else {
                        if(rows.length) {
                            db.query(`UPDATE ${tableName} set shiftId=${shift.shiftId} WHERE id='${rows[0].id}'`,(error,addRows,fields)=>{
                                if(!!error) {
                                    rejectExists(error);
                                } else {
                                    resolveExists(addRows);
                                }
                           });  
                        } else {
                            addSchedule(shift).then((data) => {
                                resolveExists(data);
                            }).catch(error => {
                                rejectExists(error);
                            })
                        }
                    }
                });
            }));
        });

        Promise.all(promises).then(function(values) {
            dbFunc.connectionRelease;
            resolve(values);
        }).catch(error => {   
            dbFunc.connectionRelease;
            reject(error);
        })
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
                resolve(getShiftCount(rows, startTime, endTime));
            }
       });    
    });
}

function getClockingReport(storeId, departmentId, startTime, endTime) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT s.date, s.checkin, s.checkout, u.firstName, u.lastName, u.id
                FROM schedules s
                INNER JOIN users u
                ON u.id = s.userId`,(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(getClocking(rows, startTime, endTime));
            }
       });    
    });
}

function getClocking(rows, startTime, endTime) {
    let report = {days: Object.assign({},addDays(startTime,endTime)), rows: {}};
    let daysKeys = Object.keys(report.days);

    rows.forEach((row) => {
        if(report.rows[row.id]) {
            report.rows[row.id].data[daysKeys.indexOf(moment(row.date).format('YYYY-MM-DD'))+1] = {in: row.checkin, out:row.checkout}
            if(row.checkin) {
                report.rows[row.id].data[0].in += row.checkin;
            }
            if(row.checkout) {
                report.rows[row.id].data[0].out += row.checkout;
            }
        } else {
            let newData = [{in:0, out:0}];
            daysKeys.forEach(day => {
                newData.push(null);
            });
            report.rows[row.id] = {
                firstName: row.firstName,
                lastName: row.lastName,
                data: newData
            }

            report.rows[row.id].data[daysKeys.indexOf(moment(row.date).format('YYYY-MM-DD'))+1] = {in: row.checkin, out:row.checkout}
            if(row.checkin) {
                report.rows[row.id].data[0].in += row.checkin;
            }
            if(row.checkout) {
                report.rows[row.id].data[0].out += row.checkout;
            }
        }
    });

    return report;
}

function getShiftCount(rows, startTime, endTime) {
    let report = addDays(startTime,endTime);
    rows.forEach((row, index) => {
        let date = moment(row.date).format('YYYY-MM-DD');
        if(report[date].shifts) {
            if(report[date].shifts[row.shiftId]){
                report[date].shifts[row.shiftId] ++;
            } else {
                report[date].shifts[row.shiftId] = 1;
            }
        } else {
            report[date].shifts = {}
            report[date].shifts[row.shiftId] = 1;
        }
    });

    Object.keys(report).forEach((key) => {
        if(report[key].shifts) {
            let totalCount = 0;
            Object.keys(report[key].shifts).forEach((shift) => {
                totalCount+=report[key].shifts[shift];
            });
            report[key].percent = Object.assign({}, report[key].shifts);

            Object.keys(report[key].shifts).forEach((shift) => {
                report[key].percent[shift] = (report[key].shifts[shift]/totalCount * 100).toFixed(2) + '%';
            });
        }
        
    });

    return report;
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
                    id: sObj.teamId,
                    users: {}
                };
                schedule.teams[sObj.teamId].users[sObj.userId] = {
                    firstName: sObj.firstName,
                    lastName: sObj.lastName,
                    id: sObj.userId,
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
                        id: sObj.userId,
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
                    id: sObj.userId,
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

