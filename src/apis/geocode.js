// src/api/geocode.js
import axios from 'axios';

const getCoordinates = async(address) => {
    const apiKey = 'qWgIXCLKCf0ZRBxKWgtqMpt78RJBhMAaVwSWPzsJ5fvgleY5rsQ9mRRRp97x75EO'; // Thay thế YOUR_API_KEY bằng API key của bạn
    const normalizedAddress = address.trim().replace(/\s+/g, ' ');
    try {
        const response = await axios.get(`https://api.distancematrix.ai/maps/api/geocode/json?address=${encodeURIComponent(normalizedAddress)}&language=vi&key=${apiKey}`);
        if (response.data.status === 'OK' && response.data.result.length > 0) {
            const data = response.data.result[0].geometry.location;
            return { lat: data.lat, lon: data.lng };
        } else {
            throw new Error('Không tìm thấy kết quả');
        }
    } catch (error) {
        throw new Error('Lỗi khi lấy dữ liệu geocode: ' + error.message);
    }
};

export default getCoordinates;