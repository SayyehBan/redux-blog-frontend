import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderTitle from "../../components/HeaderTitle";
import { deleteBlog } from "../../reducers/blogSlice";
import ShowAuthor from "../../components/ShowAuthor";
import ShowTime from "../../components/ShowTime";
import ReactionButton from "../../components/ReactionButton";
import { useGetBlogQuery } from "../../api/apiSlice";
import Spinner from "../../components/Spinner";

const SingleBlogPage = () => {
  const { blogID } = useParams();

  const { data: blog, isFetching, isSuccess } = useGetBlogQuery(blogID);

  const navigate = useNavigate();
  if (!blog) {
    return (
      <>
        <HeaderTitle title="پستی پیدا نشد" />
        <h3>پستی پیدا نشد</h3>
      </>
    );
  }
  let content;

  if (isFetching) {
    content = <Spinner text="در حال بارگذاری..." />;
  } else if (isSuccess) {
    content = (
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
        {/* <button onClick={handleDelete} className="btn btn-danger">
          حذف پست
        </button> */}
      </article>
    );
  }
  const handleDelete = () => {
    if (blog) {
      if (window.confirm("آیا از حذف این پست اطمینان دارید؟")) {
        // dispatch(deleteBlog(blog.blogID));

        navigate("/");
      }
    }
  };
  return (
    <>
      <HeaderTitle title={blog.title} />

      <section> {content}</section>
    </>
  );
};
export default SingleBlogPage;
