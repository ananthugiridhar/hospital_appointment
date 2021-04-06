var express = require('express');
var router = express.Router();
const objectId = require('mongodb').ObjectID;

/* GET home page. */

router.get('/appointments', (req, res, next)=>{
  req.collection.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error)); 
}); 

router.post('/appointments', (req, res, next) => { 
  const { appointmentDate, slot, name, phone} = req.body;
  if(!appointmentDate || !slot || !name || !phone){
    return res.status(400).json({
      message : 'Appointment date, time slot, name and phone are required'
    })
  }

  const payload = { appointmentDate,  slot, name, phone };
  req.collection.insertOne(payload)
    .then(result => res.json(result.ops[0]))
    .catch(error => res.status(400).json(
      {message: "Time slot is not available for appointment choose another slot"}
    ));
});


router.delete('/appointments/:id', (req, res, next) => {
  const {id} = req.params;
  const _id = objectId(id);

  req.collection.deleteOne({_id})
  .then(result => res.json(result))
  .catch(error => res.send(error));
})

module.exports = router;
