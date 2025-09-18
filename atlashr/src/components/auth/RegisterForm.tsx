import { useState, type ChangeEvent, type FormEvent } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import { registerUser } from "../../services/AuthService.ts";
import type {RegisterRequest} from "../../types/Auth.ts";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const roles = ["EMPLOYEE", "MANAGER", "COWORKER"] as const;

export default function RegisterForm() {
    const [form, setForm] = useState<RegisterRequest>({ fullName: "", username: "", email: "", password: "", role: "EMPLOYEE" });
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await registerUser(form);
            setMessage(`User registered: ${res.username}.`);
            switch (res.role) {
                case "MANAGER":
                    navigate("/users");
                    break;
                case "COWORKER":
                    navigate("/feedback");
                    break;
                case "EMPLOYEE":
                    navigate("/absences/request");
                    break;
                default:
                    navigate("/");
            }
        } catch (err) {
            const error = err as AxiosError<{ error: string }>;
            setMessage(error.response?.data?.error || "Error registering user");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
            <Typography variant="h5" mb={2}>Register</Typography>
            <TextField label="Fullname" name="fullname" fullWidth margin="normal" value={form.fullName} onChange={handleChange} />
            <TextField label="Username" name="username" fullWidth margin="normal" value={form.username} onChange={handleChange} />
            <TextField label="Email" name="email" fullWidth margin="normal" value={form.email} onChange={handleChange} />
            <TextField label="Password" name="password" type="password" fullWidth margin="normal" value={form.password} onChange={handleChange} />
            <TextField
                select
                label="Role"
                name="role"
                fullWidth
                margin="normal"
                value={form.role}
                onChange={handleChange}
            >
                {roles.map((role) => (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                ))}
            </TextField>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Register</Button>
            {message && <Typography mt={2}>{message}</Typography>}
        </Box>
    );
}