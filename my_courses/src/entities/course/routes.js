export const courseRoutes = 
  function register(express, courseInstance) {
    
    express.post('/course/', async (req, res) => {
      const instance = await courseInstance.create(req.body)
      
      res.send({ success: true, data: { id: instance._id.toString() } })
    });

    express.get('/course/:id', async (req, res) => {
      const instance = await courseInstance.findOneById(req.params.id)

      res.send({ success: true, data: instance })
    });

    express.get('/course/', async (req, res) => {
      const instance = await courseInstance.findAll()

      res.send({ success: true, data: instance })
    });

    express.put('/course/:id', async (req, res) => {
      const instance = await courseInstance.updateOneById(req.params.id, req.body)

      res.send({ success: true, data: instance })
    });


    express.delete('/course/:id', async (req, res) => {
      const instance = await courseInstance.deleteOneById(req.params.id)

      res.send({ success: true, data: instance })
    });

    express.get('/course/search', async (req, res) => {
      const names = await courseInstance.search(req.body.message)

      res.send({ success: true, data: { names } })
    });
  }
