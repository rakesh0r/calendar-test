const fs = require('fs');
const path = require('path');

const getJsonDataFromCsv = (file) => {
    const filePath = path.join(__dirname+"/data", file);
    // Read CSV
    let f = fs.readFileSync(filePath, {encoding: 'utf-8'}, 
        function(err){console.log(err);});

    // Split on row
    f = f.split("\n");

    // Get first row for column headers
    const headers = f.shift().split(",");

    const json = [];    
    f.forEach(function(d){
        // Loop through each row
        if(d.length > 0) {
            tmp = {}
            row = d.split(",")
            for(let i = 0; i < headers.length; i++){
                tmp[headers[i]] = parseInt(row[i]);
            }
            // Add object to list
            json.push(tmp);
        }
    });
    return json;
}

module.exports = getJsonDataFromCsv; 

