import Bookings from './Bookings'
import { drizzleConnect } from 'drizzle-react'

const mapStateToProps = state => {
    console.log(state)
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus
  }
}

const BookingsContainer = drizzleConnect(Bookings, mapStateToProps);

export default BookingsContainer
