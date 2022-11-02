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
  const temp = [...authors].sort((a, b) => a.likes < b.likes).at(-1);
  const mainAuthor = {
    author: temp[0],
    blogs: temp[1],
  };
  return mainAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
