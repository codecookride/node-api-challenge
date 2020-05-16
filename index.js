
const app = require('./data/server')

const PORT = 4000;

app.listen(PORT, () =>{
    console.log (`listening on http://localhost:${PORT}`)
})
