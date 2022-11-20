export const documentRoutes = (express, documentInstance) => {
    
    express.post('/document/', async (req, res) => {
      const instance = await documentInstance.create(req.body)
      
      res.send({ success: true, data: { id: instance._id.toString() } })
    });

    express.get('/document/:id', async (req, res) => {
      var courseId = req.params.id
      const instance = await documentInstance.findAll(courseId)

      res.send({ success: true, data: instance })
    });

    express.put('/document/:id', async (req, res) => {
      const instance = await documentInstance.updateOneById(req.params.id, req.body)

      res.send({ success: true, data: instance })
    });


    express.delete('/document/:id', async (req, res) => {
      const instance = await documentInstance.deleteOneById(req.params.id)

      res.send({ success: true, data: instance })
    });
  }
