module.exports = (sequelize, DataTypes) => {

    const Ciudade = sequelize.define("Ciudade", {

        ciudade_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        departamento_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });


    Ciudade.associate = (models) => {
        Ciudade.belongsTo(models.Departamento, {
            foreignKey: 'departamento_id',
            as: 'departamento'
        });

        Ciudade.hasMany(models.Persona, {
            foreignKey: 'ciudade_id',
            as: 'personas'
        });
    }

    return Ciudade;
}