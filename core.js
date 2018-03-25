let mysql = require('mysql');
let events = require('events');
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs'));


let bus = new events.EventEmitter();

exports.getCoinList = function () {
    return ['BTC', 'ETH', 'BCH', 'LTC']
};

let connectionData = {};
let domainData = {};
let connection = {};

exports.getDBConnectionData = function () {
    return connectionData;
};

exports.getDomainData = function () {
    return domainData;
};

exports.getConnection = function () {
    return connection;
};

exports.getBus = function () {
    return bus;
};

exports.getConfig = function () {
    return fs.readFileAsync('config.json').then(function (data) {
        data = JSON.parse(data.toString());
        connectionData = data.db;
        domainData = data.domain;
        return data;
    });
};

fs.readFile('config.json', (err, data) => {
    data = JSON.parse(data.toString());
    connectionData = data.db;
    domainData = data.domain;
    connection = mysql.createConnection(connectionData).connect(err => {
        if (err) {
            console.log(err)
        }
        bus.emit('db_connected')
    });
});




