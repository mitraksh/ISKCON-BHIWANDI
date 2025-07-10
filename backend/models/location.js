module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('Location', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      state: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      country: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'locations',
      timestamps: false
    });
  
    Location.associate = models => {
      Location.hasMany(models.Event, { foreignKey: 'location_id' });
      Location.hasMany(models.Event, {
        foreignKey: "location_id",
        as: "events",
      });
    };
  
    return Location;
  };
  