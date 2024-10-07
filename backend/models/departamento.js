module.exports = (sequelize, DataTypes) => {

    const Departamento = sequelize.define("Departamento", {

        departamento_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    });


    Departamento.associate = (models) => {
        Departamento.hasMany(models.Ciudade, {
            foreignKey: 'departamento_id',
            as: 'ciudades'
        });
    }

    return Departamento;
}