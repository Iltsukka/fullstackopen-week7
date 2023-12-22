const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body
    if (password === undefined || password.length < 3) {
        return response.status(400).json({error: 'Password cannot be empty, minimum 3 characters required.'})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const allUsers = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    response.json(allUsers)
})

module.exports = usersRouter