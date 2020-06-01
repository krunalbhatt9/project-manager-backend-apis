module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('task', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: DataTypes.STRING,
        description: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        score: DataTypes.INTEGER,
        status: DataTypes.ENUM(
          'active','inactive', 'declined', 'completed'
          ),
      },
      { 
        freezeTableName: true,
      }
    );
  
 
      return Task;
  }