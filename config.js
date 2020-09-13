module.exports = {
    mysql: { // SQL Login Details
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'adren'
    },
    refreshRate: 5 * 60000, // *5 Minutes* (Refresh Rate is how long until the database gets refilled)
    botToken: '', // Found on Discord.com/developers
    prefix: '!'
}

// Default delivery locations
module.exports.locations = [
    {
        1: {
            value: [2500, 4500], // Random amount per delivery for tier 1
            maxInDB: 5,
            locations: [
                {name: 'PDM', x: -15.93, y: -1104.25, z: 25.67, vehicles: ['mule', 'boxville2']},
                {name: 'Luxury Autos', x: -810.84, y: -228.29, z: 36.21, vehicles: ['mule', 'boxville2']},
                {name: 'Bob Mulét Hair Salon', x: -829.9, y: -191.6, z: 37.46, vehicles: ['rumpo']},
                {name: 'Airport', x: -1136.81, y: -2688.62, z: 13.94, vehicles: ['benson']},
                {name: 'Post OP (HQ)', x: -409.13, y: -2795.72, z: 6, vehicles: ['boxville2']}
            ]
        }
    },
    {   
        2: {
            value: [5500, 7500], // Random amount per delivery for tier 2
            maxInDB: 4,
            locations: [
                {name: 'Xero 24 (Postal 4027)', x: 264.38, y: -1244.98, z: 28.14, vehicles: ['mule', 'boxville2']},
                {name: 'Gas (Postal 802)', x: 1780.95, y: 3330.17, z: 40.25, vehicles: ['mule', 'boxville2']},
                {name: 'LTD (Mirror Park)', x: 1169.84, y: -317.44, z: 69.18, vehicles: ['mule']},
                {name: 'Airport', x: -1136.81, y: -2688.62, z: 13.94, vehicles: ['benson']},
                {name: 'Post OP (Paleto)', x: -429.02, y: 5132.21, z: 31.48, vehicles: ['boxville2']}
            ]
        }
    },
    {
        3: {
            value: [8500, 11500], // Random amount per delivery for tier 3
            maxInDB: 1,
            locations: [
                {name: 'Paleto Warehouse', x: 201.5, y: 6399.78, z: 31.38, vehicles: ['phantom']},
                {name: '24/7 (Mount Chiliad)', x: 1718.34, y: 6423.8, z: 33.21, vehicles: ['mule']},
                {name: 'LTD (Grapeseed)', x: 1694.01, y: 4915.19, z: 42.08, vehicles: ['mule']}
            ]            
        }
    }
]

// Some of the locations were taken from https://github.com/EncoreRP/encore_trucking/blob/master/config.lua
