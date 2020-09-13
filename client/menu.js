onNet('openMenu', () => {
    if (inProgress == false) {
        openMenu();
    } else {
        ESX.ShowNotification('You are currently on a Job!');
    }
})

function openMenu() {
    ESX.UI.Menu.Open( 'default', GetCurrentResourceName(), 'menuname', {
        title: 'LOCATION | TIER',
        align: 'top-right',
        elements: packages
    },
    function(data, menu) {
        for (i = 0; i < rawpackages.length; i++) {
            if (data.current.value == i) {
                ESX.UI.Menu.CloseAll();
                yesMenu(packages[i]);
            }
        }
    }, function(data, menu) {
        menu.close()
    });
}

function yesMenu(packages) {
    ESX.UI.Menu.Open( 'default', GetCurrentResourceName(), 'menuname', {
        title: 'Are You Sure?',
        align: 'top-right',
        elements: [
            {label: "Yes", value: true},
            {label: "No", value: false}
        ]
    },
    function(data, menu) {
        if (data.current.value == true) {
            takeLoad(packages);
        } else {
            openMenu();
        }
    }, function(data, menu) {
        menu.close();
        openMenu();
    });
}

function takeLoad(data) {
    ESX.UI.Menu.CloseAll();

    let json = JSON.parse(data.json);
    let vehicles = JSON.parse(data.vehicles);

    CreateRouteBlip(json.x, json.y, json.z, 'Destination', 477, 0, 0.6, 4, true);
    emit("spawnCar", vehicles[Math.floor(Math.random() * vehicles.length)], spawner[0], spawner[1], spawner[2], spawner[3]);
    emitNet("takeLoad", data);

    function CreateRouteBlip(x, y, z, name, spriteId, colorId, scale, display, route) { 
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
    
        inProgress = true;

        setTick(async () => {
            await Wait(200);
            
            let playerPed = PlayerPedId();
            let coords = GetEntityCoords(playerPed);
    
            if (inProgress == true) {
                if (GetDistanceBetweenCoords(coords[0], coords[1], coords[2], json.x, json.y, json.z, true) < 10) {
                    finishJob(data);
                    RemoveBlip(blip);
                    inProgress = false;
                }
            }
        });   
    }
} 

function finishJob(data) {
    let ped = GetPlayerPed(-1);
    if (IsPedSittingInAnyVehicle(ped)) {
        let vehicle = GetVehiclePedIsIn(ped, false);
        SetEntityAsMissionEntity(vehicle, true, true);
        DeleteVehicle(vehicle);

        ESX.ShowNotification("~g~Job Successful!");
        emitNet("finishedJob", data.tier);
    }
}

function inCircle(x, y, z) {
    let playerPed = PlayerPedId();
    let coords = GetEntityCoords(playerPed);

    if (GetDistanceBetweenCoords(coords[0], coords[1], coords[2], x, y, z, true) < 1.5) {
        return true;
    } else {
        return false;
    }
}