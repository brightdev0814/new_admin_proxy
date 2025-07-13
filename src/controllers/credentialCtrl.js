const credentialModel = require("../models/credential");

const fetch = async (req, res) => {
  const type = req.params.service;
  const credential = await credentialModel.findOne({ type });
  res.json(credential);
};

module.exports = {
  fetch,
};
