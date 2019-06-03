const db = require('../../config/database');
const dbFunc = require('../../config/db-function');
const tableName = 'departments';

let departmentModel = {
   getDepartmentById: getDepartmentById,
   addDepartment: addDepartment,
   deleteDepartment: deleteDepartment,
   getAll: getAll,
   updateDepartment: updateDepartment
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

function getDepartmentById(id) {
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

function addDepartment(department) {
     return new Promise((resolve,reject) => {
         db.query(`INSERT INTO ${tableName}(name)VALUES('${department.name}')`,(error,rows,fields)=>{
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

function deleteDepartment(id) {
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

function updateDepartment(department) {
    return new Promise((resolve,reject) => {
        db.query(`UPDATE ${tableName} set name='${department.name}' WHERE id='${department.id}'`,(error,rows,fields)=>{
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

module.exports = departmentModel;

