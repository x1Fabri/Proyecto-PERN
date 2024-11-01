import { pool } from "../db.js";

export const listarTareas = async(req, res) => {
    console.log(req.usuarioId);
    const resultado = await pool.query("SELECT * FROM tareas WHERE usuario_id = $1", [req.usuarioId]);
    return res.json(resultado.rows);

}
export const listarTarea = async(req, res) => {
    const resultado = await pool.query("SELECT * FROM tareas WHERE id = $1", [req.params.id]);
    if (resultado.rowCount === 0) {
        return res.status(404).json({
            message: "La tarea no existe"
        });
    }    
    return res.json(resultado.rows[0]);
}

export const crearTarea = async(req, res, next) => {
    const {titulo, description} = req.body;
    

    try{ 
        
        const result = await pool.query("INSERT INTO tareas (titulo, description, usuario_id) VALUES ($1, $2, $3) RETURNING *", [titulo,description, req.usuarioId]);
        res.json(result.rows[0]);
        console.log(result.rows[0]);
    } catch (error) {
        if (error.code === "23505"){
            return res.status(409).json({
                message: "Ya existe una tarea con ese título"
            })
        }
        console.log(error);
        next(error);
    }
}

export const actualizarTarea = async(req, res) => {
    const {titulo, description} = req.body;
    const id = req.params.id;
    const result = await pool.query("UPDATE tareas SET titulo = $1, description = $2 WHERE id = $3 RETURNING *", [titulo, description, id]);
    if (result.rowCount === 0) {
        return res.status(404).json({
            message: "No existe una tarea con ese id"
        });
    }    
    return res.json(result.rows[0]);
}

export const eliminarTarea = async(req, res) => {
    const resultado = await pool.query("DELETE FROM tareas WHERE id = $1", [req.params.id]);
    if (resultado.rowCount === 0) {
        return res.status(404).json({
            message: "No existe una tarea con ese id"
        });
    }    
    return res.sendStatus(204);
}