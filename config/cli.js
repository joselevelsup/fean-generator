var chalk = require("chalk"),
    co = require("co"),
    prompt = require("co-prompt"),
    ProgressBar = require("progress"),
    sh = require("shelljs"),
    fs = require('fs'),
    request = require('request'),
    commander = require('commander');

co(function*(){
  //Use commander for project name and type. 
    sh.mkdir('-p', projectName);
    fs.access(projectName, fs.F_OK, function(err){
      if(err){
        sh.echo("Project does not exist");
      } else{
        sh.cd(projectName);
        sh.echo(projectName+" Directory made!");
	try{
		//request goes here
	}
	}
    });

});
