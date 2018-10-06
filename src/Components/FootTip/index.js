import React, { Component } from 'react'
import classNames from 'classnames/bind'
import {
    Icon, Grid
} from '@material-ui/core'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'

const styles = theme => ({
    foottip: {
        flexGrow: 1,
        backgroundColor: '#ce5829',
        position: 'fixed',
        borderTopLeftRadius: '40%',
        cursor: 'pointer',
        bottom: '0',
        right: 80,
        height: 45,
        width: 130,
        boxShadow: `0 -7px 7px -6px ${theme.palette.secondary.main}`,
        '&:hover': {
            height: 50,
            color: 'white',
            fontWeight: '900',
        },
        color: 'white',
        fontSize: '1rem',
        fontWeight: '600',
    },
    foottipItem: {
        display: 'inline-block',
    },
})

  
class FootTip extends Component {

    render() {

        const { classes } = this.props

        const info = <div onClick={() => this.props.navToLink('/about', false)}><div className={classes.foottipItem}>关于我们</div><Icon className={classNames(classes.foottipItem, 'far fa-comment-dots')} style={{fontSize:15, marginLeft:10}} /></div>
        return <Grid container justify="center" alignItems="center" className={classes.foottip}>
                    {info}
               </Grid>
    }
}

export default compose(
    withContext,
    withStyles(styles)
)(FootTip)