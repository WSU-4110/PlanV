// apiService.js
import axios from 'axios';

const API_URL = ``;
 // Replace with your actual API URL

export const searchFlights = async (searchParams) => {
    try {
        const response = await axios.get(API_URL, { params: searchParams });
        return response.data; // or response.data.results based on your API structure
    } catch (error) {
        console.error('Error fetching flights:', error);
        throw error; // Handle the error appropriately
    }
};
