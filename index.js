var mongoose = require('mongoose');
//create mongoose connection schema

//here we load mongoose configuration


const db_options = {
    useNewUrlParser:true,
    useUnifiedTopology:true

}

//connect to db now
mongoose.connect('mongodb://localhost:27017/mongoose_basics',options=db_options, function (err) {
    if (err) {
        console.error(err);
    }
    console.log('Connection success!');
   
    
})

//here we create a mongoose schema

var userSchema = mongoose.Schema({
   name:{
       firstName:{
           required: true,
           type: String
       },
       lastName: String
   },
       
   created: {
       type: String,
       default: Date.now
   }

});


//define another schema and show reverse relationship



var authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //indicates the primary key in authorSchema
    name:{
        firstName: String,
        lastName: String,
    },
    biography: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    twitter: {
        type: String,
        validate: {
            validator: (text)=> {
                return text.indexOf('https://www.twitter.com/') === 0;
               
            },
            message: 'Twitter handle must start with https://www.twitter.com/'
            
        }
    },
    created: {

        type:Date,
        default: Date.now
    }    

})



//lets define a book schema here


var bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    summary: String,
    isbn: String,
    thumbnail: Buffer,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    ratings: [
        {
            summary: String,
            detail: String,
            numberOfStars: Number,
            created: {
                type: Date,
                default: Date.now
            }
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }


})




//IMPLEMENTATION,
//WRITE TO MONGOOSE
var Author = mongoose.model('Author', authorSchema);
var Book = mongoose.model('Book', bookSchema);


//create instances

var danAuthor = new Author({
    _id: new mongoose.Types.ObjectId(),
    name: {
        firstName: 'Daniel',
        lastName: 'Maina'
    },
    biography: 'Wonders of wondering how it wonders',
    facebook: 'https://m.facebook.com/dmaina',
    twitter:'https://www.twitter.com/anon',
});


//saving instance now
danAuthor.save(function(err){
    if (err) {
        console.error(err)
    }
    else {
        console.log('Author instance created successfuly');

    }

     //linking with book item here
    var danBook = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: 'Meditations of Frank Alama',
        author: danAuthor._id,
        twitter: 'https://twitter.com',
        ratings: [
            {
                summary: 'Best record of the week dropped just now',
                numberOfStars: 4
            }
        ]
    }
);

danBook.save((err)=>{
    if (err) {
        console.error(err);
    }
    console.log('Book Instance saved')

})

});




//searching data

Book.find({
    title: /meditation/i
})
.exec((err,books)=>{
    if (err) throw err;
    // console.log(books.forEach((data,i)=>{
    //     console.log(data.ratings)
    // }));
});



//sort and limit to 5 results and sort
//created asc
Author.find({
    biography: /won/i,   
})
.sort('-created')
.limit(1)
.exec((err,data)=>{
    if (err) throw err;
    console.log(data);
});


//fetch by id

Book.findById('607b46ae0cee69be1163bdc8', (err,title)=>{
    if (err) throw err
    console.log(`found title ${title}`)
    //update item here
    title.ratings.numberOfStars = 10

    title.save(function(err,data){
        if (err) throw err
        console.log('Modifications done success')
        console.log(title)
    })
})