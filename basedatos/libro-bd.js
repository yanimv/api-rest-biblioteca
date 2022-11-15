const conexion = require('./conexion');

async function insertar(libro){
    try{
        await conexion.execute('INSERT INTO libro(id, titulo, idautor, paginas) VALUES(?, ?, ?, ?)', [libro.id, libro.titulo, libro.idautor, libro.paginas]);
    }catch(error){
        console.log('Error al insertar libro en la base de datos');
        console.log(error);
        throw error;
    }
}

async function consultar(){
    try {
        const [rows, fields] = await conexion.execute('SELECT * FROM vista_libro ORDER BY id');
        return rows;
    } catch(error) {
        console.log('Error al consultar libro en la base de datos');
        console.log(error);
        throw error;
    }
}

async function actualizar(libro){
    try {
        const [res] = await conexion.execute(
            'UPDATE libro SET titulo = ?, idautor = ?, paginas = ? WHERE id = ?', 
            [libro.titulo, libro.idautor, libro.paginas, libro.id]
        );
        console.log(res);
    } catch(error){
        console.log('Error al actualizar libro',error);
        throw error;
    }
};

//PARA PODER EDITAR EL id
/*async function actualizar(libro, idactual){
    try {
        const [res] = await conexion.execute(
            'UPDATE libro SET id = ?, titulo = ?, idautor = ?, paginas = ? WHERE id = ?', 
            [libro.id, libro.titulo, libro.idautor, libro.paginas, idactual]
        );
        console.log(res);
    } catch(error){
        console.log('Error al actualizar libro',error);
        throw error;
    }
};*/

async function eliminar(id){
    try {
        await conexion.execute('DELETE FROM libro WHERE id = ?', [id]);
    } catch(error) {
        console.log('Error al eliminar libro',error);
        throw error;
    }
};

module.exports = { insertar, consultar, actualizar, eliminar };
