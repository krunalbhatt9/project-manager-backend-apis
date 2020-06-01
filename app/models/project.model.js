module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('project', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: DataTypes.STRING,
        body: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        status: DataTypes.ENUM(
          'active','inactive', 'declined', 'completed'
          ),
      },
      { 
        freezeTableName: true,
      }
    );
  
        
      return Project;
  }