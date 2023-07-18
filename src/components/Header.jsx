import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import {createTheme, styled, ThemeProvider} from '@mui/material/styles'
import { useCryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
  },
});

const Title = styled(Typography)(({ theme }) => ({
  flex: 1,
  color: "gold",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  cursor: "pointer",
}));

const Header = () => {
  const { currency, setCurrency } = useCryptoState();

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Title onClick={() => navigate("/")} variant="h6">
              Crypto Track
            </Title>

            <Select
              variant="outlined"
              sx={{
                width: 100,
                height: 40,
                marginRight: "15px",
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
