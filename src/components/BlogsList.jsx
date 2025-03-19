import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogsList = () => {
  const blogs = useSelector((state) => state.blogs);
  const renderBlogs = blogs.map((blog) => (
    <article key={blog.id} className="blog-excerpt">
      <h3>{blog.title}</h3>
      <p className="blog-content">{blog.content.substring(0, 100)}</p>
      <Link to={`/blogs/${blog.id}`} className="button muted-button">
        ادامه مطلب
      </Link>
    </article>
  ));
  return (
    <section className="blog-list">
      <h2>لیست پست ها</h2>
      {renderBlogs}
    </section>
  );
};
export default BlogsList;
