import { useDispatch, useSelector } from "react-redux";
import {
  addAuthor,
  authorDelete,
  selectAllAuthors,
} from "../../reducers/authorsSlice";
import { Link } from "react-router-dom";
import HeaderTitle from "../../components/HeaderTitle";
import { useState } from "react";

const AuthorsList = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const canSave = [firstName, lastName].every(Boolean);
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (canSave) {
      dispatch(
        addAuthor({
          firstName: firstName,
          lastName: lastName,
        })
      );
      setFirstName("");
      setLastName("");
    }
  };
  const handleDeleteAuthor = (authorID) => {
    dispatch(authorDelete(authorID));
  };
  const authors = useSelector(selectAllAuthors);
  const renderedAuthors = authors.map((author) => (
    <li key={author.authorID}>
      <Link to={`/authors/${author.authorID}`}>
        {author.firstName} {author.lastName}
      </Link>
      &nbsp;
      <Link
        style={{ marginRight: "10px", color: "tomato" }}
        onClick={() => handleDeleteAuthor(author.authorID)}
      >
        &otimes;
      </Link>
    </li>
  ));
  return (
    <section>
      <HeaderTitle title="لیست نویسندگان" />
      <div>
        <form autoComplete="off">
          <label htmlFor="firstName">نام :</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={onFirstNameChange}
          />
          <label htmlFor="lastName">نام خانوادگی :</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={onLastNameChange}
          />
          <p />
          <button type="submit" disabled={!canSave} onClick={handleSubmitForm}>
            افزودن نویسنده
          </button>
        </form>
      </div>
      <h2>لیست نویسندگان</h2>
      <ul>{renderedAuthors}</ul>
    </section>
  );
};
export default AuthorsList;
