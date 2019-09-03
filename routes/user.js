// will contain all of user related routes

const express = require('express')
// const mysql = require('mysql')
const {Pool, Client} = require('pg')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.urlencoded({extended : false}))
router.use(bodyParser.json())

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'demo',
//   password: 'Thunder@123',
//   port: 5432,
// })
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'demo',
  password: 'Thunder@123',
  port: 5432,
})
client.connect()

  router.get("/users",(req,res)=>{
    const queryString = "SELECT * FROM users"
    client.query(queryString,(err,result,fields)=>{
      if(err){
        res.sendStatus(500)
        res.end()
      }
      res.json(result.rows)
      res.end()
    })
  })
  router.get("/user/:id",(req,res)=>{
    const userId = req.params.id
    console.log(userId)
    const queryString = "SELECT * FROM users WHERE id = $1"
    client.query(queryString,[userId],(err,result,fields)=>{
      if(err){
        console.log(err)
        res.sendStatus(500)
        res.end()
        return
      }
      res.json(result.rows)
    })
  })
  router.post("/user",(req,res)=>{
    const user = {
      id : req.body.id,
      name: req.body.name,
      age : req.body.age,
      gender: req.body.gender    
    }
    const queryString = "INSERT INTO users(id,name,age,gender) VALUES($1,$2,$3,$4)"
    client.query(queryString,[user.id,user.name,user.age,user.gender],(err,results,fields)=>{
      if(err){
        console.log(err)
        res.sendStatus(500)
        res.end()
        return
      }
      res.sendStatus(200)
      res.end()
    }) 
  })
  router.get("/",(req,res)=>{
   res.send("HEllo")
  })

module.exports = router 