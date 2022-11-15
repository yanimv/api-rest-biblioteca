const { Router } = require('express');
const router = Router();
const LIBROS = require('../lista-libros');
const tablaLibro = require('../basedatos/libro-bd');

//GET (CONSULTAR)
router.get('/', async (peti, resp)=>{
    try{
        const listaLibros = await tablaLibro.consultar();
        /*setTimeout(() => {
            resp.json(listaLibros);
        }, 2000);*/
        resp.json(listaLibros);
    }catch(e){
        console.log('Error en el GET de la ruta libro');
        console.log(e);
        resp.status(500).send(e.message);
    }
});

//POST (REGISTRAR)
router.post('/', async (peti, resp)=>{
    try{
        let libro = peti.body;
        console.log("Se va a guardar el libro.");
        console.log(libro);
        await tablaLibro.insertar(libro);
        resp.sendStatus(200);
    }catch(e) {
        console.log('Error en el POST de la ruta libro.');
        console.log(e);
        resp.status(500).send(e.message)    
    }
});

//PUT (EDITAR)
router.put('/', async (peti, resp)=>{
    try{
        const libroRecibido = peti.body;
        console.log(libroRecibido);
        await tablaLibro.actualizar(libroRecibido);
        resp.sendStatus(200);
    }catch (e){
        console.log('Error en el PUT de la ruta libro');
        console.log(e);
        resp.status(500).send(e.message);
    }
});

//Para poder editar el id
/*router.put('/:id', async (peti, resp)=>{
    try{
        const idactual = peti.params.id;
        const libroRecibido = peti.body;
        console.log(libroRecibido);
        await tablaLibro.actualizar(libroRecibido, idactual);
        resp.sendStatus(200);
    }catch (e){
        console.log('Error en el PUT de la ruta libro');
        console.log(e);
        resp.status(500).send(e.message);
    }
});*/

//DELETE (ELIMINAR)
router.delete('/:id', async (peti, resp)=>{
    try {
        let idlibro = peti.params.id;
        console.log('Se va a eliminar el libro con código '+idlibro);
        await tablaLibro.eliminar(idlibro);
        resp.sendStatus(200);
    } catch(e){
        console.log('Error en el DELETE de la ruta heroe');
        console.log(e);
        resp.status(500).send(e.message);
        
    }
});

module.exports = router;