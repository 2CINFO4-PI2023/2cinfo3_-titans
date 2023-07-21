import axios from 'axios';
import { INutritionBody } from '../modules/stock/Dto/INutritionBody';

export async function fetchNutritionData(query: string): Promise<INutritionBody[]> {
    try {
        const response = await axios.get(<string>process.env.NUTRITION_API_URI, {
            params: { query },
            headers: { 'X-Api-Key': <string>process.env.NUTRITION_API_KEY }
        });
        return response.data.items
    } catch (error) {
        console.error('Error fetching nutrition data:',error);
        throw error;
    }
}

