import { render, screen } from "@testing-library/react";
import TicketList from "../TicketList";

describe("Ticket List Component", () => {
  test("Verify table should be in th UI and display first 25 records only", async () => {
    render(<TicketList />);
    const tickets = await screen.findAllByRole("ticket-row");
    expect(tickets.length).toBe(25);
  });
  
  test("Column names should be correct", async () => {
    render(<TicketList />);
    const columnNames = ["Ticket Id", "Subject", "Status", "Action"];
    columnNames.forEach((name) => {
      const columnName = screen.getByTestId(name);
      expect(columnName).toBeInTheDocument();
    });
  });
});
