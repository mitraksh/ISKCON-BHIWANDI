module.exports = (sequelize, DataTypes) => {
  const EventRegistration = sequelize.define('EventRegistration', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    registration_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM('registered', 'cancelled'),
      defaultValue: 'registered',
      allowNull: false
    }
  }, {
    tableName: 'event_registrations',
    timestamps: false
  });

    EventRegistration.associate = models => {
    EventRegistration.belongsTo(models.User, { foreignKey: 'user_id' });
    EventRegistration.belongsTo(models.Event, { foreignKey: 'event_id' });
  };

  return EventRegistration;
};
