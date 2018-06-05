var yrData = {} 
var temperaturData = {}
var fetch = require("node-fetch");
//console.log(fetch);

var parseString = require('xml2js').parseString;
//console.log(parseString);


// fetch data from yr, transform and get data. 
fetch('https://om.yr.no/badetemperatur/badetemperatur.xml')
    .then(res => res.text())
    .then(function (data) {
        parseString(data, function (err, result) {
            document.body.dataset.fetchSuccess = true;

            // Lagre/ cache resultatet i yrData-objektet
            yrData = result;
            console.log(yrData)

            // Stien til badetemperaturen på Oscarsborg Festning
            var oscarsBorgFestningTempVann = yrData.badetemp.badetemperaturer[0].county[5].place[0].temperature[0].$.water;
            console.log(oscarsBorgFestningTempVann);

            // Stien til lufttemperaturen på Oscarsborg Festning
            var oscarsBorgFestningTempLuft = yrData.badetemp.badetemperaturer[0].county[5].place[0].temperature[0].$.air;
            console.log(oscarsBorgFestningTempLuft);

            // Sett inn verdier for vann, og luft - temperatur i app
            document.getElementById("tempVann").innerHTML = oscarsBorgFestningTempVann;

            document.getElementById("tempLuft").innerHTML = " " + oscarsBorgFestningTempLuft;

            // var oscarsBorgFestningTempVann=36;
            // Modifiser css temperaturlinje basert på verdi for vanntemperatur
            document.getElementById("linje").style.height = oscarsBorgFestningTempVann * 144 / 49 + 'px';

        });
    })
