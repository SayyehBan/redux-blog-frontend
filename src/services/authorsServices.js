import axios from "axios";
import { Server_URL } from "../utilities/Constants/contactValue";

export const getAllAuthors = async () => {
    const url = `${Server_URL}Authors/GetAllAuthors`;
    return axios.get(url);
}