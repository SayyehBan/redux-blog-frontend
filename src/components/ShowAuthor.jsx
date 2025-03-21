import { useSelector } from "react-redux";

const ShowAuthor = ({ userId }) => {
  const author = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  );
  return (
    <span>
      {author
        ? author.firstName + " " + author.lastName
        : "ویرایش کننده نامشخص"}
    </span>
  );
};

export default ShowAuthor;
