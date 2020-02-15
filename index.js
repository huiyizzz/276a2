const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser');
const app = express();

const { Pool } = require('pg');

var pool = new Pool({
  connectionString : process.env.DATABASE_URL
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/db'))
app.get('/index', (req, res) => res.render('pages/index'))
app.get('/db', function(req, res){	
  pool.query("select * from student", function(error, result){
    var results = { 'results': (result.rows[0]) ? result.rows : [] };
    res.render('pages/db', results);
  });
});

app.post('/dele', function(req, res, fields){
  var id = req.body.id;
  console.log(id);
  pool.query("delete from student where id = "+id+"",function(error,results,fields){
    if(!error){
    	res.redirect('/index');
    }else{
    	res.send(error);
    }
  });
});

app.post('/add', function(req,res,fields){
    var name=req.body.name;
    var weight=req.body.weight;
    var height=req.body.height;
    var haircolor=req.body.haircolor;
    var gpa=req.body.gpa;
    var gender=req.body.gender;
    var birthday=req.body.birthday;
    var eyecolor=req.body.eyecolor;
	var id=req.body.id;
    console.log(name,weight,height,haircolor,gpa,gender,birthday,eyecolor,id);
    pool.query("insert into student(name,weight,height,haircolor,gpa,gender,birthday,eyecolor,id) values ('"+ name +"',"+ weight +","+ height +",'"+ haircolor +"',"+ gpa +",'"+ gender +"','"+ birthday +"','"+ eyecolor +"',"+ id +")",function(error,results,fields){
        if(!error){
            res.redirect('/index');
        }else{
            res.send(error);
        }
    });
});

app.post('/update', function(req,res,fields){
    var name=req.body.name;
    var weight=req.body.weight;
    var height=req.body.height;
    var haircolor=req.body.haircolor;
    var gpa=req.body.gpa;
    var gender=req.body.gender;
    var birthday=req.body.birthday;
    var eyecolor=req.body.eyecolor;
    var id=req.body.id;
    console.log(name,weight,height,haircolor,gpa,gender,birthday,eyecolor,id);
    pool.query("update student set weight="+ weight +",height="+ height +",haircolor='"+ haircolor +"',gpa="+ gpa +",gender='"+ gender +"',birthday='"+ birthday +"',eyecolor='"+ eyecolor +"',id="+ id +" where name = '"+name+"'",function(error,results,fields){
        if(!error){
            res.redirect('/index');
        }else{
            res.send(error);
        }
    });
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))