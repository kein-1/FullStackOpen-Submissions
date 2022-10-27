const Blog = (prop) => {
  const { title, author } = prop;
  return (
    <div>
      {title} {author}
    </div>
  );
};

export default Blog;
