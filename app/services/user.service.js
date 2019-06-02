var userModel = require("../models/user-model.js");


var userService = {
    getAllUser: getAllUser,
    getUserById:getUserById,
    getUserByAuthId:getUserByAuthId,
    addUser: addUser,
    updateUser:updateUser,
    deleteUser:deleteUser,
    getAllUsersByStoreIdDepartmentId: getAllUsersByStoreIdDepartmentId
}

function addUser(userData) {
    return new Promise((resolve,reject) => {
        userModel.addUser(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function updateUser(userData,callback) {
    return new Promise((resolve,reject) => {
        userModel.updateUser(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
     
}

function deleteUser(id) {
    return new Promise((resolve,reject) => {
        userModel.deleteUser(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getAllUser() {
    return new Promise((resolve,reject) => {
        userModel.getAllUser().then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getAllUsersByStoreIdDepartmentId(storeId, departmentId) {
    return new Promise((resolve,reject) => {
        userModel.getAllUsersByStoreIdDepartmentId(storeId, departmentId).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getUserById(id) {
    return new Promise((resolve,reject) => {
        userModel.getUserById(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getUserByAuthId(id) {
    return new Promise((resolve, reject) => {
        userModel.getUserByAuthId(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}


module.exports = userService;

