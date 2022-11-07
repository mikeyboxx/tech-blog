const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userSeedData = require('./userSeedData.json');
const postSeedData = require('./postSeedData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeedData);
    const posts = await Post.bulkCreate(postSeedData);


    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

};

seedDatabase();
