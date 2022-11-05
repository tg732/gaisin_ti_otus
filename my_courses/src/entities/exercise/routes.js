module.exports = {
  register(express, exerciseInstance) {
    
    express.post('/exercise/', async (req, res) => {
      console.log(req.query)
      const instance = await exerciseInstance.create(req.query)
      
      res.send({ success: true, data: { id: instance._id.toString() } })
    });

    express.get('/exercise/:id', async (req, res) => {
      console.log(req.params.id)
      const instance = await exerciseInstance.findOneById(req.params.id)

      res.send({ success: true, data: instance })
    });

    express.put('/exercise/:id', async (req, res) => {
      const instance = await exerciseInstance.updateOneById(req.params.id, req.body)

      res.send({ success: true, data: instance })
    });


    express.delete('/exercise/:id', async (req, res) => {
      const instance = await exerciseInstance.deleteOneById(req.params.id)

      res.send({ success: true, data: instance })
    });
  }
}
