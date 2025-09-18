import axios from "axios";
import type {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse} from "../types/Auth.ts";

const API_BASE = "http://localhost:8080/api/auth";

export const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const res = await axios.post<RegisterResponse>(`${API_BASE}/register`, data);
    return res.data;
};

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await axios.post<LoginResponse>(`${API_BASE}/login`, data);
    return res.data;
};