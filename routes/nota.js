import express from 'express';
const router = express.Router();

// importar el modelo nota
import pokedex from '../models/pokedex';

//POST agregar un pokemon
router.post('/pokemon', async(req, res) => {
  const body = req.body;  
  try {
    const pokedexDB = await pokedex.create(body);
    res.status(200).json(pokedexDB); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

//GET para recuperar pokemon por ID
router.get('/pokemon/:id', async(req, res) => {
  const _id = req.params.id;

  try {
    const pokemonDB = await pokedex.findOne({_id});
    res.json(pokemonDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

//GET para recuperar todos los pokemon registrados
router.get('/pokemon', async(req, res) => {
  try {
    const pokemonDb = await pokedex.find();
    res.json(pokemonDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

//DELETE un pokemon
router.delete('/pokemon/:id', async(req, res) => {
  const _id = req.params.id;
  try {
    const pokemonDb = await pokedex.findByIdAndDelete({_id});
    if(!pokemonDb){
      return res.status(400).json({
        mensaje: 'No se encontró el id especificado',
        error
      })
    }
    res.json(pokemonDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

//PUT actualizar un pokemon
router.put('/pokemon/:id', async(req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const pokemonDb = await pokedex.findByIdAndUpdate(
      _id,
      body,
      {new: true});
    res.json(pokemonDb);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});


// Exportamos la configuración de express app
module.exports = router;