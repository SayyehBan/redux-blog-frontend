import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { miladiToShamsiAndShahanshahi } from "../utilities/PersianDateConverter";
import { selectAllBlogs } from "../reducers/blogSlice";
import ShowTime from "../components/ShowTime";
import ShowAuthor from "../components/ShowAuthor";

const BlogsList = () => {
  const blogs = useSelector(selectAllBlogs);

  const navigate = useNavigate();
  const orderedBlogs = blogs
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const renderBlogs = orderedBlogs.map((blog) => (
    <article key={blog.id} className="blog-excerpt">
      <h3>{blog.title}</h3>
      <div style={{ marginTop: "10px", marginRight: "20px" }}>
        <ShowTime timestamp={blog.date} />
        <br />
        {miladiToShamsiAndShahanshahi(blog.date.split("T")[0], 1)}
        <br />
        <ShowAuthor userId={blog.user} />
      </div>

      <p className="blog-content">{blog.content.substring(0, 100)}</p>
      <Link to={`/blogs/${blog.id}`} className="button muted-button">
        ادامه مطلب
      </Link>
    </article>
  ));
  return (
    <section className="blog-list">
      <button
        className="full-button accent-button"
        style={{ marginTop: "1em" }}
        onClick={() => navigate("/blogs/create-blog")}
      >
        ساخت پست جدید
      </button>
      <h2>لیست پست ها</h2>
      {renderBlogs}
    </section>
  );
};
export default BlogsList;
