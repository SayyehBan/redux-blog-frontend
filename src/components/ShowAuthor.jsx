import { useSelector } from "react-redux";
import { selectAuthorById } from "../reducers/authorsSlice";

const ShowAuthor = ({ authorID }) => {
  const author = useSelector((state) => selectAuthorById(state, authorID));
  return (
    <span>
      {author ? author.firstName + " " + author.lastName : "نویسنده نامشخص"}
    </span>
  );
};

export default ShowAuthor;
