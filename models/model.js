// table schema 정의

const User = (sequelize, Sequelize) => {
  return sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    age: {
      type: Sequelize.INTEGER
    },
    phone: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    provide_image: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    token: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  })
}

module.exports = { User }
