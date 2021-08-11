const { event_search } = require("./event_search.js");

async function lineage_search({ lineage_id }) {
  try {
    const docs = await event_search({
      event_type: `##lineage::${lineage_id}`,
    });

    return docs.reverse();
  } catch (err) {
    console.error(err);

    throw err;
  }
}

module.exports.lineage_search = lineage_search;
