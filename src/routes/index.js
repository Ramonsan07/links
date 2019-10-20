const express = require('express');
const router = express.Router();
const sqlPool = require('../database');

router.get('/', (req, res)=>{
    const query = 'select *  from user';
    sqlPool.query(query, (error, rows, fields)=>{
        res.json(rows);
    });
    
});


module.exports = router;