const db = require('../../config/database');
const dbFunc = require('../../config/db-function');
const tableName = 'positions';

let positionModel = {
   getPositionById: getPositionById,
   addPosition: addPosition,
   deletePosition: deletePosition,
   getAll: getAll,
   updatePosition: updatePosition
}

function getAll() {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM ${tableName}`,(error,rows,fields)=>{
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

function getPositionById(id) {
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

function addPosition(position) {
     return new Promise((resolve,reject) => {
         db.query(`INSERT INTO ${tableName}(name)VALUES('${position.name}')`,(error,rows,fields)=>{
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

function deletePosition(id) {
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

function updatePosition(position) {
    return new Promise((resolve,reject) => {
        db.query(`UPDATE ${tableName} set name='${position.name}' WHERE id='${position.id}'`,(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
       });    
    })
}

module.exports = positionModel;

