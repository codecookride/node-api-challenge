const express = require('express');
const actiondb= require('./helpers/actionModel');
const projectdb= require('./helpers/projectModel')
const router = express.Router();



router.post('/', (req, res) => {
  projectdb.insert(req.body)
    .then(actions => {
      res.status(201).json(actions);
    })
    .catch(error => {
     
      console.log(error);
      res.status(500).json({
        message: 'Error adding the user',
      });
    });
});

router.post('/:id/actions',  (req, res) => {
    actiondb.insert(req.body)
    .then(actions => {
      res.status(201).json(actions);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the actions',
      });
    });
});

router.get('/', (req, res) => {
  
    projectdb.get(req.query.p)
    .then(d => {
      res.status(200).json(d);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the db',
      });
    });
  });

router.get('/:id', validateid, (req, res) => {
//   res.json(req.projects);
  projectdb.get(req.params.id)
    .then(actions => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: 'actions not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the actions',
      });
    });
});

router.get('/:id/actions', (req, res) => {
  actiondb.get(req.params.id)
  .then(comment => {
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: 'message not found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the message',
    });
  });
});

router.delete('/:id', (req, res) => {
  projectdb.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The porject has been removed' });
    } else {
      res.status(404).json({ message: 'The project could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the project',
    });
  });});

router.put('/:id', (req, res) => {
  const changes = req.body;
  projectdb.update(req.params.id, changes)
  .then(actions => {
    if (actions) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({ message: 'The project could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the project',
    });
  });});




//custom middleware

function validateid(req, res, next) {
  const {id} = req.params;

  projectdb.get(id)
  .then(user => {
    if (user) {
    req.user = user;
    next()
    } else {
      res.status(404).json({message:"project not found(from validateid) not found"})
    }
  })
  .catch(err =>{
    res.status(500).json({message:"nope", error:err})
  }
  );

}

// function validateUser(req, res, next) {
//  if (!req.body.id) {
//   res.status(400).json({message:"missing body (from validateUser) "});
//  }else if (!req.body.name){
//   res.status(400).json({message:"missing project name (from validateUser) "});
//  }else {
//   next();
//  }
// }

// function validateactions(req, res, next) {
//   if (req.body.text) {
//    next();
//   }else {
//    res.status(400).json({message:"missing actions text (from validateactions) "});
//   }
// }

module.exports = router;
