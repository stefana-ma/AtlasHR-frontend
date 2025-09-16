import React, { useState } from "react";
import type { AbsenceRequest } from "../types/Absence";
import { AbsenceType } from "../types/Absence";
import { requestAbsence } from "../services/AbsenceService";
import { Box, Container, Typography, TextField, FormControl, Select, MenuItem, Button, Alert } from "@mui/material";

const AbsencePage: React.FC = () => {
    const [form, setForm] = useState<AbsenceRequest>({
        employeeId: "123", // This would typically come from user context/auth
        startDate: "",
        endDate: "",
        absenceType: AbsenceType.VACATION
    });

    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        const absenceData: AbsenceRequest = {
            employeeId: form.employeeId,
            startDate: form.startDate,
            endDate: form.endDate,
            absenceType: form.absenceType
        };

        try {
            await requestAbsence(absenceData);
            setMessage({ type: "success", text: "Absence request submitted successfully!" });
        } catch (error: any) {
            setMessage({ type: "error", text: "Failed to submit absence request: " + error.message });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" 
                sx={{ mt: 5, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}
                onSubmit={handleSubmit}>
                    <Typography component="h2" variant="h5" gutterBottom align="center">
                        Absence Request Form
                    </Typography>

                    <TextField
                        label="Start Date"
                        type="date"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        required
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        name="endDate"
                        value={form.endDate}
                        onChange={handleChange}
                        required
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Select
                            value={form.absenceType}
                            onChange={(e) => setForm((prev) => ({ ...prev, absenceType: e.target.value as AbsenceRequest["absenceType"] }))}
                            required
                        >
                            {Object.values(AbsenceType).map((t) => (
                                <MenuItem key={t} value={t}>
                                    {t}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>

                    {message && (
                        <Alert severity={message.type} sx={{ mt: 3}}>
                            {message.text}
                        </Alert>
                    )}
            </Box>
        </Container>
    );
};

export default AbsencePage;