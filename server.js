const express = require ('express')
const app = express()

//routes
//'/' - root directory
app.get('/', (req, res) => {
    res.send('Hello NODE API')
})
app.listen(3000, function(){
    console.log('Node API app is running on port 3000')
})