module.exports = (sequelize, DataTypes) => {

    const Examene = sequelize.define("Examene", {

        fecha_examene: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        resultado: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }

    });

    Examene.associate = (models) => {
        Examene.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });

        Examene.belongsToMany(models.Imagene, {
            through: 'ExameneImagene',  
            foreignKey: 'examene_id',
            otherKey: 'imagene_id',
            as: 'imagenes'
        });
    }


    return Examene;
}