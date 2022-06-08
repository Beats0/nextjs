// /api/cdn?url=gcore.jsdelivr.net/gh/Beats0/beats0.github.io@master/img/avatar-beats0.jpg
const request = require('request');

const timeout = 30000
const proxyList = [
  { "cdn.jsdelivr.net": "gcore.jsdelivr.net" },
  { "fastly.jsdelivr.net": "gcore.jsdelivr.net" },
]

export default function handler(req, res) {
  let url = req.query.url

  /**
   * example.com => https://example.com
   */
  if (!/^https?:\/\/.+/.test(url)) {
    url = `https://${url}`
  }
  for (let i = 0; i < proxyList.length; i++) {
    const item = proxyList[i]
    const k = Object.keys(item)[0]
    const v = item[k]
    if (url.indexOf(k) != -1) {
      url = url.replace(k, v)
    }
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
