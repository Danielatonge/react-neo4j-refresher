import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Grid, Avatar } from '@material-ui/core'
export default function Profile() {
    const { user, isAuthenticated } = useAuth0()

    return (
        isAuthenticated && (
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Avatar alt={user.name} src={user.picture} sx={{ width: 56, height: 56 }} />
                    <div>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                </Grid>
            </Grid>)
    )
}
