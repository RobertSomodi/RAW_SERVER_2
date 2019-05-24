const teamModel = require("../models/team-model.js");


const teamService = {
    getTeamById: getTeamById,
    addTeam: addTeam,
    deleteTeam: deleteTeam
}

function addTeam(teamData) {
    return new Promise((resolve,reject) => {
        teamModel.addTeam(teamData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function deleteTeam(id) {
    return new Promise((resolve,reject) => {
        teamModel.deleteTeam(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getTeamById(id) {
    return new Promise((resolve,reject) => {
        teamModel.getTeamById(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}


module.exports = teamService;

