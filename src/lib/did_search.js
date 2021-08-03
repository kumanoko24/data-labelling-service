const { dids } = require("../dbs.js");

async function did_search(selector) {
  try {
    const result = await dids.find({
      selector,
    });

    return result.docs;
  } catch (err) {
    console.error(err);

    throw err;
  }
}

module.exports.did_search = did_search;
