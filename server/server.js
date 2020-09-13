let ESX = null;
emit("esx:getSharedObject", obj => {ESX = obj});

const cfg = require(`${GetResourcePath(GetCurrentResourceName())}/config.js`);
const mysql = require('mysql');
const connection = mysql.createConnection({host : cfg.mysql.host, user : cfg.mysql.user, password : cfg.mysql.password, database : cfg.mysql.database});
let prefix = '[Trucking] ';

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
   
    console.log(prefix + 'MYSQL connected as id ' + connection.threadId);

    connection.query('SELECT id FROM truckingloads', function (error, results, fields) {
        if (error) throw error;
        console.log(prefix + "Loaded " + results.length + " Packages")
    });
});

ESX.RegisterServerCallback('getOtherPlayerData', function(source, cb, item) {
    connection.query(`SELECT * FROM truckingloads`, function (error, results, fields) {
        if (error) return console.log(error)
        cb(results);
    });
});

onNet('takeLoad', (data) => {
    let xPlayer = ESX.GetPlayerFromId(source)
    connection.query(`DELETE FROM truckingloads WHERE id='${data.id}'`, function (error, results, fields) {
        if (error) {
            xPlayer.showNotification("~r~I ran into a error!");
            return console.log(error);
        }

        xPlayer.showNotification(`Go to ~g~${data.name}~s~.`)
    });
});

on('getConfig', (source, tier) => {
    let array = config[tier - 1][tier].value;
    emit('callback', source, randomIntFromInterval(array[0], array[1]));
});

RegisterCommand("resetLoad", (source, args) => {
    let xPlayer = ESX.GetPlayerFromId(source);

    if (xPlayer.getGroup() == 'superadmin' || xPlayer.getGroup() == 'moderator') {
        resetLoad();
        xPlayer.showNotification(`~g~Reset!`);
    } else {
        xPlayer.showNotification("~r~This command is restricted to Admins.");
    }
});

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}