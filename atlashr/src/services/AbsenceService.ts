import axios from "axios";
import type {Absence, AbsenceRequest} from "../types/Absence.ts";

const API_BASE = "http://localhost:8080/api";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
};

export const requestAbsence = async (absenceData: AbsenceRequest): Promise<Absence> => {
    const res = await axios.post<Absence>(
        `${API_BASE}/absences/request`,
        absenceData,
        { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
    );
    return res.data;
};

export const fetchAbsences = async (): Promise<Absence[]> => {
    const res = await axios.get<Absence[]>(`${API_BASE}/absences`, { headers: getAuthHeader() });
    return res.data;
};

export const updateAbsence = async (id: number, status: string) => {
    const res = await axios.put(`${API_BASE}/absences/${id}`, { status }, { headers: getAuthHeader() });
    return res.data;
};

