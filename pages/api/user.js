const request = require('request');

const timeout = 10000

export default function handler(req, res) {
  const uid = req.query.uid
  request.get({
    url: `http://api.bilibili.com/x/web-interface/card?mid=${uid}`,
    timeout,
  }, (err, response, body) => {
    let result = body
    if (err) {
      res.status(500).json({ uid, code: -1, message: 'request error' })
    } else {
      res.status(response.statusCode).json(result)
    }
  })
}
