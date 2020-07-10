const assert = require("assert")
const MarioChar = require("../models/mariochar")
//describe tests
describe("Updating records", function(){

    var char;
    beforeEach(function(done){
         char = new MarioChar({
            name: 'Mario',
            weight: 50
        })

        char.save().then(function(){
            done()
        })
    })

    it("update one record in the database", function(done){
      
        MarioChar.findOneAndUpdate({name:'Mario'}, {name:'Harrys'}, {useFindAndModify:false}).then(function(){
            MarioChar.findOne({_id:char._id}).then(function(result){
                assert(result.name === 'Harrys')
                done()
            })
        })

    })

    
    it("increment the weight by 1 in the database", function(done){
      
        MarioChar.update({}, {$inc: {weight:5}}).then(function(){
            MarioChar.findOne({name:'Mario'}).then(function(result){
                assert(result.weight === 55)
                done()
            })
        })

    })
});