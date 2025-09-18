import { useEffect, useState } from "react";
import { fetchAbsences, updateAbsence } from "../services/AbsenceService.ts";
import type {Absence, Status} from "../types/Absence.ts";
import {Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Container} from "@mui/material";

export default function AllAbsencesPage() {
    const [absences, setAbsences] = useState<Absence[]>([]);

    useEffect(() => {
        fetchAbsences().then(setAbsences).catch(console.error);
    }, []);

    const handleUpdate = async (id: number, status: Status) => {
        try {
            await updateAbsence(id, status);
            setAbsences(prev => prev.map(a => a.id === id ? { ...a, status} : a));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container maxWidth="sm">
        <Box sx={{ mx: "auto", mt: 5, maxWidth: 900 }}>
            <Typography variant="h5" mb={2}>All Absences</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        {/*<TableCell>Employee</TableCell>*/}
                        <TableCell>Start</TableCell>
                        <TableCell>End</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {absences.map(absence => (
                        <TableRow key={absence.id}>
                            {/*<TableCell>{absence.employee}</TableCell>*/}
                            <TableCell>{absence.startDate}</TableCell>
                            <TableCell>{absence.endDate}</TableCell>
                            <TableCell>{absence.absenceType}</TableCell>
                            <TableCell>{absence.status}</TableCell>
                            <TableCell>
                                    <Button onClick={() => handleUpdate(absence.id, "APPROVED")} sx={{ mr: 1 }}>Approve</Button>
                                    <Button onClick={() => handleUpdate(absence.id, "REJECTED")} color="error">Reject</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
        </Container>
    );
}