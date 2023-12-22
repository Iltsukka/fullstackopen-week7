const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

url = "mongodb+srv://iltsukka:jKb6PJxGbEf8IOpA@fullstackopen-db.ct3urp9.mongodb.net/Testi?retryWrites=true&w=majority"
url2 = process.env.MONGODB_URI
console.log('trying to connect to database')

mongoose.connect(url2)
  .then(() => console.log('connected to ', url2))
  .catch((error) => console.log("Error: ", error.message))

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: "Blondie",
    author: "Jefferson",
    url: "www.amazon.com",
    likes: 22
})

blog.save().then(result => {
    console.log('blog saved')
    mongoose.connection.close()
})
  .catch((error) => {
    console.log('Error: ', error.message)
  })
kettu
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IktldHR1IiwiaWQiOiI2NGU0NWYyOTgzNTU3NGU0M2I5MzRkNTAiLCJpYXQiOjE2OTI2OTA0Mjl9.P3D97onDu9FI1itK8IpY751qLn0FkeFEA79W7VTuPj4