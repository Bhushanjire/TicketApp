import Appbar from "./components/Appbar";
import TicketList from "./components/TicketList";
import Grid from "@mui/material/Grid";

const App = () => {
  return (
    <Grid container spacing={2}  gap={5}>
      <Grid item xl={12}>
        <Appbar />
      </Grid>
      <Grid item xl={12} justifyContent='center' display='flex'>
        <TicketList />
      </Grid>
    </Grid>

  );
};

export default App;
