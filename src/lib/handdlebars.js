const {format} = require('timeago.js');

let timeago = {};

timeago.time = (CREATED_AT)=>{
    return format(CREATED_AT);
}



module.exports = timeago;