const config = require(`${GetResourcePath(GetCurrentResourceName())}/config.js`).locations;

setInterval(function() { 
    resetLoad();
}, cfg.refreshRate);

function generateString(tier) {
    let number = tier - 1;
    let array = config[number][number + 1].locations;
    let random = array[parseInt(Math.random() * array.length)];
    let jsonData =  {name : random.name, location: { x: random.x, y: random.y, z: random.z }, vehicles: random.vehicles};

    connection.query(`INSERT INTO truckingloads (NAME, vehicles, tier, json) VALUES ('${jsonData.name}', '${JSON.stringify(jsonData.vehicles)}', ${tier}, '${JSON.stringify(jsonData.location)}');`, function (error, results, fields) {
        if (error) throw error;
    });
}

function resetLoad() {
    connection.query('SELECT * FROM truckingloads', function (error, results, fields) {
        if (error) throw error;
        
        let tierOne = 0;
        let tierTwo = 0;
        let tierThree = 0;

        for (i = 0; i < results.length; i++) {
            if (results[i].tier == 1) {
                tierOne = tierOne + 1;
            } else if (results[i].tier == 2) {
                tierTwo = tierTwo + 1;
            } else if (results[i].tier == 3) {
                tierThree = tierThree + 1;
            }
        }

        if (tierOne < config[0][1].maxInDB) {
            for (i = 0; i < config[0][1].maxInDB - tierOne; i++) {
                let tier = 1;
                generateString(tier)
            }
            console.log(`${prefix}Added ${config[0][1].maxInDB - tierOne} to tier 1!`)
        }

        if (tierTwo < config[1][2].maxInDB) {
            for (i = 0; i < config[1][2].maxInDB - tierTwo; i++) {
                let tier = 2;
                generateString(tier)
            }
            console.log(`${prefix}Added ${config[1][2].maxInDB - tierTwo} to tier 2!`)
        }

        if (tierThree < config[2][3].maxInDB) {
            for (i = 0; i < config[2][3].maxInDB - tierThree; i++) {
                let tier = 3;
                generateString(tier)
            }
            console.log(`${prefix}Added ${config[2][3].maxInDB - tierThree} to tier 3!`)
        }
    });
}