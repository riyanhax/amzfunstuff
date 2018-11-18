import React, { Component } from 'react'
import classNames from 'classnames/bind'
import {
    Icon, Grid, Hidden
} from '@material-ui/core'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'

const drawerWidth = 240

const styles = theme => ({
    header: {
        flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            marginLeft: drawerWidth
        },
        marginLeft: 10,
    },
    headerItem: {
        display: 'inline-block',
        cursor: 'pointer',
    },
    vertical: {
        height: 20,
        width: .5,
        backgroundColor: 'white',
        opacity: 0.5,
        marginLeft: 10,
        marginRight: 10,
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: '900',
    },
})

  
class Header extends Component {

    render() {

        const { classes } = this.props

        // used to construct header
        const logo = <div onClick={() => this.props.navToLink('/', false)}><Icon className={classNames(classes.headerItem, 'fas fa-hamsa')} style={{fontSize:30}}/></div>
        const vertical = <div className={classNames(classes.headerItem, classes.vertical)}></div>
        const title = <div className={classNames(classes.headerItem, classes.title)} onClick={() => this.props.navToLink('/', false)}>奇葩好物</div>

        const instagram = <div onClick={() => this.props.navToLink('https://www.instagram.com', true)}><Icon className={classNames(classes.headerItem, 'fab fa-instagram')} style={{fontSize:15, marginLeft:10}} /></div>
        const pinterest = <div onClick={() => this.props.navToLink('https://www.pinterest.com', true)}><Icon className={classNames(classes.headerItem, 'fab fa-pinterest')} style={{fontSize:15, marginLeft:10}} /></div>
        const twitter = <div onClick={() => this.props.navToLink('https://www.twitter.com', true)}><Icon className={classNames(classes.headerItem, 'fab fa-twitter')} style={{fontSize:15, marginLeft:10}} /></div>
        const facebook = <div onClick={() => this.props.navToLink('https://www.facebook.com', true)}><Icon className={classNames(classes.headerItem, 'fab fa-facebook')} style={{fontSize:15, marginLeft:10}} /></div>
        const weibo = <div onClick={() => this.props.navToLink('https://www.weibo.com', true)}><Icon className={classNames(classes.headerItem, 'fab fa-weibo')} style={{fontSize:15, marginLeft:10}} /></div>
        const wechat = <div onClick={() => this.props.navToLink('/about#wechat', true)}><Icon className={classNames(classes.headerItem, 'fab fa-weixin')} style={{fontSize:15, marginLeft:10}} /></div>

        return <Grid container className={classes.header}>   
                    <Grid item xs={8}>
                        <Grid container alignItems="center">  
                        {logo}{vertical}{title}
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container justify="flex-end" alignItems="center" style={{height:'100%'}}>  
                            <Hidden xsDown>{instagram}{pinterest}{twitter}{facebook}{weibo}{wechat}</Hidden>  
                        </Grid>
                    </Grid>
                </Grid>
    }
}

export default compose(
    withContext,
    withStyles(styles)
)(Header)