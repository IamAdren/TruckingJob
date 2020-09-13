fx_version 'bodacious'
games {"gta5"}

author "Jacobie"
description "ESX Trucking Job"
version "1.0.0"

client_scripts {
	'client/client.js',
	'client/menu.js',
	'client/client.lua'
}

server_scripts {
	'server/server.js',
	'server/server.lua',
	'server/AutoShipment.js',
	'server/bot.js'
}

dependencies {
    'yarn'
}