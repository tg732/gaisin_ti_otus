export const taskRoutes = (express, taskInstance) => {
    
    express.post('/task/', async (req, res) => {
      const instance = await taskInstance.create(req.body)
      
      res.send({ success: true, data: { id: instance._id.toString() } })
    });

    express.get('/task/:id', async (req, res) => {
      const instance = await taskInstance.findOneById(req.params.id)

      res.send({ success: true, data: instance })
    });

    express.get('/task/', async (req, res) => {
      const instance = await taskInstance.findAll()

      res.send({ success: true, data: instance })
    });

    express.put('/task/:id', async (req, res) => {
      const instance = await taskInstance.updateOneById(req.params.id, req.body)

      res.send({ success: true, data: instance })
    });


    express.delete('/task/:id', async (req, res) => {
      const instance = await taskInstance.deleteOneById(req.params.id)

      res.send({ success: true, data: instance })
    });

    express.get('/task/search', async (req, res) => {
      const names = await taskInstance.search(req.body.message)

      res.send({ success: true, data: { names } })
    });
  }
