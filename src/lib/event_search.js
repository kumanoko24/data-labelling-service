const { events } = require("../dbs.js");

async function event_search(selector) {
  try {
    let _selector = {};

    if (selector !== undefined) {
      _selector = selector;
    }

    if (_selector["event_timestamp"] === undefined) {
      _selector["event_timestamp"] = { $gt: 0 };
    }

    const result = await events.find({
      selector: _selector,
      sort: [{ event_timestamp: "desc" }],
    });

    return result.docs;
  } catch (err) {
    console.error(err);

    throw err;
  }
}

module.exports.event_search = event_search;
