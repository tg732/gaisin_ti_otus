module.exports = {
  register(express, commentInstance) {
    
    express.post('/comment/', async (req, res) => {
      const instance = await commentInstance.create(req.body)

      res.send({ success: true, data: { id: instance._id.toString() } })
    });

    express.get('/comment/', async (req, res) => {

      const instance = await commentInstance.findAll()

      res.send({ success: true, data: instance })
    });

    express.get('/comment/search', async (req, res) => {
      const messages = await commentInstance.search(req.body.message)

      res.send({ success: true, data: { messages } })
    });
  }
}
