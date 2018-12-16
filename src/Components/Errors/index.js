import React, { Component } from 'react'
import {
    Grid
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import Footer from '../Footer'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: '5%',
        marginRight: '5%',
    },
    topMessage: {
        marginTop: 20,
        fontSize: '.8rem',
        fontWeight: 600,
        color: theme.palette.secondary.main,
    },
    middleMessage: {
        marginTop: 20,
        fontSize: '.8rem',
        fontWeight: 650,
        textDecoration: 'underline',
        color: theme.palette.primary.dark,
        cursor: 'pointer',
    },
    bottomMessage: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: '1.2rem',
        fontWeight: 900,
        color: red[800],
        cursor: 'pointer',
    }
})

class Errors extends Component {

    render() {

        const { classes } = this.props
        const viewWidth = window.innerWidth >= 960 ? window.innerWidth - 240 : window.innerWidth
        const adjustedWidth = viewWidth * 0.5

        const content = <Grid container direction="column" justify="center" alignItems="center">
                            <div className={classes.topMessage}>
                                你发送的页面请求已被1379号监听站截获了
                            </div>
                            <div className={classes.middleMessage} onClick={() => { this.props.navToLink('/', false) }}>
                                <span>请点击回到主页面</span>
                            </div>
                            <div className={classes.bottomMessage} onClick={() => { this.props.navToLink('https://www.amazon.com/dp/B00SEQM6U4', true) }}>
                                不要回答! 不要回答! 不要回答!
                            </div>
                            <a href="https://www.amazon.com/dp/1449480470" rel="nofollow" target="_blank"> 
                                <img src={`/assets/images/ads/404.jpg`} alt="404 Not Found" style={{ width:adjustedWidth }}/>
                            </a>
                        </Grid>

        return <div className={classes.root}>
                    {content}
                    <Footer/>
                </div>
        
    }
}

export default compose(
    withContext,
    withStyles(styles)
)(Errors)
