import axios from 'axios';
import { serveURL } from "../constants/index";

const getContractWithID = async(id, token) => {
    try {
        const response = await axios.get(`${serveURL}contracts/getContractWithID/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            params: { id: id },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { getContractWithID };