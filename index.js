/**
 * @Description :
 * @Author      : manho <manho30@outlook.my>
 * @Date        : 18/11/2022 23:23
 * @File        : index.js
 * @IDE         : WebStorm
 */

const express = require('express')

const bearer = require('./api/bearer')
const stream = require('./api/stream')

const app = express()


app.use(express.json({
    extended: false
}))

app.use('/bearer', bearer)
app.use('/stream', stream)

//CORS PREFLIGHT WHEN ANY PATH IS CALLED
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type,  Access-Control-Allow-Headers, Authorization, X-Requested-With')
    next()
})

app.listen(8000);
console.log('Server started at http://localhost:' + 8000);