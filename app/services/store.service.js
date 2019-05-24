const storeModel = require("../models/store-model.js");


const storeService = {
    getStoreById: getStoreById,
    addStore: addStore,
    deleteStore: deleteStore
}

function addStore(storeData) {
    return new Promise((resolve,reject) => {
        storeModel.addStore(storeData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function deleteStore(id) {
    return new Promise((resolve,reject) => {
        storeModel.deleteStore(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getStoreById(id) {
    return new Promise((resolve,reject) => {
        storeModel.getStoreById(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}


module.exports = storeService;

