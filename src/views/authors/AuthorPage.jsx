import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectAuthorById } from "../../reducers/authorsSlice";
import { selectAllBlogs } from "../../reducers/blogSlice";
import HeaderTitle from "../../components/HeaderTitle";

const AuthorPage = () => {
  const { authorID } = useParams();
  const author = useSelector((state) =>
    selectAuthorById(state, parseInt(authorID))
  );
  const authorBlogs = useSelector((state) => {
    const allBlogs = selectAllBlogs(state);
    return allBlogs.filter(
      (blog) => parseInt(blog.authorID) === parseInt(authorID)
    );
  });
  const blogTitle = authorBlogs.map((blog) => {
    return (
      <li key={blog.blogID}>
        <Link to={`/blogs/${blog.blogID}`}> {blog.title}</Link>
      </li>
    );
  });
  return (
    <section>
      <HeaderTitle title={`نویسنده ${author.firstName} ${author.lastName}`} />
      <h2>
        {author.firstName} {author.lastName}
      </h2>
      <ul>
        {authorBlogs.length > 0 ? (
          blogTitle
        ) : (
          <li style={{ listStyleType: "none" }}>
            {" "}
            نویسنده ما هیچ پستی تا به الان منتشر نکرده 🤗
          </li>
        )}
      </ul>
    </section>
  );
};
export default AuthorPage;
