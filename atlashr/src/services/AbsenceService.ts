import type { AbsenceRequest } from '../types/Absence';

const API_BASE_URL = 'http://localhost:8080/api/absences';

export async function requestAbsence(absenceData: AbsenceRequest): Promise<AbsenceRequest[]> {
    const response = await fetch(`${API_BASE_URL}/request`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(absenceData),
    });
    if(!response.ok) {
        throw new Error('Failed to request absence.');
    }
    const data = await response.json();
    return data;
};