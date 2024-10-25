const { User, Role, Persona, Examene, Imagene, ExameneImagene } = require('../models');

const ExameneController = {
    getExamenes: async (req, res) => {

        try {

            const examenes = await Examene.findAll({
                include: [
                    {
                        model: Imagene,
                        as: 'imagenes'
                    },
                    {
                        model: User,
                        as: 'user',
                        include: [
                            {
                                model: Persona,
                                as: 'personas'
                            }
                        ]
                    }
                ]
            });

            if (!examenes) {
                return res.status(400).json({ msg: "Todavía no existen exámenes" });
            }

            return res.status(200).json(examenes);

        } catch (error) {
            return res.status(500).json({ msg: "Error en el servidor" });
        }

    },
    createExamene: async (req, res) => {
        try {

            /* find paciente rol and users */
            const rolePaciente = await Role.findOne({ where: { role_nombre: "paciente" } });

            if (!rolePaciente) {
                return res.status(404).json({ msg: "Rol de paciente no encontrado" });
            }

            const RoleId = rolePaciente.dataValues.id;

            const pacientes = await User.findAll({
                where: { role_id: RoleId },
                include: [
                    {
                        model: Persona,
                        as: 'personas',
                    },
                ]
            });


            if (!pacientes || pacientes.length === 0) {
                return res.status(404).json({ msg: "Pacientes no encontrados" });
            }

            return res.status(200).json(pacientes);

        } catch (error) {
            console.error("Error al buscar pacientes:", error);
            return res.status(500).json({ msg: "Error en el servidor" });
        }
    },

    storeExamene: async (req, res) => {
        try {

            const { fecha_examene, resultado, user_id } = req.body;

            const nuevoExamene = await Examene.create({
                fecha_examene,
                resultado,
                user_id
            });

            /*  Verificar si hay archivos de imagen */
            if (req.files && req.files.length > 0) {
                const imageIds = [];

                for (const file of req.files) {
                    const newImage = await Imagene.create({
                        url: `/storage/analisis/${file.filename}`
                    });
                    imageIds.push(newImage.id);
                }

                /* Crear las relaciones en la tabla intermedia */
                for (const imageId of imageIds) {
                    await ExameneImagene.create({
                        examene_id: nuevoExamene.id,
                        imagene_id: imageId
                    });
                }
            }

            return res.status(201).json({
                msg: 'Examen creado con éxito',
                examen: nuevoExamene
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al crear el examen' });
        }
    },

    showExamene: async (req, res) => {

        try {
            const { id } = req.params;
            const examene = await Examene.findOne({
                where: { id: id },
                include: [
                    {
                        model: Imagene,
                        as: 'imagenes'
                    },
                    {
                        model: User,
                        as: 'user',
                        include: [
                            {
                                model: Persona,
                                as: 'personas'
                            }
                        ]
                    }
                ]
            });

            if (!examene) {
                return res.status(404).json({ msg: "Examen no Encontrado" });
            }

            return res.status(200).json(examene);


        } catch (error) {
            return res.status(500).json({ msg: "Error en el servidor" });
        }

    },

    deleteExamene: async (req, res) => {
        try {
            const { id } = req.params;

            /* find exam */
            const examene = await Examene.findOne({ where: { id: id } });

            /* delete the examen */
            await examene.destroy();

            return res.status(200).json({ msg: "Examen Eliminado" });

        } catch (error) {
            return res.status(500).json({ msg: "Error en el servidor" });
        }
    }
}

module.exports = ExameneController;