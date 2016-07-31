var cli = require('commander'),
chalk = require("chalk"),
co = require("co"),
prompt = require("co-prompt"),
ProgressBar = require("progress"),
sh = require("shelljs"),
fs = require('fs'),
request = require('request'),
unzip = require('unzip');

cli
  .version("0.0.9-beta")
  .arguments("<ProjectName>")
  .option("clear", "Generates Clear FEAN Project")
  .option("bootstrap", "Generates Bootstrap FEAN Project")
  .action(function(ProjectName){
    projectName = ProjectName
  })
  .parse(process.argv);

// console.log(cli.clear);

if(cli.clear){
  request('https://github.com/joselevelsup/fean-clear/archive/master.zip')
  .pipe(fs.createWriteStream(projectName+".zip"))
  .on('close', function(){
    fs.createReadStream(projectName+'.zip').pipe(unzip.Extract({path: projectName}));
    sh.echo(projectName+" Directory made!");
  });
}
