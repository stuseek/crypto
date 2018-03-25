let Gdax = require('gdax');
let mysql = require('mysql');
let publicClient = new Gdax.PublicClient();
let core = require('./core')


core.getConfig().then(function (config) {
    let con = mysql.createConnection(config.db);

    setInterval(() => {
        core.getCoinList().forEach((item, i) => {
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
    }, 14000);
});

