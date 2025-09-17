import axios from "axios";
import type {User} from "../types/User.ts";

const API_BASE = "http://localhost:8080/api";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
};

export const fetchUsers = async (): Promise<User[]> => {
    const res = await axios.get<User[]>(`${API_BASE}/users`, { headers: getAuthHeader() });
    return res.data;
};