import axios from "axios";

export const getCountriesData = async () => {
    try {
        const { data } = await axios.get('https://restcountries.com/v3.1/all');
        return data;

    } catch (error) {
        console.error(error);
    }
};
