export const AbsenceType = {
    VACATION: "VACATION",
    SICKNESS: "SICKNESS",
    OTHER: "OTHER"
} as const;

export type AbsenceType = typeof AbsenceType[keyof typeof AbsenceType];

export interface AbsenceRequest {
    employeeId: string;
    startDate: string;
    endDate: string;
    absenceType: AbsenceType;
}