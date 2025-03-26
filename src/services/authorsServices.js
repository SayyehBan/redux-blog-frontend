import axios from "axios";
import { Server_URL } from "../utilities/constants/contactValue";

export const getAllAuthors = async () => {
    const url = `${Server_URL}Authors/GetAll`;
    return axios.get(url);
}