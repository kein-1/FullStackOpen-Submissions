const { dummy, totalLikes, favoriteBlog, mostBlogs } = require('../utils/list_helper.js')



const inputBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 2,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Robert C. Martin",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 1,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 4,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 3,
    __v: 0,
    },
    ];
    
// test('this method should return 1', () => {
    
//     const blogs = []
//     const result = dummy(blogs)
//     expect(result).toBe(1)
// })

// describe("This is total likes test", () => {
//     test('The total likes should be 15', () => {
//         const results = totalLikes(inputBlogs)
//         expect(results).toBe(15)
//     })
// })

// describe("This is the favorite blogs", () => {
//     test("the favorite blog with the most likes should be the 2nd to last blog", () => {
//         const favBlog = favoriteBlog(inputBlogs)
//         expect(favBlog).toEqual(inputBlogs[1])
//     })
// })



describe("This is the author with the most blogs test", () => {
    const answer = {
        author: "Robert C. Martin",
        blogs: 3
    }
    
    test("This is the author with the most blogs", () => {
        const author = mostBlogs(inputBlogs)
        expect(author).toEqual(answer)
    })
    
})