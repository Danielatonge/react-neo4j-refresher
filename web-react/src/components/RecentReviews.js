import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'

const GET_RECENT_REVIEWS_QUERY = gql`
  {
    users {
      id
      fullName
      currentPosition
      address
      averageRating
    }
  }
`

export default function RecentReviews() {
  const { loading, error, data } = useQuery(GET_RECENT_REVIEWS_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Title>Recent Reviews</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.users.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.fullName}</TableCell>
              <TableCell>{row.currentPosition}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell align="right">{row.averageRating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
