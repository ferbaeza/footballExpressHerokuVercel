const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
//const path = require('path');
const mongoose = require('mongoose'); //Mongodb connector
const methodOverride = require('method-override')
const port= process.env.PORT || 3000; // heroku
const Player = require('./models/player');
const URL = require('./config/db');
const routesPlayers = require('./routes/players');
app.use(cors());

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(URL,connectionParams)
    .then( () => {
        console.log('Connected to database ', port)
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/players", routesPlayers);
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cors());


//----------------------------------------------------//

app.listen(port, () => {
    console.log("APP IS LISTENING ON PORT " + port)
})

































//-----------------------------------------//
/*
//--------Code to run in local--------//

const positions = ['GK','DF','MF','FW'];
const teams = ['REAL MADRID' , 'FC BARCELONA', 'PSG', 'BAYER MUNINCH', 'BORUSSIA DORTMUND'];
//----------------------------------------------------
app.get('/', async (req,res)=>{
    const { pos } = req.query;
    const { team } = req.query;
    //Filtrar jugadores por posicion
    if (pos) {
        const players = await Player.find({ position:pos });
        res.render('index', { players })
    //Por equipo 
    }else if (team) { 
        const players = await Player.find({ team: team }); 
        res.render("index", { players }); 
    }else {
        const players = await Player.find();
        res.render('index', { players })
    }
    
})

app.get('/players/new', (req,res)=>{
    res.render('new', { positions, teams });
})

app.post('/players', async (req,res)=>{
    const newPlayer = new Player(req.body);
    await newPlayer.save();
    res.redirect("/")
})

app.get('/players/:id', async(req,res) =>{
    const { id } = req.params;
    const player = await Player.findById(id);
    res.render('show', { player });
})

app.get('/players/:id/edit', async(req,res) =>{
    const { id } = req.params;
    const player = await Player.findById(id);
    res.render('edit', { player, positions, teams });
})

app.put('/players/:id', async(req,res) => {
    const { id } = req.params;
    const player = await Player.findByIdAndUpdate(id, req.body);
    res.redirect('/');
})

app.delete('/players/:id', async(req,res)=>{
    const { id } = req.params;
    const player = await Player.findByIdAndDelete(id);
    res.redirect('/');
})



*/