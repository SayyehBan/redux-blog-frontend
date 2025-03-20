import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import App from "../App";
import SingleBlogPage from "../views/SingleBlogPage";
import CreateBlogForm from "../views/CreateBlogForm";
import EditBlogForm from "../views/EditBlogForm";
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
        path: "/blogs/:blogId",
        element: <SingleBlogPage />,
      },
      {
        path: "/editBlog/:blogId",
        element: <EditBlogForm />,
      },
    ],
  },
]);
