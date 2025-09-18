import { useState } from "react";
import { Container, TextField, Button, Typography, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { leaveFeedback } from "../services/FeedbackService";
import type { FeedbackRequest } from "../types/Feedback";
import type {AxiosError} from "axios";

const FeedbackPage = () => {
    const [feedback, setFeedback] = useState("");
    const [aiFeedback, setAiFeedback] = useState("");
    const [message, setMessage] = useState("");
    const [polish, setPolish] = useState(true);

    const handleSubmit = async () => {
        try {
            const feedbackData: FeedbackRequest = {
                fromUser: String(localStorage.getItem("username")),
                text: feedback,
                polish
            };

            const savedFeedback = await leaveFeedback(feedbackData);
            console.log(savedFeedback);

            setAiFeedback(savedFeedback.text);
            setMessage("✅ Feedback trimis cu succes!");
        } catch (err) {
            const error = err as AxiosError<{ error: string }>;
            console.error(error);
            setMessage("❌ Eroare la trimiterea feedback-ului: " + error.message);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Lasă un Feedback
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Scrie feedback-ul tău"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />

                <FormControlLabel
                    control={<Checkbox checked={polish} onChange={(e) => setPolish(e.target.checked)} />}
                    label="Trimite prin AI pentru traducere"
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!feedback.trim()}
                >
                    Trimite
                </Button>

                {message && <Alert severity={message.startsWith("✅") ? "success" : "error"}>{message}</Alert>}

                {aiFeedback && (
                    <TextField
                        label="Feedback tradus de AI"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={aiFeedback}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ mt: 2 }}
                    />
                )}
            </Box>
        </Container>
    );
};

export default FeedbackPage;
