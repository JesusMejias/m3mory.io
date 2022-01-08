import {
  createApi
} from 'unsplash-js'

const serverApi = createApi({
  accessKey: process.env.UNSPLASH_API
})

export default async (req, res) => {
  let tempArray = []
  await serverApi.photos.getRandom({
    count: req.body
  }).then(result => {
    if (result.type === 'success') {
      result.response.map(value => tempArray.push(value))
      res.status(200).json(result.response)
    } else {
      res.status(500).json({ status: 'Error'})
    }
  })
}