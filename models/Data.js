// Model: Static.js
const mysql = require("mysql");

// Connect to MySQL database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'esukartocse135.com',
  password: '123abcDEF!',
  database: 'collector'
});

connection.connect();

class Data {
  static getUserAndSessionData(callback) {
    const query = `
    WITH RECURSIVE date_list AS (
      SELECT MIN(DATE(pageEnterTime)) AS date_val
      FROM activity_log
      UNION ALL
      SELECT DATE_ADD(date_val, INTERVAL 1 DAY)
      FROM date_list
      WHERE date_val < (SELECT MAX(DATE(pageEnterTime)) FROM activity_log)
    )
    SELECT dl.date_val,
           IFNULL(s.session_count, 0) AS session_count,
           IFNULL(u.user_count, 0) AS user_count,
           IFNULL(l.bounce_session_count, 0) AS bounce_session_count
    FROM date_list dl
    LEFT JOIN (
      SELECT DATE(l.pageEnterTime) AS date,
             COUNT(DISTINCT l.sessionId) AS session_count
      FROM activity_log l
      JOIN static s ON l.sessionId = s.sessionId
      GROUP BY date
    ) AS s ON dl.date_val = s.date
    LEFT JOIN (
      SELECT DATE(l.pageEnterTime) AS date,
             COUNT(DISTINCT s.userId) AS user_count
      FROM activity_log l
      JOIN static s ON l.sessionId = s.sessionId
      GROUP BY date
    ) AS u ON dl.date_val = u.date
    LEFT JOIN (
      SELECT DATE(pageEnterTime) AS date,
             COUNT(DISTINCT sessionId) AS bounce_session_count
      FROM activity_log
      WHERE TIMESTAMPDIFF(SECOND, pageEnterTime, pageLeaveTime) < 2
      GROUP BY date
    ) AS l ON dl.date_val = l.date
    ORDER BY dl.date_val;    
  `;
    connection.query(query, callback);
  }

  static getLoadTimeData(callback) {
    const query = `
    SELECT DATE_FORMAT(pageLoadStart, "%Y-%m-%d %H:00:00") AS hour,
      SUM(CASE WHEN loadTime < 500 THEN 1 ELSE 0 END) AS sessions_lt_500,
      SUM(CASE WHEN loadTime >= 500 THEN 1 ELSE 0 END) AS sessions_ge_500
    FROM performance
    GROUP BY hour
    ORDER BY hour;
    `;
    connection.query(query, callback);
  }

  static getPermissions(callback) {
    const query = `
    SELECT
      COUNT(DISTINCT CASE WHEN acceptsCookies = 1 THEN userId END) AS nu_accepts_cookies,
      COUNT(DISTINCT CASE WHEN allowsJavascript = 1 THEN userId END) AS nu_allows_js,
      COUNT(DISTINCT CASE WHEN allowsImages = 1 THEN userId END) AS nu_allows_images,
      COUNT(DISTINCT CASE WHEN allowsCSS = 1 THEN userId END) AS nu_allows_css,
      COUNT(DISTINCT CASE WHEN acceptsCookies = 0 THEN userId END) AS nu_naccepts_cookies,
      COUNT(DISTINCT CASE WHEN allowsJavascript = 0 THEN userId END) AS nu_nallows_js,
      COUNT(DISTINCT CASE WHEN allowsImages = 0 THEN userId END) AS nu_nallows_images,
      COUNT(DISTINCT CASE WHEN allowsCSS = 0 THEN userId END) AS nu_nallows_css,
      COUNT(DISTINCT CASE WHEN acceptsCookies = 1 THEN sessionId END) AS ns_accepts_cookies,
      COUNT(DISTINCT CASE WHEN allowsJavascript = 1 THEN sessionId END) AS ns_allows_js,
      COUNT(DISTINCT CASE WHEN allowsImages = 1 THEN sessionId END) AS ns_allows_images,
      COUNT(DISTINCT CASE WHEN allowsCSS = 1 THEN sessionId END) AS ns_allows_css,
      COUNT(DISTINCT CASE WHEN acceptsCookies = 0 THEN sessionId END) AS ns_naccepts_cookies,
      COUNT(DISTINCT CASE WHEN allowsJavascript = 0 THEN sessionId END) AS ns_nallows_js,
      COUNT(DISTINCT CASE WHEN allowsImages = 0 THEN sessionId END) AS ns_nallows_images,
      COUNT(DISTINCT CASE WHEN allowsCSS = 0 THEN sessionId END) AS ns_nallows_css
    FROM static;
    `;
    connection.query(query, callback);
  }

  static getUserLanguageData(callback) {
    const query = `
    SELECT userLanguage, COUNT(sessionId) AS session_count
    FROM static
    GROUP BY userLanguage;
    `;
    connection.query(query, callback);
  }

  static getScreenAndWindowDimensionsData(callback) {
    const query = `
    SELECT sessionId, screenWidth, screenHeight, windowWidth, windowHeight
    FROM static;
    `;
    connection.query(query, callback);
  }

  static getScreenWidthData(callback) {
    const query = `
    SELECT
        FLOOR(screenWidth / 100) * 100 AS r_dimension,
        COUNT(DISTINCT sessionId) AS session_count
    FROM static
    GROUP BY r_dimension;
    `;
    connection.query(query, callback);
  }

  static getScreenHeightData(callback) {
    const query = `
    SELECT
        FLOOR(screenHeight / 100) * 100 AS r_dimension,
        COUNT(DISTINCT sessionId) AS session_count
    FROM static
    GROUP BY r_dimension;
    `;
    connection.query(query, callback);
  }

  static getWindowWidthData(callback) {
    const query = `
    SELECT
        FLOOR(windowWidth / 100) * 100 AS r_dimension,
        COUNT(DISTINCT sessionId) AS session_count
    FROM static
    GROUP BY r_dimension;
    `;
    connection.query(query, callback);
  }

  static getWindowHeightData(callback) {
    const query = `
    SELECT
        FLOOR(windowHeight / 100) * 100 AS r_dimension,
        COUNT(DISTINCT sessionId) AS session_count
    FROM static
    GROUP BY r_dimension;
    `;
    connection.query(query, callback);
  }

  static getMinMaxDimensionsData(callback) {
    const query = `
    SELECT
        MIN(screenWidth) AS min_screenWidth,
        MAX(screenWidth) AS max_screenWidth,
        MIN(screenHeight) AS min_screenHeight,
        MAX(screenHeight) AS max_screenHeight,
        MIN(windowWidth) AS min_windowWidth,
        MAX(windowWidth) AS max_windowWidth,
        MIN(windowHeight) AS min_windowHeight,
        MAX(windowHeight) AS max_windowHeight
    FROM
        static;
    `;
    connection.query(query, callback);
  }

  static getCombinedDimensionsCountData(callback) {
    const query = `
    SELECT
        FLOOR(screenWidth / 100) * 100 AS rounded_screenWidth,
        FLOOR(screenHeight / 100) * 100 AS rounded_screenHeight,
        FLOOR(windowWidth / 100) * 100 AS rounded_windowWidth,
        FLOOR(windowHeight / 100) * 100 AS rounded_windowHeight,
        COUNT(DISTINCT sessionId) AS session_count
    FROM static
    GROUP BY rounded_screenWidth, rounded_screenHeight, rounded_windowWidth, rounded_windowHeight
    ORDER BY session_count DESC;
    `;
    connection.query(query, callback);
  }
}

module.exports = Data;
