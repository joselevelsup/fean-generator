var cli = require('commander'),
chalk = require("chalk"),
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

if(cli.clear){
  request('https://github.com/joselevelsup/fean-clear/archive/master.zip')
  .pipe(fs.createWriteStream(projectName+".zip"))
  .on('close', function(){
    fs.createReadStream(projectName+'.zip').pipe(unzip.Extract({path: sh.pwd().stdout})); //Creates and extracts the file to the appropriate location
    fs.unlink(projectName+'.zip'); //Deletes the zip file after unzipped
    chalk.blue(projectName+" Directory made!");
    setTimeout(function(){ //Set timeout because sometimes the directory isnt noticed straight away.
      fs.rename(sh.pwd().stdout+"/fean-clear-master", sh.pwd().stdout+'/'+projectName, function(err){
        if(err){
          console.log(err);
        }
      });
    }, 100);
  });
}
