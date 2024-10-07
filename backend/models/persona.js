module.exports = (sequelize, DataTypes) => {

    const Persona = sequelize.define("Persona", {

        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        dni: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },

        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        sexo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        direccion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        edad: {
            type: DataTypes.TINYINT,
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
        },

        ciudade_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }

    });


    Persona.associate = (models) => {
        Persona.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });

        Persona.belongsTo(models.Ciudade, {
            foreignKey: 'ciudade_id',
            as: 'ciudade'
        });
    }


    return Persona;

}
