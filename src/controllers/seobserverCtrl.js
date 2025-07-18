const { get } = require("lodash");
const credentialModel = require("../models/credential");
const settingModel = require("../models/setting");
const { seobserverLog } = require("../services/logger");
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
    await page.goto("https://app.seobserver.com/login");
    await page.focus("#UserEmail").then(async () => {
      await page.keyboard.type(email, { delay: 100 });
    });
    await page.focus("#UserPassword").then(async () => {
      await page.keyboard.type(password, { delay: 100 });
    });
    await Promise.all([
      page.click("button[type='submit']"),
      page.waitForNavigation({ waitUntil: "load", timeout: 100000 }),
    ]).then(async (result) => {
      if (page.url() !== "https://app.seobserver.com/login") {
        let cookies = await page.cookies();
        await browser.close(true);
        let cookie = "";
        for (let idx in cookies) {
          cookie += cookies[idx].name + "=" + cookies[idx].value + "; ";
        }
        console.log(cookie);
        if (await credentialModel.findOne({ type: "seobserver" })) {
          await credentialModel.findOneAndUpdate(
            { type: "seobserver" },
            {
              username: email,
              password: password,
            }
          );
        } else {
          await credentialModel.create({
            type: "seobserver",
            username: email,
            password: password,
          });
        }
        await settingModel.findOneAndUpdate(
          null,
          {
            seobserverCookie: cookie,
          },
          {
            upsert: true,
          }
        );
        seobserverLog.info(`Start session with ${email} successfully.`);
        res.send("Login successfully.");
      } else {
        await browser.close(true);
        seobserverLog.error(`Start session with ${email} failed.`);
        res.status(500).send("Credential is incorrect.");
      }
    });
  } catch (err) {
    seobserverLog.error(
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
