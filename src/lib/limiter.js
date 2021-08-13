const Bottleneck = require("bottleneck");

const hash = require("../common/hash.js");

const limiters = {};

const hexes = "0123456789abcdef";

hexes.split("").forEach((c1) => {
  hexes.split("").forEach((c2) => {
    limiters[c1 + c2] = new Bottleneck({
      maxConcurrent: 1,
      minTime: 1,
    });
  });
});

module.exports.getLimiter = function (name) {
  return limiters[hash(name).slice(0, 2)];
};

module.exports.runAsyncFuncWithLimiter = async function (
  name,
  asyncFunction,
  args
) {
  return await limiters[hash(name).slice(0, 2)].schedule(() =>
    asyncFunction(...args)
  );
};
