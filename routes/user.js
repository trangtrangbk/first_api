// will contain all of user related routes

const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.urlencoded({extended : false}))
router.use(bodyParser.json())

const pool = mysql.createPool({
    connectionLimit:10,
    host : "us-cdbr-iron-east-05.cleardb.net",
    user : "be2f3c03346203",
    password : 'c7ddee7e',
    database : "heroku_fbde893619fc9a4"
})
getConnection = ()=>{
   return pool
  }
  router.get("/users",(req,res)=>{
    const queryString = "SELECT * FROM users"
    getConnection().query(queryString,(err,rows,fields)=>{
      if(err){
        res.sendStatus(500)
        res.end()
      }
      res.json(rows)
      res.end()
    })
  })
  router.get("/user/:id",(req,res)=>{
    const userId = req.params.id
    const queryString = "SELECT * FROM friends WHERE fid = ?"
    getConnection().query(queryString,[userId],(err,rows,fields)=>{
      if(err){
        res.sendStatus(500)
        res.end()
        return
      }
      // const users = rows.map((rows)=>{
      //   return res.json({fid : rows.fid})
      // })
      res.json(rows)
    })
  })
  router.post("/user",(req,res)=>{
    const user = {
      fname: req.body.fname,
      preview : req.body.preview,
      detail: req.body.detail,
      fl_id: req.body.fl_id,
      date_create : req.body.date_create,
      count_number : req.body.count_number,
      picture: req.body.picture
    }
    const queryString = "INSERT INTO friends(fname,preview,detail,fl_id,date_create,count_number,picture) VALUES(?,?,?,?,?,?,?)"
    getConnection().query(queryString,[user.fname,user.preview,user.detail,user.fl_id,user.date_create,user.count_number,user.picture],(err,results,fields)=>{
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

module.exports = router 