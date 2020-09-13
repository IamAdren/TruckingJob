ESX = nil
coords = nil
inCricle = false

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
    end
    
    while coords == nil do
        TriggerEvent('getCoords', function(obj)
            coords = obj
        end)
        Citizen.Wait(0)
	end
end)

RegisterNetEvent('spawnCar')
AddEventHandler('spawnCar', function(model, x, y, z, h)
    local playerPed = PlayerPedId()
    ESX.Game.SpawnVehicle(model, vector3(x, y, z), h, function(vehicle)
        TaskWarpPedIntoVehicle(playerPed, vehicle, -1)
        FreezeEntityPosition(playerPed, false)
        SetEntityVisible(playerPed, true)
    end)
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)
		local playerPed = PlayerPedId()
		local PlayerCoords = GetEntityCoords(playerPed)

		if (coords) then
			DrawMarker(1, coords[1], coords[2], coords[3] - 1, 0.0, 0.0, 0.0, 0, 0.0, 0.0, 1.5, 1.5, 1.0, 255, 255, 255, 100, false, true, 2, true, false, false, false)
			if GetDistanceBetweenCoords(PlayerCoords, vector3(coords[1], coords[2], coords[3]), true) < 5.0 then
				Draw3DText(coords[1], coords[2], coords[3] + 0.5, "Press [ ~b~E~s~ ] To Open the Trucking Menu.", 4, 0.065, 0.065)

				ESX.ShowHelpNotification('Press ~INPUT_CONTEXT~ to open the menu!')
				if IsControlJustReleased(0, 38) then
					TriggerEvent('openMenu')
				end
				inCricle = true
			else 
				inCricle = false
            end
        end
	end
end)

function Draw3DText(x, y, z, textInput, fontId, scaleX, scaleY)
	local px,py,pz=table.unpack(GetGameplayCamCoords())
	local dist = GetDistanceBetweenCoords(px,py,pz, x,y,z, 1)    
	local scale = (1/dist)*20
	local fov = (1/GetGameplayCamFov())*100
	local scale = scale*fov   
	SetTextScale(scaleX*scale, scaleY*scale)
	SetTextFont(fontId)
	SetTextProportional(1)
	SetTextColour(250, 250, 250, 255)
	SetTextDropshadow(1, 1, 1, 1, 255)
	SetTextEdge(2, 0, 0, 0, 150)
	SetTextDropShadow()
	SetTextOutline()
	SetTextEntry("STRING")
	SetTextCentre(1)
	AddTextComponentString(textInput)
	SetDrawOrigin(x,y,z, 0)
	DrawText(0.0, 0.0)
	ClearDrawOrigin()
end