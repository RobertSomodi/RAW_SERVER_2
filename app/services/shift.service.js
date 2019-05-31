const shiftModel = require("../models/shift-model.js");


const shiftService = {
    getShiftById: getShiftById,
    addShift: addShift,
    deleteShift: deleteShift
}

function addShift(shiftData) {
    return new Promise((resolve,reject) => {
        shiftModel.addShift(shiftData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function deleteShift(id) {
    return new Promise((resolve,reject) => {
        shiftModel.deleteShift(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getShiftById(id) {
    return new Promise((resolve,reject) => {
        shiftModel.getShiftById(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}


module.exports = shiftService;

