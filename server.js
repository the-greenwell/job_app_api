const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
require('./config/mongoose.config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const routes = require('./routes/jobs.routes');
const userRoutes = require('./routes/users.routes');
routes(app);
userRoutes(app);
app.listen(process.env.PORT || 8000, () => console.log('Server is running'));