const db = require('../../config/database');
const dbFunc = require('../../config/db-function');
const tableName = 'shifts';

let shiftModel = {
   getShiftById: getShiftById,
   addShift: addShift,
   deleteShift: deleteShift
}

function getShiftById(id) {
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

function addShift(shift) {
     return new Promise((resolve,reject) => {
         db.query(`INSERT INTO ${tableName}(name,color,off,startTime,endTime)VALUES('${shift.name}','${shift.color}','${shift.off}','${shift.startTime}','${shift.endTime}')`,(error,rows,fields)=>{
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

function deleteShift(id) {
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


module.exports = shiftModel;

