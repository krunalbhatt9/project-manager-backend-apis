module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('project', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: DataTypes.STRING,
        content: {
          type: DataTypes.TEXT,
          allowNull: false
        },
      },
      {
        freezeTableName: true,
      }
    );
  
    // Project.associate = (models) => {
    //     Project.belongsTo(models.user);
    // };
  
    return Project;
  }