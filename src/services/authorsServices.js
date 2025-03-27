import axios from "axios";
import { Server_URL } from "../utilities/constants/contactValue";

export const getAllAuthors = async () => {
    const url = `${Server_URL}Authors/GetAll`;
    return axios.get(url);
}
export const deleteAuthor = async (authorID) => {
    const url = `${Server_URL}Authors/Delete?AuthorID=${authorID}`;
    const response = axios.delete(url);
    return response;
}
export const insertAuthor = async (author) => {
    const url = `${Server_URL}Authors/Insert`;
    const formData = new FormData();
    formData.append('FirstName', author.firstName);
    formData.append('LastName', author.lastName);

    const response = axios.post(url, formData);
    return response;
}