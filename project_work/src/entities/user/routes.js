export const userRoutes = (express, userInstance) => {
    
    express.post('/user/', async (req, res) => {
      const instance = await userInstance.create(req.body)
      
      res.send({ success: true, data: { id: instance._id.toString() } })
    });

    express.get('/user/:id', async (req, res) => {
      const instance = await userInstance.findOneById(req.params.id)

      res.send({ success: true, data: instance })
    });
	
	express.get('/userHead', async (req, res) => {
      const instance = await userInstance.findAll(true)

      res.send({ success: true, data: instance })
    });
	
	express.get('/userPerformer', async (req, res) => {
      const instance = await userInstance.findAll(false)

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
