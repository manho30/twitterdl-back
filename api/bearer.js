/**
 * @Description :
 * @Author      : manho <manho30@outlook.my>
 * @Date        : 19/11/2022 00:10
 * @File        : bearer.js
 * @IDE         : WebStorm
 */

const express = require('express');
const router = express.Router();

const http = require("https");

router.get('/', (req, res) => {
    const _id = req.query.id

    if (!_id) {
        return res.status(400).json({
            'ok': false,
            'status': 400,
            "error": "Missing video id "
        })
    }
    return http.get(`https://twitter.com/i/videos/tweet/${_id}.json`, (resp) => {
        resp.setEncoding("utf8");

        let body = "";
        resp.on("data", data => {
            body += data;
        });
        resp.on("end", () => {

            const bearer_token = http.get(body.match(/src="(.*js)/)[1], (resp2) => {
                resp2.setEncoding("utf8");

                let body2 = "";
                resp2.on("data", data => {
                    body2+= data;
                });
                resp2.on("end", () => {
                    return res.status(200)
                        .header('Content-Type', 'application/json')
                        .header('Access-Control-Allow-Origin', '*')
                        .header('Access-Control-Allow-Methods', 'GET,POST')
                        .header('Access-Control-Allow-Headers', 'Content-Type,  Access-Control-Allow-Headers, Authorization, X-Requested-With')
                        .json({
                            'ok': true,
                            'status': 200,
                            'data': body2.match(/Bearer ([a-zA-Z0-9%-])+/)[0].replace('Bearer ', '')
                        })
                });
            });
        });
    });
});

module.exports = router;