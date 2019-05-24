const db = require('../../config/database');
const dbFunc = require('../../config/db-function');
const tableName = 'departments';

let departmentModel = {
   getDepartmentById: getDepartmentById,
   addDepartment: addDepartment,
   deleteDepartment: deleteDepartment
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


module.exports = departmentModel;

