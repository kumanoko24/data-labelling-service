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

if (
  process.env.DLS_COUCHDB_UN !== undefined &&
  process.env.DLS_COUCHDB_UN !== null &&
  process.env.DLS_COUCHDB_UN !== "" &&
  process.env.DLS_COUCHDB_PW !== undefined &&
  process.env.DLS_COUCHDB_PW !== null &&
  process.env.DLS_COUCHDB_PW !== "" &&
  process.env.DLS_COUCHDB_URL !== undefined &&
  process.env.DLS_COUCHDB_URL !== null &&
  process.env.DLS_COUCHDB_URL !== ""
) {
  try {
    const couchdb = new PouchDB(process.env.DLS_COUCHDB_URL + "/" + db_name, {
      auth: {
        username: process.env.DLS_COUCHDB_UN,
        password: process.env.DLS_COUCHDB_PW,
      },
    });

    couchdb.setMaxListeners(0);

    the_db.sync(couchdb, {
      live: true,
      retry: true,
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = the_db;
