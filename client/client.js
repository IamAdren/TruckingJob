// Config
const coords = [1189.93, -3104.86, 5.72];
const spawner = [1205.09, -3102.53, 6.03, 358.6];
let BlipCfg = {
    name: "Truck Depot",
    spriteID: 477, 
    colorID: 0,
    scale: 0.6
};

let rawpackages = [];
let packages = [];
let inProgress = false;
let ESX = null;

emit("esx:getSharedObject", (obj) => ESX = obj);
init();

AddEventHandler('getCoords', function(cb) {
	cb(coords);
});

CreateBlip(coords[0], coords[1], coords[2], BlipCfg.name, BlipCfg.spriteID, BlipCfg.colorID, BlipCfg.scale, 4);

function CreateBlip(x, y, z, name, spriteId, colorId, scale, display, route) { 
	let blip = AddBlipForCoord(x, y, z);

    SetBlipSprite(blip, spriteId);
    SetBlipDisplay(blip, display);
	SetBlipColour(blip, colorId);
	SetBlipScale(blip, scale);
    SetBlipAsShortRange(blip, true);
    
    if (route == true) {
        SetBlipSprite(blip, 57)
        SetBlipColour(blip, 5)
        SetBlipScale(blip, 0.30)
        SetBlipRoute(blip,  true)
    }

	BeginTextCommandSetBlipName('STRING');
	AddTextComponentSubstringPlayerName(name);
	EndTextCommandSetBlipName(blip);

	return blip;
}


function init() {
    ESX.TriggerServerCallback('getOtherPlayerData', function (data) {
        if (data.length == 0) {
            packages.push({label: 'No Packages!'});
        } else {
            for (i = 0; i < data.length; i++) {
                rawpackages.push(`${data[i].name} | ${data[i].tier} | ${data[i].id}`);
                packages.push({label: data[i].name + " | " + data[i].tier , value: i, name: data[i].name, vehicles: data[i].vehicles, tier: data[i].tier, json: data[i].json, id: data[i].id});
            }
        }
    }); 

    setInterval(function() {
        rawpackages = [];
        packages = [];
        ESX.TriggerServerCallback('getOtherPlayerData', function (data) {
            if (data.length == 0) {
                packages.push({label: 'No Packages!'});
            } else {
                for (i = 0; i < data.length; i++) {
                    rawpackages.push(`${data[i].name} | ${data[i].tier} | ${data[i].id}`);
                    packages.push({label: data[i].name + " | " + data[i].tier , value: i, name: data[i].name, vehicles: data[i].vehicles, tier: data[i].tier, json: data[i].json, id: data[i].id});
                }
            }
        });
    }, 6000);
}