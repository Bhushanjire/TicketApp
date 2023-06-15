export interface ITickets{
    count : number,
    next_page :string,
    previous_page : number,
    tickets : ITicketList[]
}

export interface ITicketList{
    id :number,
    status : string,
    subject : string,
    description:string
    tags : string[]
}

export enum ticketStatus{
    OPEN='open',
    SOLVED = 'solved',
    PENDING = 'pending'
}