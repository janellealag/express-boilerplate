/**
 * We load the ExpressJS module.
 * More than just a mere framework, it is also a complementary library
 * to itself.
 */
var express = require('express');

/**
 * Having that in mind, this is one of its robust feature, the Router.
 * You'll appreciate this when we hit RESTful API programming.
 * 
 * For more info, read this: https://expressjs.com/en/4x/api.html#router
 */
var router = express.Router();

var id;
var tablename= "dogtbl";

/**
 * If you can notice, there's nothing new here except we're declaring the
 * route using the router, and not using app.use().
 */

router.get('/', (req, res) => {
    /**
     * This is a TEMPORARY checker if you want to enable the database part of
     * the app or not. In the .env file, there should be an ENABLE_DATABASE field
     * there that should either be 'true' or 'false'.
     */
    if (typeof process.env.ENABLE_DATABASE !== 'undefined' && process.env.ENABLE_DATABASE === 'false') {
        /**
         * If the database part is disabled, then pass a blank array to the
         * render function.
         */
        return render([]);
    }

    /**
     * Import the database module that is located in the lib directory, under app.
     */
    var db = require('../../lib/database')();

    /**
     * If the database part is enabled, then use the database module to query
     * from the database specified in your .env file.
     */
    db.query('SELECT * FROM dogtbl', function (err, results, fields) {
        /**
         * Temporarily, if there are errors, send the error as is.
         */
        if (err) return res.send(err);

        /**
         * If there are no errors, pass the results (which is an array) to the
         * render function.
         */
        render(results);
    });

    function render(users) {
        res.render('home/views/index', { users: users });
    }
}); 


router.get('/login', (req, res) => {
    res.render('user/views/index');
});

router.post('/login', (req, res) => {
    console.log('Here @ POST request');
    res.send(req.body);
});

router.get('/new', (req, res) => {
    res.render('user/views/index');
});


router.post('/new', (req, res) => {
    var db = require('../../lib/database')();
    db.query(`INSERT INTO \`dogtbl\` (\`name\`, \`age\`, \`breed\`)  VALUES ("${req.body.name}", ${req.body.age}, "${req.body.breed}")`, (err, results, fields) => {
        if (err) console.log(err);
        res.redirect('/index');
    });
});

router.get('/update', (req,res) =>{
    
    res.render('user/views/update');
});

router.post('/update', (req, res) =>{
   //console.log('succ');
    var db = require('../../lib/database')();
    db.query(`UPDATE \`dogtbl\` SET \`name\` = "${req.body.name}", \`age\` = ${req.body.age}, \`breed\` = "${req.body.breed}" WHERE \`dogId\` = ${id} `, (err, results, fields) => {
        if (err) console.log(err);
        res.redirect('/index');
    });
});

router.get('/search', (req,res) =>{
    
    var db = require('../../lib/database')();
    
    db.query('SELECT * FROM dogtbl', function (err, results, fields) {
       
        if (err) return res.send(err);

        rend(results);
    });

    function rend(users) {
        res.render('user/views/search', { users: users });
    }
    
    
});

router.post('/search', (req,res) =>{
    var db = require('../../lib/database')();
    
        db.query(`SELECT * from \`dogtbl\` where \`name\` = "${req.body.search}"`, (err, results, fields) =>{
           
            if (err) console.log(err);
         // res.redirect('/index');
            
            //console.log(results[0].name);
            id = results[0].dogId;
            render(results);
             
        });
    
    function render(users){
        res.render('user/views/update', {name: users[0].name, age: users[0].age, breed: users[0].breed});
    }
    
});

router.get('/delete', (req,res) =>{
    var db = require('../../lib/database')();
    
    db.query('SELECT * FROM dogtbl', function (err, results, fields) {
       
        if (err) return res.send(err);

        rend(results);
    });

    function rend(users) {
        res.render('user/views/delete', { users: users });
    }
    
});

router.post('/delete', (req, res) =>{
    var db = require('../../lib/database')();
    
    db.query(`SELECT * from \`dogtbl\` where \`name\` = "${req.body.name}"`, (err, results, fields) =>{
           
            if (err) console.log(err);
        console.log(results[0].name);
            id = results[0].dogId;
            
        deletes(id);
        
    });
    
   function deletes(id){
        db.query(`DELETE from \`dogtbl\` WHERE \`dogId\` = ${id} `, (err, results, fields) => {
        if (err) console.log(err);
        res.redirect('/index');
        });
   }
    
});





/**
 * Here we just export said router on the 'index' property of this module.
 */
exports.users = router;