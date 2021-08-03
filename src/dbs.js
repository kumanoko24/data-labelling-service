const PouchDB = require("pouchdb");
PouchDB.plugin(require("pouchdb-find"));

module.exports.PouchDB = PouchDB;

module.exports.events = require("./db/events.js");
module.exports.dids = require("./db/dids.js");
module.exports.labels = require("./db/labels.js");
