const express = require('express');

const app = express();
const ipfsAPI = require('ipfs-api');


//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI('ipfs.io', '5001', { protocol: 'https' });

//Reading file from computer
let testFile = { test: 'test2', user: 'userData' };
//Creating buffer for ipfs function to add file to the system
let testBuffer = new Buffer(JSON.stringify(testFile));

//Addfile router for adding file a local file to the IPFS network without 
//any local node
app.get('/addfile', function(req, res) {
  ipfs.files.add(testBuffer, function(err, file) {
    if (err) {
      console.log(err);
    }
    console.log(file);
  });
});
//Getting the uploaded file via hash code.
app.get('/getfile', function(req, res) {
  //This hash is returned hash of addFile router.
  const validCID = 'QmZnQMfkSa3tpZJ78NMak4LeZ17B6S8DHkPJYU478mrBPQ';

  ipfs.files.get(validCID, function(err, files) {
    files.forEach(file => {
      console.log(file.path);
      console.log(file.content.toString('utf8'));
    });
  });
});

app.get('/publish', function(req, res) {
  ipfs.name.publish('QmZnQMfkSa3tpZJ78NMak4LeZ17B6S8DHkPJYU478mrBPQ', res => {
    console.log(res);
  });
});