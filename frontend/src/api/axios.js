import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND || "http://localhost:3000/api";

const cliente = axios.create({
    baseUrl,
    withCredentials: true,
});

export default cliente;