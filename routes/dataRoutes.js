const express = require("express");
const router = express.Router();
const Data = require("../models/Data");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// Route to get line chart data
router.get('/user-and-session-data', auth(false), function (req, res) {
  Data.getUserAndSessionData((error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error retrieving data into MySQL database');
    } else {
      res.status(200).json(result);
    }
  });
});
// Route to get bar chart data
router.get('/permissions-data', auth(false), function (req, res) {
  Data.getPermissions((error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error retrieving data into MySQL database');
    } else {
      res.status(200).json(result);
    }
  });
});
// Route to get bar chart data
router.get('/load-time-data', auth(false), function (req, res) {
  Data.getLoadTimeData((error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error retrieving data into MySQL database');
    } else {
      res.status(200).json(result);
    }
  });
});
// Route to get grid data
router.get('/user-language-data', auth(false), function (req, res) {
  Data.getUserLanguageData((error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error retrieving data into MySQL database');
    } else {
      res.status(200).json(result);
    }
  });
});
// Route to get screen and width dimensions grid data
router.get('/dimensions-data', auth(false), function (req, res) {
  Data.getScreenAndWindowDimensionsData((error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error retrieving data into MySQL database');
    } else {
      res.status(200).json(result);
    }
  });
});
// Route to get detailed report: screenWidth pie chart data
router.get('/screen-width-data', auth(false), function (req, res) {
  Data.getScreenWidthData((error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error retrieving data into MySQL database');
    } else {
      res.status(200).json(result);
    }
  });
});
// Route to get detailed report: screenHeight pie chart data
router.get('/screen-height-data', auth(false), function (req, res) {
  Data.getScreenHeightData((error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error retrieving data into MySQL database');
    } else {
      res.status(200).json(result);
    }
  });
});
// Route to get detailed report: windowWidth pie chart data
router.get('/window-width-data', auth(false), function (req, res) {
  Data.getWindowWidthData((error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error retrieving data into MySQL database');
    } else {
      res.status(200).json(result);
    }
  });
});
// Route to get detailed report: windowHeight pie chart data
router.get('/window-height-data', auth(false), function (req, res) {
  Data.getWindowHeightData((error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error retrieving data into MySQL database');
    } else {
      res.status(200).json(result);
    }
  });
});
// Route to get detailed report: min and max dimensions data
router.get('/min-max-dimensions-data', auth(false), function (req, res) {
  Data.getMinMaxDimensionsData((error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error retrieving data into MySQL database');
    } else {
      res.status(200).json(result);
    }
  });
});
// Route to get detailed report: combined dimensions dimensions count data
router.get('/combined-dimensions-data', auth(false), function (req, res) {
  Data.getCombinedDimensionsCountData((error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error retrieving data into MySQL database');
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;