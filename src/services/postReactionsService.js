import axios from "axios";
import { Server_URL } from "../utilities/constants/contactValue";

export const PostReactionsUpdate = async (reaction) => {
    const url = `${Server_URL}PostReactions/Update`;
    const formData = new FormData();
    formData.append('BlogID', parseInt(reaction.blogID) || 0);
    formData.append('ThumbsUp', parseInt(reaction.thumbsUp) || 0);
    formData.append('Hooray', parseInt(reaction.hooray) || 0);
    formData.append('Heart', parseInt(reaction.heart) || 0);
    formData.append('Rocket', parseInt(reaction.rocket) || 0);
    formData.append('Eyes', parseInt(reaction.eyes) || 0);
    const response = await axios.put(url, formData); // اضافه کردن await
    return response;
};