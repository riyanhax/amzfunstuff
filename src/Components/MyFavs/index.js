import React, { Component } from 'react'
import {
    Grid, Paper, Tabs, Tab,
} from '@material-ui/core'
import { orange, red } from '@material-ui/core/colors'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Products from '../Products'


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
})

  
class MyFavs extends Component {

    state = {
        value: 0,
    }

    handleChange = (event, value) => {
        this.setState({ value });
    }

    render() {
        const { classes } = this.props
        const { value } = this.state
        
        let products = <Products category={'myfavs'} subcategory={'dummyvalue'} /> 
        let articles = null

        console.log('value ',value)
        return <Grid container justify="center" alignItems="center">
                    <Paper className={classes.root}>
                        <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        >
                        <Tab label="Item One" />
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                        </Tabs>
                    </Paper>
                </Grid>
    }
}

export default compose(
    withStyles(styles)
)(MyFavs)