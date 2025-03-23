import { useSelector } from "react-redux";
import { selectUserById } from "../reducers/usersSlice";

const ShowAuthor = ({ userId }) => {
  const author = useSelector((state) => selectUserById(state, userId));
  return (
    <span>
      {author ? author.firstName + " " + author.lastName : "نویسنده نامشخص"}
    </span>
  );
};

export default ShowAuthor;
