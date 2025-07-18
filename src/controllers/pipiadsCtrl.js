const credentialModel = require("../models/credential");
const settingModel = require("../models/setting");
const { pipiadsLog } = require("../services/logger");
const { get } = require("lodash");
const puppeteer = require("puppeteer-extra");

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    const windowsLikePathRegExp = /[a-z]:\\/i;
    let inProduction = false;

    if (!windowsLikePathRegExp.test(__dirname)) {
      inProduction = true;
    }
    let options = {};
    if (inProduction) {
      options = {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--media-cache-size=0",
          "--disk-cache-size=0",
          "--ignore-certificate-errors",
          "--ignore-certificate-errors-spki-list",
        ],
        timeout: 100000,
      };
    } else {
      options = {
        headless: false,
        timeout: 100000,
        args: [
          "--ignore-certificate-errors",
          "--ignore-certificate-errors-spki-list",
        ],
      };
    }
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto("https://www.pipiads.com/login", {
      waitUntil: "load",
      timeout: 100000,
    });
    await page.waitForSelector("input[type='text']");
    console.log("LOADING3");
    await page.focus("input[type='text']").then(async () => {
      await page.keyboard.type(email, { delpay: 100 });
    });
    console.log("LOADING4");
    await page.waitForSelector("input[type='password']");
    await page.focus("input[type='password']").then(async () => {
      await page.keyboard.type(password, { delpay: 100 });
    });
    await page.click("button");
  } catch (err) {
    pipiadsLog.error(
      `Start session with ${email} failed: ${get(err, "response.data.message")}`
    );
    res.status(500).send(get(err, "response.data.message") || err.toString());
  }
};

module.exports = {
  login,
};
