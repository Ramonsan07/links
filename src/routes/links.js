const express = require('express');
const router = express.Router();
const pool = require('../database'); 


//todas estas rutas van a tener como "pre-ruta" a /links
router.get('/add', (req,res)=>{ //1
    res.render('links/add');
})

router.post('/add', async(req,res)=>{//2
    const {title, url, description} = req.body;
    const newObject = {title, url, description};
    await pool.query('INSERT INTO LINKS set ?', newObject);
    req.flash('successCrud','LINK ADDED SUCCESSFULY');
    res.redirect('/links');//los rederict comienzan desde la ruta inicial en adelante.
});

router.get('/', async (req, res)=>{//3
    const links = await pool.query('SELECT * FROM LINKS');
    console.log(links);
    res.render('links/list', {links: links});
});

router.get('/delete/:ID', async (req, res)=>{//los ':' solo marcan donde comienza una variable el '/' obviamente donde termina
    const {ID} = req.params;
    await pool.query('DELETE FROM LINKS WHERE ID = ?', [ID]);
    req.flash('successCrud','DELETED SUCCESSFULY');
    res.redirect('/links');
} );

router.get('/edit/:ID', async (req, res)=>{
    const {ID} = req.params;
    const links = await pool.query('SELECT * FROM LINKS WHERE ID = ?', [ID]);
    res.render('links/edit',{links: links[0]}); //puedo no iniciar con '/' porque las views de hbs ya estan en el dir de la carpeta views
});

router.post('/edit/:ID', async (req, res)=>{
    const {ID} = req.params;
    const {title,url, description} = req.body;
    const newObject = {title, url, description};
    await pool.query('UPDATE LINKS SET ? WHERE ID = ?', [newObject,ID]);
    req.flash('successCrud','UPDATED SUCCESSFULY');
    res.redirect('/links');
})

module.exports = router;
