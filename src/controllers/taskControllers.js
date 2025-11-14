import { Task } from "../models/tasks.js";

export const getAllTasks = async(req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        req.log.error("Error al cargar las tareas:", error);
        res.status(500).json({ message: "Error al cargar las tareas" });
    }
}

export const createTask = async(req, res) => {
    const { name, unit, price } = req.body;
    try {
        const task = await Task.findOne({ where: { name } });

        if (task) {
            return res.status(400).json({ message: "La tarea ya existe" });
        }

        const newTask = await Task.create({ name, unit, price });
        res.status(201).json(newTask);
    } catch (error) {
        req.log.error("Error al crear tarea:", error);
        res.status(500).json({ message: "Error al crear tarea" });
    }
}

export const deleteTask = async(req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        await task.destroy();
        res.status(200).json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
        req.log.error("Error al eliminar tarea:", error);
        res.status(500).json({ message: "Error al eliminar tarea" });
    }
}

export const editTask = async(req, res) => {
    const { id } = req.params;
    const { name, unit, price } = req.body;
    try {
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        task.name = name;
        task.unit = unit;
        task.price = price;
        await task.save();
        res.status(200).json({ message: "Tarea editada correctamente"});
    } catch (error) {
        req.log.error("Error al editar tarea:", error);
        res.status(500).json({ message: "Error al editar tarea" });
    }
}

