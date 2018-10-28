import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
    Grid, Hidden, FormControl, Select, MenuItem, CircularProgress
} from '@material-ui/core'
import { Slider } from 'material-ui-slider'
import Product from '../Product'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import axios from "axios"

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
})

  
class Articles extends Component {

    state = {

    }

    componentDidMount() {

    }

    componentWillUnmount(){
    }



    render() { 
        const { classes } = this.props
        
        return <div className={classes.root}>
                    blogs
                </div>
    }
}

export default compose(
    withRouter,
    withStyles(styles)
)(Articles)