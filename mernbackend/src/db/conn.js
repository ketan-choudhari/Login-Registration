const mongoose = require('mongoose');

const dbconnect=mongoose.connect('mongodb://0.0.0.0/youtubrRegistration', {
 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFinfAndModify:false
}).then(()=>{
    console.log('Connected to MongoDB');
}).catch((e) =>{
    console.log('No connection');
})


