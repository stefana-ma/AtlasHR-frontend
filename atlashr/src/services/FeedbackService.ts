import axios, {AxiosError} from "axios";
import type { FeedbackRequest } from "../types/Feedback";

const API_BASE = "http://localhost:8080/api";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
};

export const leaveFeedback = async (feedbackData: FeedbackRequest) => {
    try {
        const res = await axios.post(`${API_BASE}/feedback`, feedbackData, {
            headers: {
                ...getAuthHeader(),
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (err) {
        const error = err as AxiosError<{ error: string }>;
        throw new Error(error.response?.data?.error || "Failed to leave feedback");
    }
};
