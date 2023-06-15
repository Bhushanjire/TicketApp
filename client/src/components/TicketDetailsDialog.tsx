import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { ITicketList } from "../interfaces/tickets";
import Grid from "@mui/material/Grid";
import TicketStatus from '../components/TicketStatus'

import '../css/TicketDetailsDialog.scss'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface IProps {
  isOpen: boolean;
  ticket?: ITicketList;
  onClose: () => void;
}

const TicketDetailsDialog = ({ isOpen, ticket, onClose }: IProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="dialog-container">
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        fullWidth={true}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} style={{fontWeight:'bold'}}>
          Ticket Id : {ticket?.id}
         </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              Subject:
            </Grid>
            <Grid item xs={9}>
              {ticket?.subject}
            </Grid>
            <Grid item xs={3}>
              Status:
            </Grid>
            <Grid item xs={9}>
              <TicketStatus status={ticket?.status}/>
            </Grid>
            <Grid item xs={3}>
              Tags:
            </Grid>
            <Grid item xs={9}>
              {ticket?.tags?.toString()}
            </Grid>
            <Grid item xs={3}>
              Description:
            </Grid>
            <Grid item xs={9}>
              {ticket?.description}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default TicketDetailsDialog;
