module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'events',
      timestamps: false
    });
  
    Event.associate = models => {
      Event.belongsTo(models.User, { foreignKey: 'created_by' });
      Event.belongsTo(models.Location, {
        foreignKey: "location_id",
        as: "location",
      });
      Event.hasMany(models.EventRegistration, { foreignKey: 'event_id' });
    };
  
    return Event;
  };
  