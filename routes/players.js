const express = require("express");
const app = express()
const Player = require('../models/player');
const router = express.Router();

const positions = ['GK','DF','MF','FW'];
const teams = ['REAL MADRID' , 'FC BARCELONA', 'PSG', 'BAYER MUNINCH', 'BORUSSIA DORTMUND'];


//Get all the players
router.get("/", async (req, res) => {
  try {
    const {pos} =req.query;  
    const {team} =req.query;
    if(pos){
        let players = await Player.find({ position : pos});
        res.status(200).json({
          status: 200,
          data: {players},
        });
    }else if(team){
        let players = await Player.find({ team: team });
        res.status(200).json({
          status: 200,
          data: {players},
        });
    
    }else{
        let players = await Player.find();
        res.status(200).json({
            status: 200,
            data: {players},
          });
  
    }  
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});


//GET Player byID
router.get("/:id", async (req, res) => {
  try {
    let player = await Player.findOne({
      _id: req.params.id,
    });
    if (player) {
      res.status(200).json({
        status: 200,
        data: player,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No post found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

//api to create a new player
router.post("/", async (req, res) => {
    try {
      let newPlayer = new Player(req.body);
      post = await newPlayer.save();
      res.status(200).json({
        status: 200,
        data: newPlayer,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  });
  



//Update Player by Id                                                                                                                                                                                                                                       
router.put("/:id", async (req, res) => {
  try {
    let player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (player) {
      res.status(200).json({
        status: 200,
        data: player,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No post found",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});


//Delete Player byID
router.delete("/:id", async (req, res) => {
  try {
    let player = await Player.findByIdAndRemove(req.params.id);
    if (player) {
      res.status(200).json({
        status: 200,
        message: "Player deleted successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No post found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;