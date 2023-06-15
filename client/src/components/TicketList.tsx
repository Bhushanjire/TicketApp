import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ITicketList, ITickets } from "../interfaces/tickets";
import TicketDetailsDialog from "../components/TicketDetailsDialog";
import PreviewIcon from "@mui/icons-material/Preview";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TicketStatus from "../components/TicketStatus";
import ErrorDialog from "../components/ErrorDialog";
import "../css/TicketList.scss";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  action?: "string";
}

const columns: readonly Column[] = [
  { id: "Id", label: "Ticket Id", minWidth: 170 },
  {
    id: "Subject",
    label: "Subject",
    minWidth: 170,
  },
  {
    id: "Status",
    label: "Status",
    minWidth: 170,
  },
  {
    id: "Action",
    label: "Action",
    minWidth: 170,
  },
];

const TicketList = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [data, setData] = useState<ITickets>();
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [ticket, setTicket] = useState<ITicketList>();
  const [error, setError] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    getTickets(newPage, rowsPerPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(() => {
      setPage(1);
      getTickets(1, +event.target.value);
      return +event.target.value;
    });
  };
  const getTickets = (page: number, perPage: number) => {
    fetch("http://localhost:5000/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: page,
        per_page: perPage,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
        setCount(data.count);
      })
      .catch((error) => {
        setError(true);
      });
  };
  const viewTicketDetails = (ticket: ITicketList) => {
    setTicket(ticket);
    setIsOpen(true);
  };
  const onClose = () => {
    setTicket({} as ITicketList);
    setIsOpen(false);
  };

  const handleErrorClose = () => {
    setError(false);
  };

  useEffect(() => {
    getTickets(page, rowsPerPage);
  }, []);

  return (
    <>
      <Paper
        sx={{ width: "70%", overflow: "hidden" }}
        className="ticket-list-container"
      >
        <TableContainer sx={{ maxHeight: "70vh" }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            data-testid="ticket-table"
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={"column" + column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className="column-names"
                    data-testid={column.label}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.tickets.map((ticket) => {
                return (
                  <TableRow
                    hover
                    role="ticket-row"
                    tabIndex={-1}
                    key={"row" + ticket.id}
                  >
                    <TableCell key={`Id${ticket.id}`}>{ticket.id}</TableCell>
                    <TableCell key={`subjet${ticket.id}`}>
                      {ticket.subject}
                    </TableCell>
                    <TableCell key={`status${ticket.id}`}>
                      <TicketStatus status={ticket.status} />
                    </TableCell>
                    <TableCell key={`action${ticket.id}`}>
                      <Tooltip title="View Ticket Details">
                        <IconButton onClick={() => viewTicketDetails(ticket)}>
                          <PreviewIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={!count || count <= 0 ? 0 : page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <TicketDetailsDialog isOpen={isOpen} ticket={ticket} onClose={onClose} />
      <ErrorDialog isOpen={error} onClose={handleErrorClose} />
    </>
  );
};

export default TicketList;
