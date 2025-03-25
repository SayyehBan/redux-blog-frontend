import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderTitle from "../components/HeaderTitle";
import { blogDeleted, selectBlogById } from "../reducers/blogSlice";
import ShowAuthor from "../components/ShowAuthor";
import ShowTime from "../components/ShowTime";
import ReactionButton from "../components/ReactionButton";

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
        dispatch(blogDeleted({ blogID: blog.blogID }));

        navigate("/");
      }
    }
  };
  return (
    <>
      <HeaderTitle title={blog.title} />

      <section>
        <article className="blog">
          <h2>{blog.title}</h2>
          <div style={{ marginTop: "10px", marginRight: "20px" }}>
            <ShowTime timestamp={blog.createdDate} />
            &nbsp;
            <ShowAuthor authorID={blog.authorID} />
          </div>
          <p className="blog-content">{blog.contents}</p>
          <ReactionButton blog={blog} />
          <Link to={`/editBlog/${blog.blogID}`} className="btn">
            ویرایش پست
          </Link>
          &nbsp;
          <button onClick={handleDelete} className="btn btn-danger">
            حذف پست
          </button>
        </article>
      </section>
    </>
  );
};
export default SingleBlogPage;
