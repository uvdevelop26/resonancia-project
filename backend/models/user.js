module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    profile_photo_path: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }

    }
  });


  User.associate = (models) => {

    User.belongsTo(models.Role, {
      foreignKey: 'role_id',
      as: 'role'
    });

    User.hasMany(models.Persona, {
      foreignKey: 'user_id',
      as: 'personas'
    });

  }

  return User;
}