import User from "../models/user.js";
import Task from "../models/task.js";
import { Status } from "../constants/index.js";
import { encriptar } from "../common/bcrypt.js";
import { Op } from "sequelize";

async function getUsers(req, res, next) {
    try {
        const users = await User.findAll({
            attributes: ["id", "username", "password", "status"],
            order: [["id", "DESC"]],
            where: {
                status: Status.ACTIVE,
            },
        });
        res.json(users);
    } catch (error) {
        next(error);
    }
}

async function getUserById(req, res, next) {
    const { id } = req.params;
    try {
        const user = await User.findOne({
            attributes: ["username", "status"],
            where: { id },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
}

/* async function createUser(req, res, next) {
    const { username, password } = req.body;
    try {
        const user = await User.create({ username, password: await encriptar(password) });
        res.json(user);
    } catch (error) {
            next(error);
    }
} */

async function createUser(req, res, next) {
    const { username, password } = req.body;
    try {
        const user = await User.create({ username, password }); // No encriptar aquí
        res.json(user);
    } catch (error) {
            next(error);
        }
    }

async function updateUser(req, res, next) {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        if(!username && !password){
            return res.status(400).json({ message: "Username or password is required" });
        }
        const passwordEncriptado = await encriptar(password); 
        const user = await User.update(
            { username, password: passwordEncriptado }, 
            { where: { id } });
        
        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function deleteUser(req, res, next) {
    const { id } = req.params;
    try {
        const user = await User.destroy({ where: { id } });        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
}

async function activateInactivate(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;
    try {
        if(status !== Status.ACTIVE && status !== Status.INACTIVE){
            res.status(400).json({ message: "Status is required" });
        }
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        if(user.status === status){
            res.status(400).json({ message: "User is already " + status });
        }
        user.status = status;
        await user.save();
        
        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function getUserTasks(req, res, next) {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            attributes: ["username"],
            include: [{ 
                model: Task,
                attributes: ["name", "done"],
                //where: { done: false },
            }],
            where: { id },
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function usersPagination(req, res, next) {
    try {
        const { page = 1, limit = 10, search, orderBy = 'id', orderDir = 'DESC' } = req.query;

        // Validar limit (solo 5, 10, 15, 20)
        const validLimits = [5, 10, 15, 20];
        const parsedLimit = parseInt(limit);
        if (!validLimits.includes(parsedLimit)) {
            return res.status(400).json({ message: "Limit must be 5, 10, 15, or 20" });
        }

        // Validar orderBy (id, username, status)
        const validOrderBy = ['id', 'username', 'status'];
        if (!validOrderBy.includes(orderBy)) {
            return res.status(400).json({ message: "orderBy must be id, username, or status" });
        }

        // Validar orderDir (ASC, DESC)
        const validOrderDir = ['ASC', 'DESC'];
        if (!validOrderDir.includes(orderDir.toUpperCase())) {
            return res.status(400).json({ message: "orderDir must be ASC or DESC" });
        }

        // Calcular offset para paginación
        const offset = (page - 1) * parsedLimit;

        // Construir la consulta
        const whereClause = {};
        if (search) {
            whereClause.username = { [Op.iLike]: `%${search}%` };
        }

        // Contar total de registros
        const total = await User.count({ where: whereClause });

        // Obtener usuarios paginados
        const users = await User.findAll({
            attributes: ['id', 'username', 'status'],
            where: whereClause,
            order: [[orderBy, orderDir.toUpperCase()]],
            limit: parsedLimit,
            offset: offset,
        });

        // Calcular el número total de páginas
        const pages = Math.ceil(total / parsedLimit);

        // Respuesta
        res.json({
            total,
            page: parseInt(page),
            pages,
            data: users,
        });
    } catch (error) {
        next(error);
    }
}

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    activateInactivate,
    getUserTasks,
    usersPagination,
    };


