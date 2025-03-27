import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { miladiToShamsiAndShahanshahi } from "../../utilities/PersianDateConverter";
import { fetchBlogs, selectAllBlogs } from "../../reducers/blogSlice";
import ShowTime from "../../components/ShowTime";
import ShowAuthor from "../../components/ShowAuthor";
import ReactionButton from "../../components/ReactionButton";
import { memo, useEffect } from "react";
import Spinner from "../../components/Spinner";
let Blog = ({ blog }) => {
  return (
    <article className="blog-excerpt">
      <h3>{blog.title}</h3>
      <div style={{ marginTop: "10px", marginRight: "20px" }}>
        <ShowTime timestamp={blog.createdDate} />
        <br />
        {miladiToShamsiAndShahanshahi(blog.createdDate.split("T")[0], 1)}
        <br />
        <ShowAuthor authorID={blog.authorID} />
      </div>
      <p className="blog-content">{blog.contents.substring(0, 100)}</p>
      <ReactionButton blog={blog} />
      <Link to={`/blogs/${blog.blogID}`} className="button muted-button">
        ادامه مطلب
      </Link>
    </article>
  );
};
Blog = memo(Blog);
const BlogsList = () => {
  // تمام هوک‌ها را در بالای کامپوننت و بدون شرط فراخوانی کنید
  const blogStatus = useSelector((state) => state.blogs.status);
  const error = useSelector((state) => state.blogs.error);
  const blogs = useSelector(selectAllBlogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (blogStatus === "idle") {
      dispatch(fetchBlogs());
    }
  }, [blogStatus, dispatch]);

  // منطق رندر را جدا کنید
  let content;
  if (blogStatus === "loading") {
    content = <Spinner text="در حال بارگذاری..." />;
  } else if (blogStatus === "completed") {
    const orderedBlogs = blogs
      .slice()
      .sort((a, b) => b.createdDate.localeCompare(a.createdDate));

    content = orderedBlogs.map((blog) => (
      <Blog key={blog.blogID} blog={blog} />
    ));
  } else if (blogStatus === "failed") {
    content = <div>خطا: {error}</div>;
  }

  return (
    <section className="blog-list">
      <button
        className="full-button accent-button"
        style={{ marginTop: "1em" }}
        onClick={() => navigate("/blogs/create-blog")}
      >
        ساخت پست جدید
      </button>
      <h2>لیست پست‌ها</h2>
      {content}
    </section>
  );
};

export default BlogsList;
