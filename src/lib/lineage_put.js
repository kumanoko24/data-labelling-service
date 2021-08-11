const { event_put } = require("./event_put.js");

async function lineage_put({ lineage_id, source_did, target_did, event_meta }) {
  try {
    if (
      [lineage_id, source_did, target_did].some(
        (item) =>
          item?.trim() === "" ||
          item === undefined ||
          item === null ||
          Array.isArray(item) ||
          JSON.stringify(item) === "{}"
      )
    ) {
      throw "lineage_id, source_did, target_did must not be empty value, array or object";
    }

    const _lineage_id = (lineage_id + "").trim();
    const _source_did = (source_did + "").trim();
    const _target_did = (target_did + "").trim();

    // put event
    const event_id = await event_put({
      event_type: `##lineage::${_lineage_id}`,
      event_meta: event_meta || null,
      event_source: _source_did,
      event_target: _target_did,
      event_purpose: "##lineage",
    });

    // go to lineage checks
    setImmediate(() => {});

    return event_id;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports.lineage_put = lineage_put;
