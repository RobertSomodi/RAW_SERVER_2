const positionModel = require("../models/position-model.js");


const positionService = {
    getPositionById: getPositionById,
    addPosition: addPosition,
    deletePosition: deletePosition,
    updatePosition: updatePosition
}

function addPosition(positionData) {
    return new Promise((resolve,reject) => {
        positionModel.addPosition(positionData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function deletePosition(id) {
    return new Promise((resolve,reject) => {
        positionModel.deletePosition(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getPositionById(id) {
    return new Promise((resolve,reject) => {
        positionModel.getPositionById(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function updatePosition(positionData,callback) {
    return new Promise((resolve,reject) => {
        positionModel.updatePosition(positionData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
     
}

module.exports = positionService;

