module.exports = (sequelize, DataTypes) => {
    const ExameneImagene = sequelize.define("ExameneImagene", {
        examene_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Examene', 
                key: 'id'
            }
        },
        imagene_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Imagene',  
                key: 'id'
            }
        }
    });

    return ExameneImagene;
};
