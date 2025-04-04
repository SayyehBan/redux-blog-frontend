import { useState } from "react";
import HeaderTitle from "../../components/HeaderTitle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllAuthors } from "../../reducers/authorsSlice";
import { useAddNewBlogMutation } from "../../api/apiSlice";

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [authorID, setAuthorID] = useState(0);

  const [addNewBlog, { isLoading }] = useAddNewBlogMutation();
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
  const canSave = [title, contents, authorID].every(Boolean) && !isLoading;
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await addNewBlog({ title, contents, authorID }).unwrap();
        setTitle("");
        setContents("");
        setAuthorID(0);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
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
