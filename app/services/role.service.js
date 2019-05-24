const roleModel = require("../models/role-model.js");


const roleService = {
    getRoleById: getRoleById,
    addRole: addRole,
    deleteRole: deleteRole
}

function addRole(roleData) {
    return new Promise((resolve,reject) => {
        roleModel.addRole(roleData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function deleteRole(id) {
    return new Promise((resolve,reject) => {
        roleModel.deleteRole(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getRoleById(id) {
    return new Promise((resolve,reject) => {
        roleModel.getRoleById(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}


module.exports = roleService;

