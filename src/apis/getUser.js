import axios from 'axios';
import { serveURL } from "../constants/index";

const getUserInfo = async(id, token) => {
    try {
        const response = await axios.get(`${serveURL}user/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { getUserInfo };