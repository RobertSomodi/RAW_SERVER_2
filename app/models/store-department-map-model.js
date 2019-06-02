const db = require('../../config/database');
const dbFunc = require('../../config/db-function');
const departmentModel = require('./department-model');
const storeModel = require('./store-model');
const tableName = 'storedepartmentmaps';

let storeDepartmentMapModel = {
   getStoreDepartmentMapById: getStoreDepartmentMapById,
   addStoreDepartmentMap: addStoreDepartmentMap,
   deleteStoreDepartmentMap: deleteStoreDepartmentMap,
   getDepartmentsByStoreId: getDepartmentsByStoreId
}

function getDepartmentsByStoreId(id) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT sd.id, d.name FROM ${tableName} sd INNER JOIN departments d ON sd.departmentId = d.id WHERE storeId ='${id}' `,(error,rows,fields)=>{
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

function getStoreDepartmentMapById(id) {
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

function addStoreDepartmentMap(storeDepartmentMap) {
     return new Promise((resolve,reject) => {
        storeModel.getStoreById(storeDepartmentMap.storeId)
            .then(store => {
                if(store[0].id) {
                    departmentModel.getDepartmentById(storeDepartmentMap.departmentId)
                        .then(department => {
                            if(department[0].id) {
                                db.query(`INSERT INTO ${tableName}(storeId,departmentId)VALUES('${storeDepartmentMap.storeId}','${storeDepartmentMap.departmentId}')`,(error,rows,fields)=>{
                                    if(error) {
                                        dbFunc.connectionRelease;
                                        reject(error);
                                    } else {
                                        dbFunc.connectionRelease;
                                        resolve(rows);
                                    }
                                  });
                            }
                        }).catch(error => {
                            reject(error);
                        })
                }
            }).catch(error => {
                reject(error);
            })
        });
}

function deleteStoreDepartmentMap(id) {
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


module.exports = storeDepartmentMapModel;

