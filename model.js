let mysql = require('mysql');
let config = require('./config');

let res = {};

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "course"
});

setInterval(() => {
    getDataFromDB()
}, 10000);

function getDataFromDB() {
    con.connect(err => {
        config.getCoinList().forEach((item, i) => {
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

exports.getData = function () {
    return res;
};