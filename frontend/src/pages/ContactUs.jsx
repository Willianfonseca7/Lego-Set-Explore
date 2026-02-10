import { useContext } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import LanguageIcon from "@mui/icons-material/Language";

import ContactForm from "../components/ContactPageComponents/ContactForm";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translations/translations";

const gradientBg = "linear-gradient(180deg, #00d2ff 0%, #3a7bd5 40%, #f7faff 90%)";

export default function ContactUs() {
  const theme = useTheme();
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language].contactPage;

  return (
    <Box
      className={darkMode ? "dark" : ""}
      sx={{
        minHeight: "calc(100vh - 90px)", // desconta navbar
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,

        // mesmo gradiente usado nos cards
        background: gradientBg,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, sm: 5, md: 6 },
            alignItems: { xs: "stretch", md: "center" },
            justifyContent: "center",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
            p: { xs: 2.5, sm: 3, md: 4 },
          }}
        >
          {/* --- LEFT (text) --- */}
          <Box
            sx={{
              flex: 1,
              px: { xs: 1, sm: 2, md: 3 },
              py: { xs: 1, sm: 2, md: 3 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              color: theme.palette.mode === "light" ? "black" : "white",
            }}
          >
            <h1 className="h3-style" style={{ fontWeight: 800, marginBottom: '0.5rem', color: darkMode ? '#ffffff' : '#111827' }}>
              {t.title}
            </h1>

            <p className="p-style" style={{ opacity: 0.8, marginBottom: '0.75rem', color: darkMode ? '#ffffff' : '#111827' }}>
              {t.subtitle}
            </p>

            <p className="p-style-small" style={{ opacity: 0.65, marginBottom: '1rem', color: darkMode ? '#ffffff' : '#111827' }}>
              {t.description}
            </p>

            <Stack
              spacing={2}
              sx={{
                alignItems: { xs: "center", md: "flex-start" },
                width: "100%",
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
              >
                <MailOutlineIcon fontSize="small" />
                <MuiLink
                  href="mailto:support@toytopia.de"
                  underline="hover"
                  sx={{
                    color: "inherit",
                    fontWeight: 500,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    wordBreak: "break-all",
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  support@toytopia.de
                </MuiLink>
              </Stack>

              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
              >
                <PhoneInTalkIcon fontSize="small" />
                <MuiLink
                  href="tel:+492111234567"
                  underline="hover"
                  sx={{
                    color: "inherit",
                    fontWeight: 500,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  +49 211 123 4567
                </MuiLink>
              </Stack>

              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
              >
                <LanguageIcon fontSize="small" />
                <MuiLink
                  href="https://www.toytopia.de"
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                  sx={{
                    color: "inherit",
                    fontWeight: 500,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    wordBreak: "break-all",
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  www.toytopia.de
                </MuiLink>
              </Stack>
            </Stack>
          </Box>

          {/* CENTRAL LINE */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              width: "1px",
              alignSelf: "stretch",
              background: darkMode
                  ? "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.25), rgba(255,255,255,0))"
                  : "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.25), rgba(0,0,0,0))",
            }}
          />

          {/* --- RIGHT (Form) --- */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              px: { xs: 1, sm: 2, md: 0 },
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: 420, sm: 480, md: 520 },
                mx: { xs: "auto", md: 0 },
              }}
            >
              <ContactForm />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
