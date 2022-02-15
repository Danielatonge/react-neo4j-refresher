import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import MapGL from '@urbica/react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function MapResults() {
    const [viewport, setViewport] = React.useState({
        latitude: 55.79,
        longitude: 49.11,
        zoom: 11
    });

    const theme = useTheme()
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        fixedHeight: {
            height: 440,
        },
    }))
    const classes = useStyles(theme)
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    return (
        <React.Fragment>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8} lg={7}>
                    <Paper className={fixedHeightPaper}>
                        <MapGL
                            style={{ width: '100%', height: '100%' }}
                            mapStyle="mapbox://styles/mapbox/light-v9"
                            accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                            latitude={viewport.latitude}
                            longitude={viewport.longitude}
                            zoom={viewport.zoom}
                            onViewportChange={setViewport}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={5}>
                    <Paper className={fixedHeightPaper}>
                        <p>Details View</p>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
