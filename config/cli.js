var chalk = require("chalk"),
    co = require("co"),
    prompt = require("co-prompt"),
    ProgressBar = require("progress"),
    sh = require("shelljs"),
    fs = require('fs');

co(function*(){
  var projectName = yield prompt("Project Name: ");
  if(!sh.which('git')){
    sh.echo("Git not installed. Please install Git");
    process.exit(0);
  } else{
    sh.mkdir('-p', projectName);
    fs.access(projectName, fs.F_OK, function(err){
      if(err){
        sh.echo("Project does not exist");
      } else{
        sh.cd(projectName);
        sh.echo(projectName+" Directory made!");
        var init = sh.exec('git init', {silent:true});
        if (init.code !== 0) {
          sh.echo('Error: Git init failed');
          process.exit(1);
        }else{
          sh.echo(chalk.blue("Pulling Template..."));
          var bar = new ProgressBar("[:bar] :percent", {
            complete:"=",
            incomplete: " ",
            width:20,
            total:20
          });
          var pull = sh.exec('git pull https://bitbucket.org/joselevelsup12/fean-express/',{silent:true});
          if(pull.code==0){
            bar.tick(20);
            sh.echo(chalk.green("FEAN")+" it Up!");
            process.exit(1);
          } else{
            sh.echo("Failed to Get Template");
            process.exit(1);
          }
        }
      }
    })
  }
});
