// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const uid = Number(req.query.uid) || 1
  const data = {
    uid,
    name: 'John Doe1'
  }
  res.status(200).json(data)
}
