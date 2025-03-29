import { Link, useNavigate } from "react-router-dom";
import { miladiToShamsiAndShahanshahi } from "../../utilities/PersianDateConverter";
import ShowTime from "../../components/ShowTime";
import ShowAuthor from "../../components/ShowAuthor";
import ReactionButton from "../../components/ReactionButton";
import Spinner from "../../components/Spinner";
import { useGetBlogsQuery } from "../../api/apiSlice";
import { useMemo } from "react";
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
const BlogsList = () => {
  const {
    data: blogs = [],
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetBlogsQuery();
  const navigate = useNavigate();

  const sortedBlogs = useMemo(() => {
    if (blogs) {
      return [...blogs].sort((a, b) => {
        return new Date(b.createdDate) - new Date(a.createdDate);
      });
    }
    return [];
  }, [blogs]);
  // استفاده از useMemo برای بهینه‌سازی

  // منطق رندر را جدا کنید
  let content;
  if (isLoading) {
    content = <Spinner text="در حال بارگذاری..." />;
  } else if (isSuccess) {
    content = sortedBlogs.map((blog) => <Blog key={blog.blogID} blog={blog} />);
  } else if (isError) {
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
