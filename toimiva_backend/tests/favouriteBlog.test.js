const listHelper = require('../utils/list_helper')

describe('favourite blog', () => {
    test('likes of just one blog', () => {
        const blog = [
            {name: "Talk of beautiful animals!",
            author: "M.Jackson",
            likes: 77
        }]

        expect(listHelper.favouriteBlog(blog)).toEqual(blog[0])
    })

    test('favourite out of multiple blogs', () => {
        const blogs = [
            {
              _id: "5a422a851b54a676234d17f7",
              title: "React patterns",
              author: "Michael Chan",
              url: "https://reactpatterns.com/",
              likes: 7,
              __v: 0
            },
            {
              _id: "5a422aa71b54a676234d17f8",
              title: "Go To Statement Considered Harmful",
              author: "Edsger W. Dijkstra",
              url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
              likes: 37,
              __v: 0
            },
            {
              _id: "5a422b3a1b54a676234d17f9",
              title: "Canonical string reduction",
              author: "Edsger W. Dijkstra",
              url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
              likes: 12,
              __v: 0
            },
            {
                title: "Go home Johnny",
                author: "Tiger King",
                likes: 15
            }]

            expect(listHelper.favouriteBlog(blogs)).toEqual(blogs[1])
    })

    test('likes when blogs is empty', () => {
        blogs = []
        expect(listHelper.favouriteBlog(blogs)).toBe(0)
    })
})