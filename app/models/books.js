/**
 * Created by sboyapati on 1/27/16.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BooksSchema   = new Schema({
    title: String,
    author:String,
    isbn10:String,
    publicationyear:String,
    rating:Number
});

module.exports = mongoose.model('Book', BooksSchema);