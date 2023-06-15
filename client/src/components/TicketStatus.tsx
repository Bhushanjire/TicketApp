import Chip from '@mui/material/Chip';
import {ticketStatus } from "../interfaces/tickets";
import {firstLetterCapital} from '../utility/functions'

interface IProps{
    status? : string
}
const TicketStatus = ({status} : IProps)=>{
    return (
        <Chip label={firstLetterCapital(status || '')} color={status===ticketStatus.OPEN ? 'error' : status===ticketStatus.SOLVED ? 'success' : 'warning'}/>
    )
}
export default TicketStatus