import {render,screen} from '@testing-library/react'
import TicketStatus from '../TicketStatus'

describe('Verify Ticket Status Component',()=>{
    test('Should return open status',()=>{
        render(<TicketStatus status='open'/>)
        const openStatus = screen.getByText('Open')
        expect(openStatus).toBeInTheDocument()
    })
    test('Should return solved status',()=>{
        render(<TicketStatus status='solved'/>)
        const solvedStatus = screen.getByText('Solved')
        expect(solvedStatus).toBeInTheDocument()
    })
    test('Should return pending status',()=>{
        render(<TicketStatus status='pending'/>)
        const pendingStatus = screen.getByText('Pending')
        expect(pendingStatus).toBeInTheDocument()
    })
})