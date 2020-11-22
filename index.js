const express = require('express')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const axios = require('axios')

require('dotenv').config()

const port = process.env.PORT || 91
const { APIURL, APIBEARER, MAXRESULT } = process.env

const server = express()

server.use(compression(), helmet(), cors())
server.use(bodyParser.json())

server.get('/', (req, res) => {
    res.send('Hello World')
})

const fetchTweets = (url) => {
    return axios(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${APIBEARER}`
        }
    })
}

server.get('/:term', async (req, res) => {    
    const { term } = req.params
    const fullUrl = `${APIURL}/1.1/search/tweets.json?q="${term}"&result_type=popular&count=${MAXRESULT}`

    const result = await fetchTweets(fullUrl).then(response => response.data)
        
    res.send(result)
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})