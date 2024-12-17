const { User, Rol, Persona, Examen, Imagen, ExameneImagene } = require('../models');

const ExamenController = {
    getExamenes: async (req, res) => {

        try {

            const examenes = await Examen.findAll({
                include: [
                    {
                        model: Imagen,
                        as: 'imagenes'
                    },
                    {
                        model: User,
                        as: 'user',
                        include: [
                            {
                                model: Persona,
                                as: 'persona'
                            }
                        ]
                    }
                ]
            });

            if (!examenes) {
                return res.status(400).json({ msg: "Todavía no has Realizado Exámenes" });
            }

            return res.status(200).json(examenes);

        } catch (error) {
            return res.status(500).json({ msg: "Error en el servidor" });
        }

    },
    createExamen: async (req, res) => {
        try {

            /* encontrar los usuarios "pacientes" mediante el rol */
            const rolPaciente = await Rol.findOne({ where: { nombre_rol: "paciente" } });

            const rolId = rolPaciente.id;

            /* encontrar pacientes */

            const pacientes = await User.findAll({
                where: { rol_id: rolId },
                include: [
                    {
                        model: Persona,
                        as: 'persona',
                    },
                ]
            });

            if (!pacientes) {
                return res.status(404).json({ msg: "Datos no encontrados" });
            }

            return res.status(200).json(pacientes);

        } catch (error) {
            console.error("Error al buscar pacientes:", error);
            return res.status(500).json({ msg: "Error en el servidor" });
        }
    },

    storeExamene: async (req, res) => {
        /*  try {
 
             const { fecha_examene, resultado, user_id } = req.body;
 
             const nuevoExamene = await Examene.create({
                 fecha_examene,
                 resultado,
                 user_id
             });
 
             if (req.files && req.files.length > 0) {
                 const imageIds = [];
 
                 for (const file of req.files) {
                     const newImage = await Imagene.create({
                         url: `/storage/analisis/${file.filename}`
                     });
                     imageIds.push(newImage.id);
                 }
 
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
         } */
    },

    showExamene: async (req, res) => {

        /*    try {
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
    */
    },

    deleteExamene: async (req, res) => {
        /* try {
            const { id } = req.params;

            const examene = await Examene.findOne({ where: { id: id } });

            await examene.destroy();

            return res.status(200).json({ msg: "Examen Eliminado" });

        } catch (error) {
            return res.status(500).json({ msg: "Error en el servidor" });
        } */
    }
}

module.exports = ExamenController;