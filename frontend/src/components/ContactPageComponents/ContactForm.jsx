import { useState, useContext } from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  MenuItem,
  Button,
  Typography,
  Divider,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";
import { translations } from "../../translations/translations";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phonePrefix: "+49",
  phone: "",
  orderNumber: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language].contactPage;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form data:", formData);

    // here you would connect to backend / EmailJS etc.
    setIsSubmitted(true);
    setFormData(initialFormData);

    // if you want it to disappear after a few seconds:
    // setTimeout(() => setIsSubmitted(false), 5000);
  }

  return (
    <Paper
      elevation={3}
      className={darkMode ? "dark:bg-gray-800" : ""}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 1,
        backgroundColor: darkMode ? "#1f2937" : "#ffffff",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, textAlign: "left", color: darkMode ? "white" : "inherit" }}>
        {t.formTitle}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)", mb: 2, textAlign: "left" }}
      >
        {t.formSubtitle}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* thank you message */}
      {isSubmitted && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {t.successMessage}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2.5}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label={`${t.firstName} *`}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              size="small"
            />
            <TextField
              fullWidth
              label={`${t.lastName} *`}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              size="small"
            />
          </Stack>

          <TextField
            fullWidth
            label={`${t.email} *`}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            size="small"
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              select
              label={t.country}
              name="phonePrefix"
              value={formData.phonePrefix}
              onChange={handleChange}
              size="small"
              sx={{ width: { xs: "100%", sm: "35%" } }}
            >
              <MenuItem value="+49">🇩🇪 +49</MenuItem>
              <MenuItem value="+43">🇦🇹 +43</MenuItem>
              <MenuItem value="+41">🇨🇭 +41</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label={t.phone}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              size="small"
            />
          </Stack>

          <TextField
            fullWidth
            label={t.orderNumber}
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            size="small"
          />

          <TextField
            select
            fullWidth
            label={t.subject}
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            size="small"
          >
            <MenuItem value="order">{t.subjects.order}</MenuItem>
            <MenuItem value="product">{t.subjects.product}</MenuItem>
            <MenuItem value="return">{t.subjects.return}</MenuItem>
            <MenuItem value="technical">{t.subjects.technical}</MenuItem>
            <MenuItem value="other">{t.subjects.other}</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label={`${t.message} *`}
            name="message"
            multiline
            minRows={4}
            value={formData.message}
            onChange={handleChange}
            size="small"
          />

          <Box sx={{ textAlign: "right", mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                borderRadius: 25,
                px: 4,
                py: 1,
                fontWeight: "bold",
                bgcolor: "#000000",
                color: "#ffffff",
                "&:hover": {
                  bgcolor: "#333333",
                },
              }}
            >
              {t.sendButton}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}
