const { PouchDB } = require("../dbs.js");

const db_name = "dls_events";

const the_db = new PouchDB(db_name, { adapter: "leveldb" });
the_db.setMaxListeners(0);

the_db.createIndex({
  index: {
    fields: ["event_type"],
  },
});

the_db.createIndex({
  index: {
    fields: ["event_meta"],
  },
});

the_db.createIndex({
  index: {
    fields: ["event_timestamp"],
  },
});

the_db.createIndex({
  index: {
    fields: ["event_source"],
  },
});

the_db.createIndex({
  index: {
    fields: ["event_target"],
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