import { useEffect, useState } from "react";
import { Paper, Grid, Typography, Box, Zoom, Container, useMediaQuery } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useSelector } from "react-redux";
import { trim, formatCurrency } from "../../helpers";
import { useTheme } from "@material-ui/core/styles";
import "./treasury-dashboard.scss";

function TreasuryDashboard() {
  const [data, setData] = useState(null);
  const [apy, setApy] = useState(null);
  const [runway, setRunway] = useState(null);
  // const [staked, setStaked] = useState(null);
  const theme = useTheme();
  const smallerScreen = useMediaQuery("(max-width: 650px)");
  const verySmallScreen = useMediaQuery("(max-width: 379px)");
  const lamboprice = 265000;
  const bunkerprice = 100000;
  const spacexflight = 55000000;

  const treasuryMarketValue = useSelector(state => {
    return state.app.treasuryMarketValue;
  });
  const marketPrice = useSelector(state => {
    return state.app.marketPrice;
  });
  const totalSupply = useSelector(state => {
    return state.app.totalSupply;
  });
  const marketCap = useSelector(state => {
    return state.app.marketCap;
  });

  const backingPerOhm = useSelector(state => {
    return state.app.treasuryMarketValue / state.app.circSupply;
  });

  const vaultforlambo = lamboprice / marketPrice;
  const vaultforbunker = bunkerprice / marketPrice;
  const vaultforspacex = spacexflight / marketPrice;

  useEffect(() => {
  }, []);

  return (
    <div id="treasury-dashboard-view" className={`${smallerScreen && "smaller"} ${verySmallScreen && "very-small"}`}>
      <Container style={{ paddingLeft: "3.3rem", paddingRight: "3.3rem" }}>
        <Zoom in={true}>
          <Grid container spacing={2} className="data-grid">
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Paper className="ohm-card">
                  <Typography variant="h6" color="textSecondary">
                    VAULT Price
                  </Typography>
                  <Typography variant="h5">
                    {lamboprice ? formatCurrency(marketPrice, 2) : <Skeleton type="text" />}
                  </Typography> 
                </Paper>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Paper className="ohm-card">
                <Typography variant="h6" color="textSecondary">
                    Vault needed for Bunker
                  </Typography>
                  <Typography variant="h5">
                  {vaultforbunker ? trim(vaultforbunker, 2) : <Skeleton type="text" />}
                  </Typography> 
                </Paper>
              </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Paper className="ohm-card">
                <Typography variant="h6" color="textSecondary">
                  Vault needed for SpaceX Flight
                </Typography>
                <Typography variant="h5">
                  {vaultforspacex ? trim(vaultforspacex, 2) : <Skeleton type="text" />}
                </Typography>
              </Paper>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Paper className="ohm-card">
                <Typography variant="h6" color="textSecondary">
                Vault needed for LAMBO
                </Typography>
                <Typography variant="h5">
                  {vaultforlambo ? trim(vaultforlambo, 2) : <Skeleton type="text" />}
                </Typography> 
              </Paper>
            </Grid>
          </Grid>
        </Zoom>
      </Container>
    </div>
  );
}

export default TreasuryDashboard;
