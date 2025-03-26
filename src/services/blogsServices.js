import axios from "axios";
import { Server_URL } from "../utilities/constants/contactValue";

export const blogGetAll = async () => {
    const url = `${Server_URL}Blogs/GetAll`;
    const response = axios.get(url);
    return response;
}
export const blogInsert = async (blog) => {
    console.log("insertBlog", blog);
    const url = `${Server_URL}Blogs/Insert`;
    const formData = new FormData();
    formData.append('Title', blog.title);
    formData.append('Contents', blog.contents);
    formData.append('AuthorID', parseInt(blog.authorID));

    const response = axios.post(url, formData);
    return response;
}
export const blogDelete = async (blogID) => {
    const url = `${Server_URL}Blogs/Delete?BlogID=${blogID}`;
    const response = axios.delete(url);
    return response;
}