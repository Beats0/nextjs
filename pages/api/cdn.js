// /api/cdn?url=gcore.jsdelivr.net/gh/Beats0/beats0.github.io@master/img/avatar-beats0.jpg
const request = require('request');

const timeout = 30000

export default function handler(req, res) {
  let url = req.query.url

  /**
   * example.com => https://example.com
   */
  if (!/^https?:\/\/.+/.test(url)) {
    url = `https://${url}`
  }

  request.get({
    url,
    timeout,
    encoding: null
  }, (err, response, body) => {
    let result = body
    if (err) {
      res.status(500).send(err.toString())
    } else {
      const headers = response.headers
      // set headers
      for (const key in headers) {
        res.setHeader(key, headers[key])
      }
      res.send(result)
    }
  })
}
