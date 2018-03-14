"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
var express = require("express");
var router = express.Router();
router.get('/bye', function (req, res) {
    res.render('bye', { title: 'Bye' });
});
exports.default = router;
//# sourceMappingURL=bye.js.map