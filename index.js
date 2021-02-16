const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const request = require("request")
const apiKey = "a7d7e738c84460b2a21d837ea7039b73"


app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))


app.get("/", function(req,res){
    res.render("index", {weather:null, error: null})
})

app.post("/", function(req,res){
    let city = req.body.city
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    
    console.log(url)
    
    request(url, function(err, response, body){
        if(err){
            res.render("index", {weather:null, error: "This is wrong, you need to fix this"})
        } else{
            
        
        let weather = JSON.parse(body)


        if(weather.main == undefined) {
            res.render("index", {weather:null, error: "This is wrong, you need to fix this"})
        } else{
            let message = `It is ${weather.main.temp} degrees outside in ${weather.name}`
            res.render("index", {weather: message, error:null})
        }

    }
        



    })
    
})


const port = 3005

app.listen(port, () =>{
    console.log(`I am using ${port}`)
})