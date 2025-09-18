import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login";
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    AtlasHR
                </Typography>
                {token ? (
                    <>
                    {role === "MANAGER" && (
                        <>
                        <Button color="inherit" component={Link} to="/users">
                            Users
                        </Button>
                        <Button color="inherit" component={Link} to="/absences">
                            Absences
                        </Button>
                        </>
                        )}
                        {role === "COWORKER" && (
                            <Button color="inherit" component={Link} to="/feedback">
                                Feedback
                            </Button>
                        )}
                        {role === "EMPLOYEE" && (
                            <Button color="inherit" component={Link} to="/absences/request">
                                Request Absence
                            </Button>
                        )}
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;