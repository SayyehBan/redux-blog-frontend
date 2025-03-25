import axios from "axios";
import { Server_URL } from "../utilities/Constants/contactValue";

export const getAllBlogs = async () => {
    const url = `${Server_URL}Blogs/GetAll`;
    const response = axios.get(url);
    // console.log('getAllBlogs', response);
    return response;
}