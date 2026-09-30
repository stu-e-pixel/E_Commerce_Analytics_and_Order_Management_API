const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbcon");
const bcryptjs = require('bcryptjs');

const User = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false
  },
  
  password:{
    type:DataTypes.STRING(255),
    allowNull:false
  },
  isActive:{
    type:DataTypes.BOOLEAN,
    default:true
  },
  role:{
    type:DataTypes.ENUM('customer','admin'),
    defaultValue:'customer'
  },
  refreshToken:{
    type:DataTypes.TEXT,
    allowNull:true
  },
  isVerified:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  }

},{
  tableName:"users",
    timestamps:true,
    hooks:{
      beforeCreate:async(user)=>{
        if(user.password){
          user.password = await bcryptjs.hash(user.password,12)
        }
      },
      beforeUpdate:async(user)=>{
        if(user.changed("password")){
          user.password = await bcryptjs.hash(user.password,12)
        }
      }
    }
});

User.prototype.comparePassword = async function (password) {

    console.log("COMPARE REQUEST PASSWORD:", password);
    console.log("COMPARE DB PASSWORD:", this.password);

    return await bcryptjs.compare(
        password,
        this.password
    );
};

module.exports=User;
