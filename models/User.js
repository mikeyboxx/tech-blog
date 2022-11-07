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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
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
      beforeCreate: async (newUserData) => {
        const {username, email, password} = newUserData;
        
        // make username and email lower case to ensure consistant data
        newUserData.username = username.toLowerCase();
        newUserData.email = email.toLowerCase();
        
        // encrypt password
        newUserData.password = await bcrypt.hash(password, 10);
        
        return newUserData;
      },
      
      beforeBulkCreate: async (newUserDataArr) => {
        for (user of newUserDataArr ){
          try {
            const {username, email, password} = user;
            user.username =  username.toLowerCase();
            user.email =  email.toLowerCase();
            user.password = await bcrypt.hash(password, 10);
          }
          catch (err){  
            console.log(err);
          }
        }

        return newUserDataArr;
      },

      beforeUpdate: async (updatedUserData) => {
        // make username and email lower case to ensure consistant data
        const {username, email, password} = updatedUserData;
        updatedUserData.username = username.toLowerCase();
        updatedUserData.email = email.toLowerCase();
        
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