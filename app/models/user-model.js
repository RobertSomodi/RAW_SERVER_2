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
   getUserByAuthId:getUserByAuthId
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

function getUserById(id) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM ${tableName} WHERE id=${id}`,(error,rows,fields)=>{
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
                    db.query(`INSERT INTO ${tableName}(firstName,lastName,authId,storeId,departmentId,teamId,roleId,positionId,weeklyHours,daysOff,recoveryHours)VALUES('${user.firstName}','${user.lastName}','${authenticated.insertId}','${user.storeId}','${user.departmentId}','${user.teamId}','${user.roleId}','${user.positionId}','${user.weeklyHours}','${user.daysOff}','${user.recoveryHours}')`,
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


function updateUser(id,user) {
    return new Promise((resolve,reject) => {
        db.query("UPDATE test set name='"+user.name+"',age='"+user.age+"',state='"+user.state+"',country='"+user.country+"' WHERE id='"+id+"'",(error,rows,fields)=>{
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
        db.query("DELETE FROM test WHERE id='"+id+"'",(error,rows,fields)=>{
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

