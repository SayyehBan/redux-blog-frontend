import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HeaderTitle from "./HeaderTitle";

const SingleBogPage = () => {
  const { blogId } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId)
  );
  return (
    <>
      <HeaderTitle title={blogId} />

      <section>
        <article className="blog">
          <h2>{blog.title}</h2>
          <p className="blog-content">{blog.content}</p>
        </article>
      </section>
    </>
  );
};
export default SingleBogPage;
