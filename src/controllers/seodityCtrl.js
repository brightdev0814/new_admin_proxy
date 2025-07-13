const credentialModel = require("../models/credential");
const settingModel = require("../models/setting");
const { seodityLog } = require("../services/logger");
const { get } = require("lodash");
const dvAxios = require("devergroup-request").default;
const axios = new dvAxios({
  axiosOpt: {
    timeout: 30000,
  },
});

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let body = JSON.stringify({ username: email, password });
    let { data } = await axios.instance.post(
      "https://api.seodity.com/v1/auth/get-token",
      body,
      {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
          accept: "application/json, text/plain, */*",
          "content-type": "application/json; charset=UTF-8",
          "content-length": Buffer.from(body, "utf-8"),
        },
      }
    );
    if (data && data.token) {
      if (await credentialModel.findOne({ type: "seodity" })) {
        await credentialModel.findOneAndUpdate(
          { type: "seodity" },
          {
            username: email,
            password: password,
          }
        );
      } else {
        await credentialModel.create({
          type: "seodity",
          username: email,
          password: password,
        });
      }
      await settingModel.findOneAndUpdate(
        null,
        {
          seodityCookie: JSON.stringify(data),
        },
        {
          upsert: true,
        }
      );
      seodityLog.info(`Start session with ${email} successfully.`);
      res.send("Login successfully.");
    }
  } catch (err) {
    semrushLog.error(
      `Start session with ${email} failed: ${
        get(err, "response.data.message") || err.toString()
      }`
    );
    res.status(500).send(get(err, "response.data.message") || err.toString());
  }
};

module.exports = {
  login,
};
