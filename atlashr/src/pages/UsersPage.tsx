import { useEffect, useState } from "react";
import { fetchUsers } from "../services/UserService.ts";
import type {User} from "../types/User.ts";
import {Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Container} from "@mui/material";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers().then(setUsers).catch(console.error);
    }, []);

    return (
        <Container maxWidth="sm">
        <Box sx={{ mx: "auto", mt: 5, maxWidth: 800 }}>
            <Typography variant="h5" mb={2}>All Users</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.role}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
        </Container>
    );
}