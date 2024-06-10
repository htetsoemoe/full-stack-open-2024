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
    const reducer = (maxLikesBlog, currentBlog) => {
        return maxLikesBlog.likes > currentBlog.likes ? maxLikesBlog : currentBlog // returns single blog object with max likes
    }
    return blogs.reduce(reducer, blogs[0])
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}