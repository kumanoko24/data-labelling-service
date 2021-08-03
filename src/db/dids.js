const { PouchDB } = require("../dbs.js");

const db_name = "dls_dids";

const the_db = new PouchDB(db_name, { adapter: "leveldb" });
the_db.setMaxListeners(0);

the_db.createIndex({
  index: {
    fields: ["name"],
  },
});

the_db.createIndex({
  index: {
    fields: ["labels"],
  },
});

// const couchdb = new PouchDB(process.env.COUCHDB_BASE_URL + "/" + db_name, {
//   auth: {
//     username: process.env.COUCHDB_UN,
//     password: process.env.COUCHDB_PW,
//   },
// });

// couchdb.setMaxListeners(0);

// the_db.sync(couchdb, {
//   live: true,
//   retry: true,
// });

module.exports = the_db;
