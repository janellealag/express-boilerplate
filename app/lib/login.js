var express = require('express');
var email="";
var password;


module.exports = (req,res,next) => {
   
   
    var db = require('./database.js')();
    
    db.query('SELECT * FROM usertbl where \`userid\` = 1', function (err, results, fields){
        if (err) return res.send(err);
        
        email = JSON.stringify(results[0].email);
        password = JSON.stringify(results[0].password);
        
        
        var access = JSON.stringify(req.body.email);
        var access2 = JSON.stringify(req.body.password);

        if (!(access == email && access2 == password) ){
            
            //res.redirect('/login');
           res.render('../modules/login/views/formError');
        }
        
        
        else next();
        
    }); 
     
}