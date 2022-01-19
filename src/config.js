const config = {
    "courts": {
        "nl2":{
            "id":"2",
            "sixToSeven":"tr:nth-child(24) td:nth-child(3)",
            "sevenToEight":"tr:nth-child(26) td:nth-child(2)"
        },
        "ws1":{
            "id":"7",
            "eightToNine":"tr:nth-child(4) td:nth-child(8)",
            "nineToTen":"tr:nth-child(3) td:nth-child(2)",
            "tenToEleven":"tr:nth-child(4) td:nth-child(2)",
        },
        "ws2":{
            "id":"8",
            "eightToNine":"tr:nth-child(4) td:nth-child(9)",
            "nineToTen":"tr:nth-child(3) td:nth-child(2)",
            "tenToEleven":"tr:nth-child(4) td:nth-child(2)",
        },
        "ws3":{
            "id":"9",
            "eightToNine":"tr:nth-child(4) td:nth-child(10)",
            "nineToTen":"tr:nth-child(3) td:nth-child(2)",
            "tenToEleven":"tr:nth-child(4) td:nth-child(2)",
        },
        "ws4":{
            "id":"10",
            "eightToNine":"tr:nth-child(4) td:nth-child(11)",
            "nineToTen":"tr:nth-child(3) td:nth-child(2)",
            "tenToEleven":"tr:nth-child(4) td:nth-child(2)",
        },
    },
    "times":{
        "eight":"17",
        "nine":"19",
        "ten":"21",
        "eleven":"23",
        "twelve":"25",
        "thirteen":"27",
        "fourteen":"29", 
        "fifteen":"31",
        "sixteen":"33",
        "seventeen":"35",
        "eighteen":"37",
        "nineteen":"39",
        "twenty":"41",
        "twentyOne":"43",
    },
    "cronTime":"26 15 * * *"
}

module.exports = config;