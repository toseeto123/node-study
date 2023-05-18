const express = require('express');

const router = express.Router();

// GET /user 라우터
router.get('/', (req, res) => { //app.js에 /user + / = GET /user/가 됨
  res.send('Hello, User');
});

module.exports = router;