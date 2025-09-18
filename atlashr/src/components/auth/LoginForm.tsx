import { useState, type ChangeEvent, type FormEvent } from "react";
import {TextField, Button, Box, Typography, Container} from "@mui/material";
import { loginUser } from "../../services/AuthService.ts";
import type {LoginRequest} from "../../types/Auth.ts";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
    onLogin?: (data: { username: string; role: string }) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
    const [form, setForm] = useState<LoginRequest>({ username: "", password: "" });
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await loginUser(form);
            localStorage.setItem("token", res.token);
            setMessage(`Logged in as: ${res.username}`);
            if (onLogin) onLogin({ username: res.username, role: res.role });
            localStorage.setItem("username", res.username);
            localStorage.setItem("role", res.role);
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
            setMessage(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
            <Typography variant="h5" mb={2}>Login</Typography>
            <TextField label="Username" name="username" fullWidth margin="normal" value={form.username} onChange={handleChange} />
            <TextField label="Password" name="password" type="password" fullWidth margin="normal" value={form.password} onChange={handleChange} />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
            {message && <Typography mt={2}>{message}</Typography>}
        </Box>
        </Container>
    );
}