

const Blog = ({blog,id}) => {
  if (blog.user === id){
    console.log(blog)

    return (
      <div>
        {blog.title} {blog.author}
      </div>  
    )
  }
 
}

export default Blog