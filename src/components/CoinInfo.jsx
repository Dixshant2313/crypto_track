import { useEffect, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  styled,
  CircularProgress,
} from "@mui/material";
import { useCryptoState } from "../CryptoContext";
import { HistoricalChart } from "../config/api";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";
import Chart from "chart.js/auto"; // Import Chart separately

const Container = styled("div")(({ theme }) => ({
  width: "75%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 25,
  padding: 40,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginTop: 0,
    padding: 20,
    paddingTop: 0,
  },
}));

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setFlag] = useState(false);
  const { currency } = useCryptoState();

  useEffect(() => {
    const fetchHistoricData = async () => {
      try {
        const { data } = await axios.get(
          HistoricalChart(coin.id, days, currency)
        );
        setFlag(true);
        setHistoricData(data.prices);
      } catch (error) {
        console.error("Error fetching Coin info:", error);
      }
    };
    fetchHistoricData();
  }, [coin.id, days, currency]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  useEffect(() => {
    Chart.defaults.font.family = "'Montserrat', sans-serif"; // Set font family for the chart
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        {!historicData || !flag ? (
          <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  const date = new Date(coin[0]);
                  const time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default CoinInfo;
