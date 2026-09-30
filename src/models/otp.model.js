const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/dbcon');

const Otp = sequelize.define('Otp',{
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"users",
            key:"id"
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE"
    },
    otp:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    }
},{
    tableName:"otps",
    timestamps:false
})

module.exports=Otp