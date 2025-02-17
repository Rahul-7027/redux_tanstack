import axios from "axios";

const API_KEY = "9285b3e3a83d20e461a8617b";
const api = axios.create({
    baseURL: `https://v6.exchangerate-api.com/v6/${API_KEY}`
});

export const currencyConverter =async (amount, fromCurrency, toCurrency) => {
 const data=await api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`)
//  console.log(22222222,data.data.conversion_result)
 return data.data.conversion_result
};
