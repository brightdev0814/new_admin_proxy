const { get } = require("lodash");
const settingModel = require("../models/setting");
const credentialModel = require("../models/credential");
const { seolyzeLog } = require("../services/logger");
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
    await page.goto("https://seolyze.com/en");
    await page.click(".navbar-toggle");
    await page.click(".navlogin > a");
    await page.waitForSelector("#login.modal");
    await page.focus("#username").then(async () => {
      await page.keyboard.type(email, { delay: 100 });
    });
    await page.focus("#password").then(async () => {
      await page.keyboard.type(password, { delay: 100 });
    });
    await page.click("#stay_logged");

    await Promise.all([
      page.click("button#regButton"),
      page.waitForNavigation({ waitUntil: "load", timeout: 100000 }),
    ]).then(async (result) => {
      if (page.url() == "https://www.seolyze.com/en/EPS-KF/") {
        let cookies = await page.cookies();
        await browser.close(true);
        let cookie = "";
        for (let idx in cookies) {
          cookie += cookies[idx].name + "=" + cookies[idx].value + "; ";
        }
        if (await credentialModel.findOne({ type: "seolyze" })) {
          await credentialModel.findOneAndUpdate(
            { type: "seolyze" },
            {
              username: email,
              password: password,
            }
          );
        } else {
          await credentialModel.create({
            type: "seolyze",
            username: email,
            password: password,
          });
        }
        await settingModel.findOneAndUpdate(
          null,
          {
            seolyzeCookie: cookie,
          },
          {
            upsert: true,
          }
        );
        seolyzeLog.info(`Start session with ${email} successfully.`);
        res.send("Login successfully.");
      } else {
        await browser.close(true);
        seolyzeLog.error(`Start session with ${email} failed.`);
      }
    });
  } catch (err) {
    seolyzeLog.error(
      `Start session with ${email} failed. ${
        get(err, "response.data.message") || err.toString()
      }`
    );
    res.status(500).send(get(err, "response.data.message") || err.toString());
  }
};

module.exports = {
  login,
};
