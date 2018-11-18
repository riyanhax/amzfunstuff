import React, { Component } from 'react'
import {
    Grid, Button, CircularProgress
} from '@material-ui/core'
import { orange, red } from '@material-ui/core/colors'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'
import Products from '../Products'


const styles = theme => ({
    content: {
        marginBottom: 20,
    },
})

  
class MyFavs extends Component {

    render() {
        const { classes } = this.props
        
        let products = <Products category={'myfavs'} subcategory={'dummyvalue'} /> 
        let articles = null

        return <Grid container justify="center" alignItems="center">
                    {products}
                </Grid>
    }
}

export default compose(
    withContext,
    withStyles(styles)
)(MyFavs)