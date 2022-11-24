const router = require('express').Router();

router
      .get('/', (req, res) => {
            res.send(`Hello desde ${req.baseUrl}`);
      })

    
module.exports = router;