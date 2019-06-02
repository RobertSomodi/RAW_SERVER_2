const storeModel = require("../models/store-model.js");
const departmentModel = require("../models/department-model.js");
const teamModel = require("../models/team-model.js");
const roleModel = require("../models/role-model.js");
const positionModel = require("../models/position-model.js");
const shiftModel = require("../models/shift-model.js");

const infoService = {
    getInfo: getInfo,
}

function getInfo() {
    return new Promise(async (resolve,reject) => {
        try {
            const storeData = await storeModel.getAll();
            const departmentData = await departmentModel.getAll();
            const teamData = await teamModel.getAll();
            const roleData = await roleModel.getAll();
            const positionData = await positionModel.getAll();
            const shiftData = await shiftModel.getAll();

            resolve({
                stores: storeData,
                departments: departmentData,
                teams: teamData,
                roles: roleData,
                positions: positionData,
                shifts: shiftData
            });
        } catch (err) {
            reject(err);
        }
        
    })
   
}


module.exports = infoService;

