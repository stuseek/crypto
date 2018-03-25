let cron = require('node-cron');
let Gdax = require('gdax');
let publicClient = new Gdax.PublicClient();
let mysql = require('mysql');
let config = require('./config')

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "course"
});

setInterval(() => {
    con.connect(function (err) {
        config.getCoinList().forEach((item, i) => {
            publicClient.getProduct24HrStats(item + '-USD')
                .then(data => {
                    let daily_rate;
                    let sql;

                    sql = "UPDATE rates SET rate ='" + data.last + "' WHERE code = '" + item + "'";
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                    });

                    sql = "UPDATE rates SET daily_rate ='" + data.open + "' WHERE code = '" + item + "'";
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                    });


                })
                .catch(data => {
                    console.log(data)
                });
        });
    });
}, 14000);
