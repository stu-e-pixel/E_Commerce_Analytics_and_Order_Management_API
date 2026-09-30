const {sequelize} = require('../config/dbcon');
const User = require('../models/auth.model')

sequelize.sync({alter:true})
    .then(()=>console.log("Database synced"))
    .catch((err)=>console.log("Error syncing DB:",err))

module.exports={User}