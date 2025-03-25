import { useState } from "react";
import HeaderTitle from "../components/HeaderTitle";
import { useDispatch, useSelector } from "react-redux";
import { blogAdded } from "../reducers/blogSlice";
import { useNavigate } from "react-router-dom";
import { selectAllAuthors } from "../reducers/authorsSlice";

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [authorID, setAuthorID] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authors = useSelector(selectAllAuthors);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onContentChange = (e) => {
    setContents(e.target.value);
  };
  const onAuthorChange = (e) => {
    setAuthorID(e.target.value);
  };
  const canSave = [title, contents, authorID].every(Boolean);
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (canSave) {
      dispatch(blogAdded(title, contents, authorID));
      setTitle("");
      setContents("");
      setAuthorID();
      navigate("/");
    }
  };
  return (
    <section>
      <HeaderTitle title="ساخت پست جدید" />
      <h2>ساخت پست جدید</h2>
      <form autoComplete="off">
        <label htmlFor="blogTitle">عنوان پست : </label>
        <input
          type="text"
          id="blogTitle"
          name="blogTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="blogAuthor">نویسنده :</label>
        <select id="blogAuthor" value={authorID} onChange={onAuthorChange}>
          <option value="">انتخاب کنید</option>
          {authors.map((author) => (
            <option key={author.authorID} value={author.authorID}>
              {author.firstName} {author.lastName}
            </option>
          ))}
        </select>

        <label htmlFor="blogContent">محتوا اصلی : </label>
        <textarea
          id="blogContent"
          name="blogContent"
          value={contents}
          onChange={onContentChange}
        />
        <button type="button" onClick={handleSubmitForm} disabled={!canSave}>
          ثبت پست
        </button>
      </form>
    </section>
  );
};
export default CreateBlogForm;
