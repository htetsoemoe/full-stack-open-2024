const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const reducer = (maxLikesBlog, currentBlog) => {
        return maxLikesBlog.likes > currentBlog.likes ? maxLikesBlog : currentBlog // returns single blog object with max likes
    }
    return blogs.reduce(reducer, blogs[0])
}

// Exercises 4.5* - mostBlogs
const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let authorWithMostBlogs = ""
    let maxBlogs = 0

    // calculate no. of blogs using reduce
    const authorBlogCounts = blogs.reduce((counts, blog) => {
        const author = blog.author

        if (counts[author]) {
            counts[author]++
        } else {
            counts[author] = 1
        }

        if (counts[author] > maxBlogs) {
            maxBlogs = counts[author]
            authorWithMostBlogs = author
        }
        return counts
    }, {})

    // finally returns an author with max blogs
    return {
        author: authorWithMostBlogs,
        blogs: maxBlogs,
    }
}

// Exercises 4.5* - mostLikes
const mostLikes = (blogs) => {

    if (blogs.length === 0) {
        return null
    }

    // Calculate max likes of each author in blog array
    const authorLikes = blogs.reduce((likes, blog) => {
        const author = blog.author

        if (likes[author]) {
            likes[author] += blog.likes
        } else {
            likes[author] = blog.likes
        }

        return likes
    }, {})

    console.log("Authors with Likes: ", authorLikes) // Authors with Likes:  { 'Michael Chan': 7, 'Edsger W. Dijkstra': 17, 'Robert C. Martin': 12 }
    /**
     * The Object.entries() static method returns an array of a given object's 
     * own enumerable string-keyed property key-value pairs.
     * 
     * In our case, authorLikes is => { 'Michael Chan': 7, 'Edsger W. Dijkstra': 17, 'Robert C. Martin': 12 }
     * 
     * Object.entries(authorLikes) returns 
     * Array [Array ["Michael Chan", 7], Array ["Edsger W. Dijkstra", 17], Array ["Robert C. Martin", 12]]
     * 
     * First times of callback function of reduce, the accumulator(max) value is ["Michael Chan", 7] and currentValue(author) is ["Edsger W. Dijkstra", 17]
     * because there is no initial value of accumulator(max) 
     */
    const getAuthorWithMostLikes = Object.entries(authorLikes).reduce(
        (max, author) => {
            if (max[1] > author[1]) {
                return max;
            } else {
                return author;
            }
        }
    );
    console.log("Author with Most Likes: ", getAuthorWithMostLikes) // Author with Most Likes:  [ 'Edsger W. Dijkstra', 17 ]

    return {
        author: getAuthorWithMostLikes[0],
        likes: getAuthorWithMostLikes[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}