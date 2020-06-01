module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: {
              msg: "Must be a valid email address",
            }
          }
        },
      },
      {
        freezeTableName: true,
      }
    );
  
    
  
    return User;
  }