const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')


describe('when there is one user in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)

        const user = new User({username: 'Georgie', name: 'Jonathan', passwordHash})

        await user.save()
    })

    test('no invalid username or password', async () => {
        const usersAtStart = await User.find({})
        const lengthAtStart = usersAtStart.map(users => users.toJSON())
        console.log(lengthAtStart)

        const badUserName = {
            username: 'iH',
            name: 'Ilari',
            password: 'salainen'
        }

        await api
          .post('/api/users')
          .send(badUserName)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        const badPassWord = {
            username: 'IltsuH',
            name: 'Tiikeri',
            password: '12'
        }

        await api
          .post('/api/users')
          .send(badPassWord)
          .expect(400)
          .expect('Content-Type', /application\/json/)


        usersAtEnd = await User.find({})
        lengthAtEnd = usersAtEnd.map(u => u.toJSON())

        expect(lengthAtEnd.length).toEqual(lengthAtStart.length)
    
    })

    test('no duplicate usernames', async () => {
        const usersAtStart = await User.find({})
        const lengthAtStart = usersAtStart.map(users => users.toJSON())
        
        newUser = {username: 'Georgie', name: 'Tikka', password: 'matojuna'}
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        usersAtEnd = await User.find({})
        lengthAtEnd = usersAtEnd.map(u => u.toJSON())
        
        expect(lengthAtEnd.length).toEqual(lengthAtStart.length)

    })

   

    afterAll(async () => {
       await mongoose.connection.close()
       
    })
})

