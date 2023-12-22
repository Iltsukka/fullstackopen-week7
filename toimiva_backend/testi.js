express = require('express')
const App = express()

App.get('/', (request,response) => {
    response.json({message: 'this is your father luke'})
})

const PORT = 3001
App.listen(PORT, () => {
    console.log(`I am listening to PORT ${PORT}`)
})