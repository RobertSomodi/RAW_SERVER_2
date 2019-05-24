const teamService = require('../services/team.service');
const schema = require('../schema/teamValidationSchema.json')
const iValidator = require('../../common/iValidator');


function init(router) {
    router.route('/team')
        .post(addTeam);
    router.route('/team/:id')
        .get(getTeamById)
        .delete(deleteTeam)
}

function getTeamById(req,res) {

  let reqData = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,reqData,"team");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  teamService.getTeamById(reqData.id).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);
    });
}

function addTeam(req,res) {
  var teamData=req.body;
  
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, teamData, "team");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

  teamService.addTeam(teamData).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

}


function deleteTeam(req,res) {
  var delId = req.params.id;
  teamService.deleteTeam(delId).then((data)=>{
    res.json(data);
  }).catch((err)=>{
      res.json(err);
  });
}


module.exports.init = init;



