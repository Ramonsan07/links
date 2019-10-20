const mysql = require('mysql'); 
const {database} = require('./keys');//modulo para configurar la coneccion a la base de datos.
const {promisify} = require('util'); 

const pool = mysql.createPool(database);

pool.getConnection((error, conection)=>{
   // error.code = 'PROTOCOL_CONECTION_LOST';//quitale esta linea es solo para ver si el switch sirve. el switch sirve bien.
    if(error){
        switch(error.code){
            case 'PROTOCOL_CONECTION_LOST':
                console.error('DATABASE CONECTION LOST');
                break;
            case 'ER_CON_COUNT_ERROR':
                Console.error('DATABASE HAS TOO MANY CONECTIONS');
                break;
            case 'ECONNREFUSED':
                Console.error('DATABSE WAS REFUSED');
                break;
                default: console.error(error.code, 'ERROR NO PREVISTO');


        }
    }else{
        conection.release();
        console.log('DATABASE CONNECTED');
    }


}); 

pool.query = promisify(pool.query);

module.exports = pool;