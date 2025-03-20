import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import HeaderTitle from "../components/HeaderTitle";

const SingleBlogPage = () => {
  const { blogId } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId)
  );
  if (!blog) {
    return (
      <>
        <HeaderTitle title="پستی پیدا نشد" />
        <h3>پستی پیدا نشد</h3>
      </>
    );
  }
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
        </article>
      </section>
    </>
  );
};
export default SingleBlogPage;
