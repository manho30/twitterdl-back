/**
 * @Description :
 * @Author      : manho <manho30@outlook.my>
 * @Date        : 19/11/2022 02:54
 * @File        : home.js
 * @IDE         : WebStorm
 */

const express = require('express');
const router = express.Router();

const http = require("https");

router.get('/', (req, res) => {
    return res.status(200)
        .header('Content-Type', 'application/json')
        .header('Access-Control-Allow-Origin', '*')
        .header('Access-Control-Allow-Methods', 'GET,POST')
        .header('Access-Control-Allow-Headers', 'Content-Type,  Access-Control-Allow-Headers, Authorization, X-Requested-With')
        .json({
            'ok': true,
            'status': 200,
            'message': ''
        });
})

module.exports = router;