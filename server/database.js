const mysql=require("mysql");

const Connection=mysql.createConnection({
    host:'localhost',
    database:'content_management_system',
    user:'root',
    password:'dharun@sql'
});




module.exports=Connection;