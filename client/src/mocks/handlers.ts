import { rest } from "msw";
import ticketList from '../mocks/data/ticketList.json'
export const handlers = [
  rest.post("http://localhost:5000/tickets", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(ticketList)
    );
  }),
];
