const db = require('../../config/database');
const dbFunc = require('../../config/db-function');
const tableName = 'stores';

let storeModel = {
   getStoreById: getStoreById,
   addStore: addStore,
   deleteStore: deleteStore
}

function getStoreById(id) {
    return new Promise((resolve,reject) => {
        console.log(`SELECT * FROM ${tableName} WHERE id='${id}'`);
        db.query(`SELECT * FROM ${tableName} WHERE id='${id}'`,(error,rows,fields)=>{
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

function addStore(store) {
     return new Promise((resolve,reject) => {
         db.query(`INSERT INTO ${tableName}(name,address)VALUES('${store.name}','${store.address}')`,(error,rows,fields)=>{
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

function deleteStore(id) {
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


module.exports = storeModel;

