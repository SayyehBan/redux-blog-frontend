import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import App from "../App";
import SingleBlogPage from "../views/SingleBlogPage";
import CreateBlogForm from "../views/CreateBlogForm";
import EditBlogForm from "../views/EditBlogForm";
import AuthorsList from "../views/AuthorsList";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: (
      <h3 className="text-center">چیزی پیدا نکردیم متاسفانه 🤗 ...</h3>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/blogs/create-blog",
        element: <CreateBlogForm />,
      },
      {
        path: "/blogs/:blogID",
        element: <SingleBlogPage />,
      },
      {
        path: "/editBlog/:blogID",
        element: <EditBlogForm />,
      },
      {
        path: "/authors",
        element: <AuthorsList />,
      },
    ],
  },
]);
