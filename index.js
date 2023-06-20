const express = require('express')
const app = express()
const port = 3001
const user = require('./user');
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello World from API from GET")
})

// METHOD GET
app.get('/api/v1/users', (req, res) => {
    console.log(req.query, 'THIS IS FROM REQUEST QUERY???')
    const result = user.getAllUser(req.query)
    res.send({
        data: result.data
    });
})

// METHOD GET untuk certain id
app.get('/api/v1/users/:id', (req, res) => {
    const result = user.getUserById(req.params.id)
    res.send({
        data: result
    })
})


// METHOD untuk insert data
app.post('/api/v1/users', (req, res) => {
    const result = user.insertNewData(req.body)
    res.send({
        data: result
    });
})

app.put('/api/v1/users/:id', (req, res) => {
    const result = user.updateData(req.params.id, req.body)
    res.send({
        data: result
    });
})

app.delete('/api/v1/users/:id', (req, res) => {
    const result = user.deleteData(req.params.id)
    res.send({
        data: result
    });
})

// app.put('/', (req, res) => {
//     res.send("Hello World from API from PUT")
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})