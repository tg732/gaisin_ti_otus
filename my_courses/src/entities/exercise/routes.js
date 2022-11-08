export const exerciseRoutes = 
  function register(express, exerciseInstance) {
    
    express.post('/exercise/', async (req, res) => {
      const instance = await exerciseInstance.create(req.body)
      
      res.send({ success: true, data: { id: instance._id.toString() } })
    });

    express.get('/exercise/:id', async (req, res) => {
      var courseId = req.params.id
      const instance = await exerciseInstance.findAll(courseId)

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
