import React, { Component } from 'react'
import classNames from 'classnames/bind'
import {
    Icon, Grid
} from '@material-ui/core'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    footer: {
        marginTop: 40,
    },
    iconItem: {
        display: 'inline-block',
        cursor: 'pointer',
    },
    name: {
        color: '#00796B',
        textDecoration: 'underline',
        fontWeight: 900,
        fontSize: '.8rem',
        marginLeft: 3,
        marginRight: 6,
    },
    copyright: {
        fontWeight: 600,
        fontSize: '.8rem',
        marginLeft: 3,
        marginRight: 6,
    },

})

  
class Footer extends Component {

    render() {

        const { classes } = this.props
       
        return <Grid container justify="center" className={classes.footer}>
            <div><a href="/"><Icon className={classNames(classes.iconItem, 'fas fa-heart')} style={{ fontSize:10, color:'red' }} /><span className={classes.name}>奇葩好物</span></a><Icon className={classNames(classes.iconItem, 'far fa-copyright')} style={{ fontSize:10 }} /><span className={classes.copyright}> 2018-2019</span></div>
        </Grid>
    }
}

export default compose(
    withStyles(styles)
)(Footer)