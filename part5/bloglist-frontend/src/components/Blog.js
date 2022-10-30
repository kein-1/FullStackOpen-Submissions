const Blog = (prop) => {
  const { title, author } = prop;
  return (
    <li>
      {title} {author}
    </li>
  );
};

export default Blog;
