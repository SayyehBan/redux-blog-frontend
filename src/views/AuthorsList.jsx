import { useSelector } from "react-redux";
import { selectAllAuthors } from "../reducers/authorsSlice";
import { Link } from "react-router-dom";

const AuthorsList = () => {
  const authors = useSelector(selectAllAuthors);
  const renderedAuthors = authors.map((author) => (
    <li key={author.authorID}>
      <Link to={`/authors/${author.authorID}`}>
        {author.firstName} {author.lastName}
      </Link>
    </li>
  ));
  return (
    <section>
      <h2>لیست نویسندگان</h2>
      <ul>{renderedAuthors}</ul>
    </section>
  );
};
export default AuthorsList;
