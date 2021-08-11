const { dids } = require("../dbs.js");

async function did_search(selector) {
  try {
    if (selector.name === undefined) {
      selector.name = { $exists: true };
    }

    if (selector.labels === undefined) {
      selector.labels = { $exists: true };
    }

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
