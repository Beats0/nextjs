// /api/jsdelivr/gh/Beats0/beats0.github.io@master/img/avatar-beats0.jpg
const request = require('request');

const cdnHost = 'https://gcore.jsdelivr.net/'
const timeout = 60000

export default function handler(req, res) {
  const { path } = req.query
  const pathString = path.join('/')
  const url = `${cdnHost}${pathString}`

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
        if(key === 'cache-control') {
          res.setHeader('cache-control', 'public, max-age=3600, s-maxage=3600')
        } else if(key.toLowerCase() === 'etag') {
          // auto set ETag
        }
         else {
          res.setHeader(key, headers[key])
        }
      }
      res.send(result)
    }
  })
}
