import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectBlogById, updateBlog } from "../../reducers/blogSlice";
import HeaderTitle from "../../components/HeaderTitle";

const EditBlogForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogID } = useParams();
  const blog = useSelector((state) => selectBlogById(state, blogID));

  const [title, setTitle] = useState(blog.title);
  const [contents, setContents] = useState(blog.contents);
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContents(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if ((title, contents)) {
      dispatch(updateBlog({ blogID, title, contents }));
      navigate(`/blogs/${blogID}`);
    }
  };
  if (!blog) {
    return (
      <>
        <HeaderTitle title="پستی پیدا نشد" />
        <h3>پستی پیدا نشد</h3>
      </>
    );
  }
  return (
    <>
      <HeaderTitle title="ویرایش پست" />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">عنوان</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">محتوا</label>
          <textarea
            id="content"
            name="content"
            value={contents}
            onChange={onContentChange}
            required
          ></textarea>
        </div>
        <button type="submit">ثبت</button>
      </form>
    </>
  );
};
export default EditBlogForm;
