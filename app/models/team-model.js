const db = require('../../config/database');
const dbFunc = require('../../config/db-function');
const tableName = 'teams';

let teamModel = {
   getTeamById: getTeamById,
   addTeam: addTeam,
   deleteTeam: deleteTeam,
   getAll: getAll,
   updateTeam: updateTeam
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

function getTeamById(id) {
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

function addTeam(team) {
     return new Promise((resolve,reject) => {
         db.query(`INSERT INTO ${tableName}(name)VALUES('${team.name}')`,(error,rows,fields)=>{
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

function deleteTeam(id) {
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

function updateTeam(team) {
    return new Promise((resolve,reject) => {
        db.query(`UPDATE ${tableName} set name='${team.name}' WHERE id='${team.id}'`,(error,rows,fields)=>{
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

module.exports = teamModel;

