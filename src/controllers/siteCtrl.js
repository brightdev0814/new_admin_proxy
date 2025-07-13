const siteModel = require("../models/site");

const getSites = async (req, res) => {
  try {
    const { search = "", skip = 0, limit = 10 } = req.query;
    const sanitizedSearch = search.replace(/[^a-zA-Z0-9 ]/g, "");

    const sites = await siteModel
      .find({
        $or: [
          {
            url: {
              $regex: sanitizedSearch,
              $options: "i",
            },
          },
          {
            membershipApiKey: {
              $regex: sanitizedSearch,
              $options: "i",
            },
          },
        ],
      })
      .sort({ url: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const rowCount = await siteModel.countDocuments({
      $or: [
        {
          url: {
            $regex: sanitizedSearch,
            $options: "i",
          },
        },
        {
          membershipApiKey: {
            $regex: sanitizedSearch,
            $options: "i",
          },
        },
      ],
    });
    res.json({
      sites,
      rowCount,
    });
  } catch (err) {
    res.status(500).send(err.toString());
  }
};
const getSite = async (req, res) => {
  try {
    let { id } = req.params;
    let site = await siteModel.findById(id);
    res.json(site);
  } catch (err) {
    res.status(500).send(err.toString());
  }
};
const createSite = async (req, res) => {
  try {
    let site = req.body;
    let result = await siteModel.create(site);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.toString());
  }
};
const updateSite = async (req, res) => {
  try {
    let { id } = req.params;
    let site = req.body;
    let result = await siteModel.findByIdAndUpdate(id, site);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.toString());
  }
};
const deleteSite = async (req, res) => {
  try {
    let { id } = req.params;
    let result = await siteModel.findByIdAndDelete(id);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

module.exports = {
  getSites,
  getSite,
  createSite,
  updateSite,
  deleteSite,
};
