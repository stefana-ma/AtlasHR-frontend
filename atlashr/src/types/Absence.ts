// import type {User} from "./User.ts";

export const AbsenceType = {
    VACATION: "VACATION",
    SICKNESS: "SICKNESS",
    OTHER: "OTHER"
} as const;

export type AbsenceType = typeof AbsenceType[keyof typeof AbsenceType];

export const Status = {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED"
} as const;

export type Status = typeof Status[keyof typeof Status];


export interface AbsenceRequest {
    employeeId: string;
    startDate: string;
    endDate: string;
    absenceType: AbsenceType;
}

export interface Absence {
    id: number;
    employeeId: number;
    startDate: string;
    endDate: string;
    absenceType: AbsenceType;
    status: Status;
}