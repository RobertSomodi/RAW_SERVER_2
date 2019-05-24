const departmentTeamMapModel = require("../models/department-team-map-model.js");


const departmentTeamMapService = {
    getDepartmentTeamMapById: getDepartmentTeamMapById,
    addDepartmentTeamMap: addDepartmentTeamMap,
    deleteDepartmentTeamMap: deleteDepartmentTeamMap
}

function addDepartmentTeamMap(departmentTeamMapData) {
    return new Promise((resolve,reject) => {
        departmentTeamMapModel.addDepartmentTeamMap(departmentTeamMapData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function deleteDepartmentTeamMap(id) {
    return new Promise((resolve,reject) => {
        departmentTeamMapModel.deleteDepartmentTeamMap(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getDepartmentTeamMapById(id) {
    return new Promise((resolve,reject) => {
        departmentTeamMapModel.getDepartmentTeamMapById(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}


module.exports = departmentTeamMapService;

