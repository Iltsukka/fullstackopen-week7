const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach(blog => {
        sum += blog.likes
    })
    return sum
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0)
        return 0

    if (blogs.length === 1) {
        return blogs[0]
    }
    let biggest = 0
    let indexOfBiggest
    let counter = 0
    blogs.forEach(blog => {
        if (blog.likes > biggest) {
            biggest = blog.likes
            indexOfBiggest = counter
        }
        counter += 1
    })
    return blogs[indexOfBiggest]
}

const mostBlogs = (blogs) => {
    let author = blogs[0].author
    const dictionary = {}
    let max = 0

    for (let i = 0; i<blogs.length; i++) {
        let current = blogs[i].author
        
        if (dictionary[current] == null) {
            dictionary[current] = 1
        } else {
            dictionary[current]++
        }

        if(dictionary[current] > max) {
            max = dictionary[current]
            author = blogs[i].author
        }
        
    }
    console.log(dictionary)
    return {
        Author: `${author}`,
        blogs: max
    }

}

module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs
}