export const userRoutes = 
  function register(express, userInstance) {
    
    express.post('/user/', async (req, res) => {
      const instance = await userInstance.create(req.body)
      
      res.send({ success: true, data: { id: instance._id.toString() } })
    });

    express.get('/user/:id', async (req, res) => {
      console.log(req.params.id)
      const instance = await userInstance.findOneById(req.params.id)

      res.send({ success: true, data: instance })
    });

    express.put('/user/:id', async (req, res) => {
      const instance = await userInstance.updateOneById(req.params.id, req.body)

      res.send({ success: true, data: instance })
    });


    express.delete('/user/:id', async (req, res) => {
      const instance = await userInstance.deleteOneById(req.params.id)

      res.send({ success: true, data: instance })
    });
  }
