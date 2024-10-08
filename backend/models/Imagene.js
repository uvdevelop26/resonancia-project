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


    return Imagene;

}