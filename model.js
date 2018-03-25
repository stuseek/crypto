let mysql = require('mysql');
let core = require('./core');

let res = {};



core.getConfig().then(function (config) {
    setInterval(() => {
        getDataFromDB()
    }, 10000);

    let con = mysql.createConnection(config.db)

    function getDataFromDB() {
        con.connect(err => {
            core.getCoinList().forEach((item, i) => {
                con.query("SELECT rate, daily_rate FROM rates where code = '" + item + "'", (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    res[item] = result;
                })
            })
        });
    }

    getDataFromDB();
});


exports.getData = function () {
    return res;
};