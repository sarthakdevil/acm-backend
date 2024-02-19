import app from './app.js';

const Port = process.env.PORT

app.listen(Port,async ()=>{
    console.log(`Server is running on port http://localhost:${Port}`)
})