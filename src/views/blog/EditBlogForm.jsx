import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderTitle from "../../components/HeaderTitle";
import { useEditBlogMutation, useGetBlogQuery } from "../../api/apiSlice";

const EditBlogForm = () => {
  const { blogID } = useParams();

  const { data: blog } = useGetBlogQuery(blogID);
  const [editBlog, { isLoading }] = useEditBlogMutation();

  const navigate = useNavigate();
  const [title, setTitle] = useState(blog.title);
  const [contents, setContents] = useState(blog.contents);
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContents(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((title, contents)) {
      await editBlog({ blogID, title, contents });
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
