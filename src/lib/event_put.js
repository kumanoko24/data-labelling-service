const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("0123456789QAZWSXEDCRFVTGBYHNUJMIKLOP", 6);

const { events, dids, labels } = require("../dbs.js");

const get_hash = require("../common/hash.js");

const { runAsyncFuncWithLimiter } = require("./limiter.js");

async function event_put({
  event_id,
  event_type,
  event_meta,
  event_source,
  event_target,
  event_purpose,
  event_object,
  event_timestamp,
}) {
  try {
    const __event_id = event_id || null;

    const _ts = event_timestamp || null;

    if (
      [event_type, event_source, event_target].some(
        (item) =>
          item?.trim() === "" ||
          item === undefined ||
          item === null ||
          Array.isArray(item) ||
          JSON.stringify(item) === "{}"
      )
    ) {
      throw "event_type, event_source, event_target must not be empty value, array or object";
    }

    const _event_type = (event_type + "").trim();
    const _event_meta = event_meta || null;
    const _event_source = (event_source + "").trim();
    const _event_target = (event_target + "").trim();
    const _event_purpose = event_purpose || null;

    // put event
    const timestamp =
      _ts !== null && !isNaN(parseInt(_ts, 10))
        ? new Date(parseInt(_ts, 10))
        : new Date();
    const _event_id = __event_id || timestamp.toISOString() + "_" + nanoid();
    await events.put({
      _id: _event_id,
      event_id: _event_id,
      event_type: _event_type,
      event_meta: _event_meta,
      event_source: _event_source,
      event_target: _event_target,
      event_purpose: _event_purpose,
      event_timestamp: timestamp.valueOf(),
      event_object: event_object || {},
    });

    setImmediate(async () => {
      // put did
      const f1 = async () => {
        const did_id = get_hash(_event_target);
        let did = { _id: did_id, name: _event_target };
        try {
          did = await dids.get(did_id);
        } catch (_) {}
        if (did.labels === undefined) did.labels = {};
        if (did.labels[_event_type] === undefined)
          did.labels[_event_type] = { count: 0, event_ids: [] };
        did.labels[_event_type].count += 1;
        did.labels[_event_type].event_ids.push(_event_id);
        await dids.put(did);
      };
      await runAsyncFuncWithLimiter(_event_target, f1, []);

      // put labels
      const f2 = async () => {
        const label_id = get_hash(_event_type);
        let label = { _id: label_id, name: _event_type };
        try {
          label = await labels.get(label_id);
        } catch (_) {}
        if (label.holders === undefined) label.holders = {};
        if (label.holders[_event_target] === undefined)
          label.holders[_event_target] = { count: 0, event_ids: [] };
        label.holders[_event_target].count += 1;
        label.holders[_event_target].event_ids.push(_event_id);
        await labels.put(label);
      };
      await runAsyncFuncWithLimiter(_event_type, f2, []);
    });

    // go to event checks
    setImmediate(() => {});

    return _event_id;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports.event_put = event_put;
