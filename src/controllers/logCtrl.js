const fs = require("fs");
const path = require("path");

const getLogs = async (req, res) => {
  try {
    let logs = [];
    fs.readdirSync(path.join(__dirname, "../public/logs/")).forEach(
      (file, _) => {
        if (path.extname(file) == ".log") {
          logs.push({ name: path.basename(file) });
        }
      }
    );
    res.json(logs);
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

const deleteLog = async (req, res) => {
  try {
    const { name } = req.params;
    if (fs.existsSync(path.join(__dirname, "../public/logs/", name))) {
      fs.unlinkSync(path.join(__dirname, "../public/logs", name));
      res.send("Successfully deleted.");
    } else {
      res.status(500).send("The log file does not exist.");
    }
  } catch (err) {
    res.status(500).send(err.toString());
  }
};

module.exports = {
  getLogs,
  deleteLog,
};
