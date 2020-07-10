const mongoose = require("mongoose")

//Connect to db before running test
before(function(done){
    //Connect to Mongodb
    mongoose.connect("mongodb://localhost/testdb", { useNewUrlParser: true, useUnifiedTopology: true })

    mongoose.connection.once("open", function(){
        console.log("We are connected Nigga")
        done()
    }).on("error", function(error){
        console.log("Wahala dey o ", error)
    })
})

//Drop all collections before running each test
beforeEach(function(done){
    //Drop characters model
    mongoose.connection.collections.mariochars.drop(function(){
        done();
    })
})
