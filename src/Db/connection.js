const moongoes=require("mongoose")
moongoes.connect("mongodb://127.0.0.1:27017/APIS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log("connection succeful")
  }).catch((error)=>{
    console.log(`connection failed ${error}`)
  })