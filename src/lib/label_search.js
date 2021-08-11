const { labels } = require("../dbs.js");

async function label_search(selector) {
  try {
    if (selector.name === undefined) {
      selector.name = { $exists: true };
    }

    if (selector.holders === undefined) {
      selector.holders = { $exists: true };
    }

    const result = await labels.find({
      selector,
    });

    return result.docs;
  } catch (err) {
    console.error(err);

    throw err;
  }
}

module.exports.label_search = label_search;
