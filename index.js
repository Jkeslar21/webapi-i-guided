//import express
const express = require('express'); 
const db = require('./data/db.js');

//create express server
const server = express();

// add this to make POST and PUT work
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello Web XVII');
});

// write GET /now endpoint that returns current date and time as a string
server.get('/now', (req, res) => {
    const now = new Date().toISOString();
    res.send(now);
});

// Anything you want to export you pass as module.exports = {}
// CRUD
// "R" -Read/Retrieve
server.get('/hubs', (req, res) => {
    db.hubs
    .find()
    .then(hubs => {
        // 200-299 success
        // 300-399 redirect
        // 400-499 client error
        // 500-599 server error
        res.status(200).json(hubs);
    })
    .catch(err => {
        //handle it
        res.status(500).json({ message: 'error retrieving hubs' });
    })
});

// C -create
server.post('/hubs', (req, res) => {
    // read the data for the hub
    // axios.post('serverurl/hubs', dataObject)
    const hubInfo = req.body;

    // add the hub to our db
    db.hubs
    .add(hubInfo)
    .then(hub => {
        res.status(201).json(hub);
    })
    .catch(err => {
        // let the client know what happened
        res.status(500).json({ message: 'error creating hub' });
    })
});

server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id;
  
    db.hubs
      .remove(id)
      .then(deleted => {
        res.status(204).end(); // tells the client the request is done
      })
      .catch(error => {
        res.status(500).json({ message: 'error deleting the hub' });
      });
  });
  
  server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    db.hubs
      .update(id, changes)
      .then(updated => {
        if (updated) {
          res.status(200).json(updated);
        } else {
          res.status(404).json({ message: 'hub not found' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'error updating the hub' });
      });
  });

//server listening to request below
server.listen(4000, () => {
    console.log('\n** API up and running on port 4k **');
})

// recap to this point:
// run yarn
// yarn add express
// yarn server
// add index.js
// yarn server (to run server)
// loaded browser at http://localhost:4000