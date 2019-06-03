const departmentModel = require("../models/department-model.js");


const departmentService = {
    getDepartmentById: getDepartmentById,
    addDepartment: addDepartment,
    deleteDepartment: deleteDepartment,
    updateDepartment: updateDepartment
}

function addDepartment(departmentData) {
    return new Promise((resolve,reject) => {
        departmentModel.addDepartment(departmentData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function deleteDepartment(id) {
    return new Promise((resolve,reject) => {
        departmentModel.deleteDepartment(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getDepartmentById(id) {
    return new Promise((resolve,reject) => {
        departmentModel.getDepartmentById(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function updateDepartment(departmentData,callback) {
    return new Promise((resolve,reject) => {
        departmentModel.updateDepartment(departmentData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
     
}


module.exports = departmentService;

