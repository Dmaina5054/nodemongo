//here we load mongoose configuration
var mongoose = require('mongoose');

const db_options = {
    useNewUrlParser:true,
    useUnifiedTopology:true

}

//connect to db now
var conn = mongoose.connect('mongodb://localhost:27017/mongoose_basics',options=db_options, function (data,err) {
    if (err) {
        console.error(err);
    }
    console.log('Connection success!');
    console.log(data)
    
})


module.exports = conn;

