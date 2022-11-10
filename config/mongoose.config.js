const mongoose = require('mongoose');

mongoose.connect(process.env.MDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB Connected :)'))
    .catch((err) => console.log('DB error: ', err))