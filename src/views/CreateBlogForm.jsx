import { useState } from "react";
import HeaderTitle from "../components/HeaderTitle";
import { useDispatch, useSelector } from "react-redux";
import { blogAdded } from "../reducers/blogSlice";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../reducers/usersSlice";

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(selectAllUsers);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onContentChange = (e) => {
    setContent(e.target.value);
  };
  const onAuthorChange = (e) => {
    setUserId(e.target.value);
  };
  const canSave = [title, content, userId].every(Boolean);
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (canSave) {
      dispatch(blogAdded(title, content, userId));
      setTitle("");
      setContent("");
      setUserId();
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
        <select id="blogAuthor" value={userId} onChange={onAuthorChange}>
          <option value="">انتخاب کنید</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>

        <label htmlFor="blogContent">محتوا اصلی : </label>
        <textarea
          id="blogContent"
          name="blogContent"
          value={content}
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
