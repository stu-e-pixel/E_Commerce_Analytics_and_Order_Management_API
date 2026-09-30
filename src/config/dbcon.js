const {Sequelize} = require('sequelize')

const sequelize = new Sequelize("ecommerce_assignment","root","",{
    host:"localhost",
    dialect:"mysql"
})

const dbcon = async()=>{
    try {
        await sequelize.authenticate();
        console.log("mysql connected succefully");
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports ={sequelize,dbcon}