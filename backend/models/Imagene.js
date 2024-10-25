module.exports = (sequelize, DataTypes) => {

    const Imagene = sequelize.define("Imagene", {
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    Imagene.associate = (models) => {
        
        Imagene.belongsToMany(models.Examene, {
            through: 'ExameneImagene',
            foreignKey: 'imagene_id',
            otherKey: 'examene_id',
            as: 'examenes'
        });
    };


    return Imagene;

}