const { events } = require("../dbs.js");

async function event_search(selector) {
  try {
    let _selector = {};

    if (selector !== undefined) {
      _selector = selector;
    }

    if (_selector.event_id === undefined)
      _selector.event_id = { $exists: true };

    if (_selector.event_type === undefined)
      _selector.event_type = { $exists: true };

    if (_selector.event_source === undefined)
      _selector.event_source = { $exists: true };

    if (_selector.event_target === undefined)
      _selector.event_target = { $exists: true };

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
