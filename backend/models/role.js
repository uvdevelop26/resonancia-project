module.exports = (sequelize, DataTypes) => {

    const Role = sequelize.define("Role", {

        role_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    Role.associate = (models) => {
        Role.hasMany(models.User, {
            foreignKey: 'role_id',
            as: 'users'
        });
    }


    return Role;
}
