const Doctor = require("../models/Doctor")

const createDoctor = async (req, res) => {
    const { name, crm, specialty, clinic, phone, favorite } = req.body
    try{
        const doctor = await Doctor.create({name, crm, specialty, clinic, phone, favorite})
        console.log("Medico ${doctor.name} criado")
        res.status(201).send(doctor)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const getAllDoctors = async (req, res) => {
    const favorite = req.query.favorite
    try{
        const where = favorite ? { where: { favorite} }: {}
        const doctors = await Doctor.findAll(where)
        if (doctors && doctors.length > 0){
            res.status(200).send(doctors)
        } else {
            res.status(204).send()
        }
    } catch (error) {
        res.status(500).send({ message: error.message})
    }
}

module.exports = {
    createDoctor,
    getAllDoctors
}