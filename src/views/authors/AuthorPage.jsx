import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  selectAuthorById,
  useGetAuthorsQuery,
} from "../../reducers/authorsSlice";
import HeaderTitle from "../../components/HeaderTitle";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useGetBlogsQuery } from "../../api/apiSlice";

const AuthorPage = () => {
  const { authorID: authorIDString } = useParams();
  const authorID = parseInt(authorIDString, 10); // تبدیل رشته به عدد

  const author = useSelector((state) => selectAuthorById(state, authorID));
  const { data: blogsData } = useGetBlogsQuery(); // گرفتن داده‌های بلاگ‌ها

  // Selector برای فیلتر کردن بلاگ‌ها بر اساس authorID
  const selectBlogsByAuthor = useMemo(() => {
    return createSelector(
      (res) => res.data, // داده‌های خام بلاگ‌ها
      (_, authorID) => authorID,
      (data, authorID) => {
        if (!data) return [];
        return data.filter((blog) => blog.authorID === authorID);
      }
    );
  }, []);

  const authorBlogs = useMemo(() => {
    if (blogsData) {
      return selectBlogsByAuthor({ data: blogsData }, authorID);
    }
    return [];
  }, [blogsData, authorID, selectBlogsByAuthor]);

  console.log("authorBlogs", authorBlogs);

  const blogTitle = authorBlogs.map((blog) => {
    return (
      <li key={blog.blogID}>
        <Link to={`/blogs/${blog.blogID}`}>{blog.title}</Link>
      </li>
    );
  });

  if (!author) {
    return (
      <section>
        <HeaderTitle title="نویسنده یافت نشد" />
        <p>نویسنده مورد نظر وجود ندارد یا حذف شده است.</p>
      </section>
    );
  }

  return (
    <section>
      <HeaderTitle title={`نویسنده ${author.firstName} ${author.lastName}`} />
      <h2>
        {author.firstName} {author.lastName}
      </h2>
      <ul>
        {authorBlogs.length > 0 ? (
          blogTitle
        ) : (
          <li style={{ listStyleType: "none" }}>
            {"نویسنده ما هیچ پستی تا به الان منتشر نکرده 🤗"}
          </li>
        )}
      </ul>
    </section>
  );
};

export default AuthorPage;
