const settingModel = require("../models/setting");
const credentialModel = require("../models/credential");
const { sistrixLog } = require("../services/logger");
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
    await page.goto("https://app.sistrix.com/login/", {
      waitUntil: "load",
      timeout: 100000,
    });
    await page.waitForTimeout(2000);
    await page.focus("input#username-input").then(async () => {
      await page.keyboard.type(email, { deplay: 200 });
    });
    await page.focus("input[type='password']").then(async () => {
      await page.keyboard.type(password, { delay: 200 });
    });
    await Promise.all([
      page.waitForNavigation({ waitUntil: "load", timeout: 100000 }),
      page.click("button"),
    ]).then(async (result) => {
      if (!/\/login/.test(page.url())) {
        let cookies = await page.cookies();
        await browser.close(true);
        let cookie = "";
        for (let idx in cookies) {
          cookie += cookies[idx].name + "=" + cookies[idx].value + "; ";
        }
        if (await credentialModel.findOne({ type: "sistrix" })) {
          await credentialModel.findOneAndUpdate(
            { type: "sistrix" },
            {
              username: email,
              password: password,
            }
          );
        } else {
          await credentialModel.create({
            type: "sistrix",
            username: email,
            password: password,
          });
        }
        await settingModel.findOneAndUpdate(
          null,
          {
            sistrixCookie: cookie,
          },
          {
            upsert: true,
          }
        );
        sistrixLog.info(`Start session with ${email} successfully.`);
        res.send("Login successfully.");
      } else {
        sistrixLog.error(`Start session with ${email} failed.`);
        res.status(500).send("Credential is incorrect.");
      }
    });
  } catch (err) {
    sistrixLog.error(
      `Start session with ${email} failed: ${
        get(err, "response.data.message") || err.toString()
      }`
    );
    res.status(500).send(get(err, "response.data.message") || err.message);
  }
};

module.exports = {
  login,
};
