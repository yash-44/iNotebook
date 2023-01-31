const mongoose = require('mongoose')

const mongoURI = "mongodb://127.0.0.1:27017/myapp"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, {
        dbName: "products",
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("mongodb connected")
    })
    .catch((err)=> console.log(err.message))

    // const cat = mongoose.model('cat',{name:String})
    // const kitty = cat({name: "biladi"})
    // kitty.save().then(()=> console.log('mewo'))
}




module.exports = connectToMongo
