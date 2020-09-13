ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterNetEvent('finishedJob')
AddEventHandler('finishedJob', function(tier)
    TriggerEvent('getConfig', source, tier)
end)

RegisterNetEvent('callback')
AddEventHandler('callback', function(source, finalAmount)
    local xPlayer = ESX.GetPlayerFromId(source)

    xPlayer.showNotification('~g~$'.. finalAmount ..'~s~ Has been deposited into your bank account!');
    xPlayer.addMoney(finalAmount);
end)