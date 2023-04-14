"use strict"
require('dotenv').config();
const app=require('./app');

app.serverCreate(process.env.PORT||3600)


