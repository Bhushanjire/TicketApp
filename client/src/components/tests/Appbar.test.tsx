import {render,screen} from '@testing-library/react'
import Appbar from '../Appbar'

describe('Appbar Component',()=>{
    test('Should Display Correct App Title',()=>{
        render(<Appbar/>)
        const appTitle = screen.getByText('Zendesk Ticket Viewer')
        expect(appTitle).toBeInTheDocument()
    })
})