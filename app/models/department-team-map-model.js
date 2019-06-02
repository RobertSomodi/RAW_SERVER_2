const db = require('../../config/database');
const dbFunc = require('../../config/db-function');
const storeDepartmentMapModel = require('./store-department-map-model');
const teamModel = require('./team-model');
const tableName = 'departmentteammaps';

let departmentTeamMapModel = {
   getDepartmentTeamMapById: getDepartmentTeamMapById,
   addDepartmentTeamMap: addDepartmentTeamMap,
   deleteDepartmentTeamMap: deleteDepartmentTeamMap,
   getTeamsByDepartmentId: getTeamsByDepartmentId
}

function getTeamsByDepartmentId(id) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT td.id, t.name FROM ${tableName} td INNER JOIN teams t ON td.teamId = t.id WHERE storeDepartmentMapId ='${id}' `,(error,rows,fields)=>{
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

function getDepartmentTeamMapById(id) {
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

function addDepartmentTeamMap(departmentTeamMap) {
     return new Promise((resolve,reject) => {
        storeDepartmentMapModel.getStoreDepartmentMapById(departmentTeamMap.storeDepartmentMapId)
            .then(storeDepartmentMap => {
                if(storeDepartmentMap[0].id) {
                    teamModel.getTeamById(departmentTeamMap.teamId)
                        .then(team => {
                            if(team[0].id) {
                                db.query(`INSERT INTO ${tableName}(storeDepartmentMapId,teamId)VALUES('${departmentTeamMap.storeDepartmentMapId}','${departmentTeamMap.teamId}')`,(error,rows,fields)=>{
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
                console.log(error);
                reject(error);
            })
        });
}

function deleteDepartmentTeamMap(id) {
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


module.exports = departmentTeamMapModel;

