const db = require('../../config/database');
const dbFunc = require('../../config/db-function');
const authenticModel = require('./authentic.model');
const tableName='users';

const userModel = {
   getAllUser:getAllUser,
   addUser:addUser,
   updateUser:updateUser,
   deleteUser:deleteUser,
   getUserById:getUserById,
   getUserByAuthId:getUserByAuthId,
   getAllUsersByStoreIdDepartmentId: getAllUsersByStoreIdDepartmentId
}

function getAllUser() {
    return new Promise((resolve,reject) => {
        db.query(`CALL get_user()`,(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows[0]);
            }
       });
    });
}

function getAllUsersByStoreIdDepartmentId(storeId, departmentId) {
    return new Promise((resolve,reject) => {
        let filters = "";
        filters += storeId ? `storeId=${storeId} ` : '';
        filters += departmentId ? `AND departmentId=${departmentId} ` : '';
        db.query(`SELECT * FROM ${tableName} WHERE ${filters}`,(error,rows,fields)=>{
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

function getUserById(id) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM ${tableName} WHERE id=${id}`,(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows[0]);
            }
       });
    });  
}

function getUserByAuthId(id) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM ${tableName} WHERE authId=${id}`,(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows[0]);
            }
       });
    }); 
}

function addUser(user) {
     return new Promise((resolve,reject) => {
        authenticModel.signup({username: user.firstName[0] + user.lastName, password: user.password}).
            then(authenticated => {
                if(authenticated.insertId) {
                    const teamId = user.teamId ? `'${user.teamId}'`: null;
                    const departmentId = user.departmentId ? `'${user.departmentId}'`: null;
                    db.query(`INSERT INTO ${tableName}(firstName,lastName,authId,storeId,departmentId,teamId,roleId,positionId,weeklyHours,daysOff)VALUES('${user.firstName}','${user.lastName}','${authenticated.insertId}','${user.storeId}',${departmentId},${teamId},'${user.roleId}','${user.positionId}','${user.weeklyHours}','${user.daysOff}')`,
                        (error,rows,fields)=>{
                            if(error) {
                                dbFunc.connectionRelease;
                                reject(error);
                            } else {
                                dbFunc.connectionRelease;
                                resolve(rows);
                            }
                    });
                } else{
                    reject(error);
                }
            }).catch(error => {
                reject(error);
            });
        });
}

function updateUser(user) {
    return new Promise((resolve,reject) => {
        const teamId = user.teamId ? `'${user.teamId}'`: null;
        const departmentId = user.departmentId ? `'${user.departmentId}'`: null;
        db.query(`UPDATE ${tableName} set firstName='${user.firstName}',lastName='${user.lastName}',storeId='${user.storeId}',departmentId=${departmentId},teamId=${teamId},roleId='${user.roleId}',positionId='${user.positionId}',weeklyHours='${user.weeklyHours}',daysOff='${user.daysOff}',recoveryHours='${user.recoveryHours}' WHERE id='${user.id}'`,(error,rows,fields)=>{
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

function deleteUser(id) {
   return new Promise((resolve,reject) => {
        db.query(`DELETE ${tableName}, authentications FROM ${tableName} INNER JOIN authentications ON ${tableName}.authId = authentications.id WHERE ${tableName}.id =${id}`,(error,rows,fields)=>{
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


module.exports = userModel;

