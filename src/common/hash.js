const crypto = require("crypto");

module.exports = (input) =>
  crypto.createHash("sha256").update(input).digest().toString("hex");
