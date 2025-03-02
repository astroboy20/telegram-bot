import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

/**
 * Checks if a store is "listed" on order.online by searching Google.
 * 
 * @param storeName - The name of the store/restaurant.
 * @returns A boolean indicating whether the store is found on order.online.
 */


export const isStoreListedOnOrderOnline = async (storeName: string): Promise<boolean> => {
    const apiKey = process.env.GOOGLE_CSE_API_KEY;
    const cx = process.env.GOOGLE_CSE_ID;

    if (!apiKey || !cx) {
        throw new Error("Google CSE API key or ID is missing");
    }
    const query = encodeURIComponent(`${storeName} doordash site:order.online`);
    const url = `https://customsearch.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;

    try {
        const response = await axios.get(url);
        const items = response.data.items || [];

        for (const item of items) {
            const link = item.link || ""
            const snippet = item.snippet || ""


            if (link.includes("order.online") || snippet.includes("order.online")) {
                return true
            }
        }

        return false
    } catch (error) {
        console.error(error);
        return false;
    }
}