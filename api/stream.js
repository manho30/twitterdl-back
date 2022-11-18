/**
 * @Description :
 * @Author      : manho <manho30@outlook.my>
 * @Date        : 19/11/2022 02:11
 * @File        : stream.js
 * @IDE         : WebStorm
 */

const express = require('express');
const router = express.Router();

const http = require("https");

router.get('/', (req, res) => {
    const _id = req.query.id
    const _token = req.query.token

    if (!_id) {
        return res.status(400).json({
            'ok': false,
            'status': 400,
            "error": "Missing video id "
        })
    }

    if (!_token) {
        return res.status(400).json({
            'ok': false,
            'status': 400,
            "error": "Missing bearer token "
        })
    }

    return http.get(`https://api.twitter.com/1.1/statuses/show.json?id=1${_id}`, {
        headers: {
            "Authorization": `Bearer ${_token}`
        }
    }, (resp) => {
        resp.setEncoding("utf8");

        let body = "";
        resp.on("data", data => {
            body += data;
        });
        resp.on("end", () => {
            return res.status(200)
                .header('Content-Type', 'application/json')
                .header('Access-Control-Allow-Origin', '*')
                .header('Access-Control-Allow-Methods', 'GET,POST')
                .header('Access-Control-Allow-Headers', 'Content-Type,  Access-Control-Allow-Headers, Authorization, X-Requested-With')
                .json(JSON.parse(body));
        });
    })
        .on("error", (err) => {
            return res.status(500)
                .header('Content-Type', 'application/json')
                .header('Access-Control-Allow-Origin', '*')
                .header('Access-Control-Allow-Methods', 'GET,POST')
                .header('Access-Control-Allow-Headers', 'Content-Type,  Access-Control-Allow-Headers, Authorization, X-Requested-With')
                .json(JSON.parse(err));
            }
        );
});

module.exports = router;