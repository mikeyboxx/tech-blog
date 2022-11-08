const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      // pre-process data before comitting to database
      beforeCreate: async (newUserData) => {
        const {username, password} = newUserData;
        
        // make username lower case to ensure consistant data
        newUserData.username = username.toLowerCase();
        
        // encrypt password
        newUserData.password = await bcrypt.hash(password, 10);
        
        return newUserData;
      },
      
      // this is executed only when running the seeds process
      beforeBulkCreate: async (newUserDataArr) => {
        for (user of newUserDataArr ){
          try {
            const {username,  password} = user;
            user.username =  username.toLowerCase();
            user.password = await bcrypt.hash(password, 10);
          }
          catch (err){  
            console.log(err);
          }
        }

        return newUserDataArr;
      },

      // pre-process data before comitting to database
      beforeUpdate: async (updatedUserData) => {
        // make username  lower case to ensure consistant data
        const {username, password} = updatedUserData;
        updatedUserData.username = username.toLowerCase();
        
        // encrypt password
        updatedUserData.password = await bcrypt.hash(password, 10);

        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;