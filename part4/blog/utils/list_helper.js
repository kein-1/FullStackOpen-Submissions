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


const dummy = (blogs) => {
  return 1;
};

const totalLikes = (inputBlogs) => {
  const results = inputBlogs.reduce((prev, curr) => prev + curr.likes, 0);
  return results;
};

const favoriteBlog = (inputBlogs) => {
  let maxLikes = -1;
  let favBlog = inputBlogs[0];
  inputBlogs.forEach((blog) => {
    maxLikes = Math.max(maxLikes, blog.likes);
    favBlog = maxLikes === blog.likes ? blog : favBlog;
  });
  return favBlog;
};

const mostBlogs = (inputBlogs) => {
  const authors = new Map();
  inputBlogs.forEach((blog) => {
    if (authors.has(blog.author)) {
      authors.set(blog.author, authors.get(blog.author) + 1);
    } else {
      authors.set(blog.author, 1);
    }
  });
  //Sort can only be applied to arrays. Turn the map object into an array with spread operator
  //Then we apply sort method with a comparison function, and then we use the .at(-1)
  //Method which gets the last element in the sorted array
  const temp = [...authors].sort((a, b) => a[1]< b[1]).at(-1);

  const mainAuthor = {
    author: temp[0],
    blogs: temp[1],
  };
  return mainAuthor;
};

const mostLikes = (inputBlogs) => {
  const authors = new Map();
  inputBlogs.forEach((blog) => {
    if (authors.has(blog.author)) {
      authors.set(blog.author, authors.get(blog.author) + blog.likes);
    } else {
      authors.set(blog.author, blog.likes);
    }
  });
  //Sort can only be applied to arrays. Turn the map object into an array with spread operator
  //Then we apply sort method with a comparison function, and then we use the .at(-1)
  //Method which gets the last element in the sorted array
  const temp = [...authors].sort((a, b) => a[1]< b[1]).at(-1);

  const mainAuthor = {
    author: temp[0],
    likes: temp[1],
  };
  
  return mainAuthor;
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
