const storeDepartmentMapModel = require("../models/store-department-map-model.js");


const storeDepartmentMapService = {
    getStoreDepartmentMapById: getStoreDepartmentMapById,
    addStoreDepartmentMap: addStoreDepartmentMap,
    deleteStoreDepartmentMap: deleteStoreDepartmentMap,
    getDepartmentsByStoreId: getDepartmentsByStoreId
}

function addStoreDepartmentMap(storeDepartmentMapData) {
    return new Promise((resolve,reject) => {
        storeDepartmentMapModel.addStoreDepartmentMap(storeDepartmentMapData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function deleteStoreDepartmentMap(id) {
    return new Promise((resolve,reject) => {
        storeDepartmentMapModel.deleteStoreDepartmentMap(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getStoreDepartmentMapById(id) {
    return new Promise((resolve,reject) => {
        storeDepartmentMapModel.getStoreDepartmentMapById(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getDepartmentsByStoreId(id) {
    return new Promise((resolve,reject) => {
        storeDepartmentMapModel.getDepartmentsByStoreId(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}


module.exports = storeDepartmentMapService;

