import express from "express"
import cors from "cors"


const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    next();
  });


app.get("/", (req,res) => {
    
    res.json({ message: 'Hello from server!' });
})



const port = process.env.PORT || 3000 

app.listen(port , () => {
    console.log("Server is running at port 3000");
    
})