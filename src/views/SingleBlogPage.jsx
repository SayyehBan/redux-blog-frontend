import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderTitle from "../components/HeaderTitle";
import { blogDeleted, selectBlogById } from "../reducers/blogSlice";

const SingleBlogPage = () => {
  const { blogId } = useParams();
  const blog = useSelector((state) => selectBlogById(state, blogId));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!blog) {
    return (
      <>
        <HeaderTitle title="پستی پیدا نشد" />
        <h3>پستی پیدا نشد</h3>
      </>
    );
  }
  const handleDelete = () => {
    if (blog) {
      if (window.confirm("آیا از حذف این پست اطمینان دارید؟")) {
        dispatch(blogDeleted({ id: blog.id }));

        navigate("/");
      }
    }
  };
  return (
    <>
      <HeaderTitle title={blogId} />
      <Link to="/" className="btn">
        بازگشت به صفحه اصلی
      </Link>
      <section>
        <article className="blog">
          <h2>{blog.title}</h2>
          <p className="blog-content">{blog.content}</p>
          <Link to={`/editBlog/${blog.id}`} className="btn">
            ویرایش پست
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            حذف پست
          </button>
        </article>
      </section>
    </>
  );
};
export default SingleBlogPage;
