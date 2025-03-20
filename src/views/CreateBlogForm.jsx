import { useState } from "react";
import HeaderTitle from "../components/HeaderTitle";
import { useDispatch } from "react-redux";
import { blogAdded } from "../reducers/blogSlice";
import { useNavigate } from "react-router-dom";

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(blogAdded(title, content));
      setTitle("");
      setContent("");
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
        <label htmlFor="blogContent">محتوا اصلی : </label>
        <textarea
          id="blogContent"
          name="blogContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={handleSubmitForm}>
          ثبت پست
        </button>
      </form>
    </section>
  );
};
export default CreateBlogForm;
