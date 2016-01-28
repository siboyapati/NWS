var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var database = require('./config/database');
var Book = require('./app/models/books');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));


var router = express.Router();

router.get('/', function (req, res) {
    res.json({message: 'welcome to my api!'});
});

router.route('/books')
    .post(function (req, res) {
        var book = new Book();
        book.title = req.body.title;
        book.author = req.body.author;
        book.isbn10 = req.body.isbn10;
        book.publicationyear = req.body.publicationyear;
        console.log(req.body.title);
        book.save(function (err) {
            if (err)
                res.send(err);
            res.json({message: 'Book created!'});
        });
    })
    .get(function (req, res) {
        Book.find(function (err, books) {
            if (err)
                res.send(err);
            res.json(books);
        });
    });

router.route('/books/:books_id')
    .get(function(req, res) {
        Book.findById(req.params.book_id, function(err, book) {
            if (err)
                res.send(err);
            res.json(book);
        });
    })
    .put(function(req, res) {
        Book.findById(req.params.book_id, function(err, book) {
            if (err)
                res.send(err);
            book.name = req.body.name;
            book.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Bear updated!' });
            });
        });
    })
    .delete(function(req, res) {
        Book.remove({
            _id: req.params.book_id
        }, function(err, book) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

app.use('/api', router);
app.listen(port);
console.log("App listening on port " + port);
