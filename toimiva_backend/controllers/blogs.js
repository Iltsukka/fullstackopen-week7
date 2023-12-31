const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor



blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
  })

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({error: 'invalid token'})
  // }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: request.user

  })

  let savedBlog = await blog.save()

  const person = await User.findById(request.user)
  person.blogs = person.blogs.concat(savedBlog._id)
  await person.save()
  savedBlog = await Blog.findById(savedBlog._id).populate('user')
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({error: 'invalid token'})
  // }
  const blog = await Blog.findById(request.params.id)
  
  if (blog.user.toString() === request.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()

  }

  return response.status(400).json({error: 'user id does not match with blog id'})


})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  console.log(request.body)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, runvValidators: true, context: 'query'}).populate('user')
  response.json(updatedBlog)
})

module.exports = blogsRouter