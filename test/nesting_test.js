const assert = require("assert")
const AuthorChar = require("../models/author")
const mongoose = require("mongoose")


describe("Nesting records", function(){

    beforeEach(function(done){
        mongoose.connection.collection.authors.drop(function(){
            done()
        })
    })
    it("create new author with nested records in the database", function(done){
        var person = new AuthorChar({
            name: 'Harrys Jil',
            books: [
                {
                    title: 'Harrys in the Village',
                    pages: 400
                }
            ]
        })

        person.save().then(function(){
            AuthorChar.findOne({name:'Harrys Jil'}).then(function(result){
                assert(result.books.length === 1)
                done()
            })
        })
    })


    it("adds a book to an Author", function(done){
        var person = new AuthorChar({
            name: 'Boy Jil',
            books: [
                {
                    title: 'Boy in the Village',
                    pages: 400
                }
            ]
        })
        person.save().then(function(){
            AuthorChar.findOne({name:'Boy Jil'}).then(function(result){
                //add a book
                result.books.push({ 
                    title: 'Boys to Men',
                    pages: 250
                })

                result.save().then(function(){
                    AuthorChar.findOne({name:'Boy Jil'}).then(function(record){
                        assert(record.books.length === 2)
                        done()
                    })
                })
            })
        })

        
    })



})