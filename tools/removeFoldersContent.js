const fs = require("fs");

function removeFoldersContent(folder) {
    if(fs.existsSync(folder) ) {
        fs.readdirSync(folder).forEach(function(file,index){
            var curPath = folder + "/" + file;
            if(fs.statSync(curPath).isDirectory()) {
                removeFoldersContent(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(folder);
    }
}

module.exports = removeFoldersContent;