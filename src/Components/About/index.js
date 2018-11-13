import React, { Component } from 'react'
import classNames from 'classnames/bind'
import {
    Icon, TextField, Button, Grid, CircularProgress
} from '@material-ui/core'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'

const styles = theme => ({
    paragraph: {
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
        width: '100%',
    },
    sidebar: {
        [theme.breakpoints.down('sm')]: {
            marginTop: 20,
        },
        marginTop: 70,
    },
    thanksforsubscribing: {
        fontSize: '1rem',
        fontWeight: '900',
        width: '80%',
        height: 80,
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        textAlign: 'center',
        borderRadius: 10,
        
    },
    follower: {
        marginTop: 50,
        height:'100%',
        color: theme.palette.primary.main,
    },
    wechat: {
        marginTop: 20,
        width: '80%',
    },
    iconItem: {
        display: 'inline-block',
        cursor: 'pointer',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '80%',
    },
    button: {
        margin: theme.spacing.unit,
        width: '80%',
        fontSize: '1rem',
        fontWeight: '900',
    },
    buttonProgress: {
        color: theme.palette.primary.main[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
})

  
class About extends Component {

    state = {
        name: null,
        email: null,
        loading: false,
        success: false,
    }

    subscribe = () => {
        if (!this.state.loading) {
          this.setState({ loading: true }),
          setTimeout(() => { this.setState({ loading: false, success: true }) }, 2000)
          setTimeout(() => { this.setState({ success: false }) }, 4000)
        }
    }

    render() {

        const { classes } = this.props
        const { loading, success } = this.state

        const instagram = <div onClick={() => this.props.navToLink('https://www.instagram.com', true)}><Icon className={classNames(classes.iconItem, 'fab fa-instagram')} style={{fontSize:30, marginLeft:10}} /></div>
        const pinterest = <div onClick={() => this.props.navToLink('https://www.pinterest.com', true)}><Icon className={classNames(classes.iconItem, 'fab fa-pinterest')} style={{fontSize:30, marginLeft:10}} /></div>
        const twitter = <div onClick={() => this.props.navToLink('https://www.twitter.com', true)}><Icon className={classNames(classes.iconItem, 'fab fa-twitter')} style={{fontSize:30, marginLeft:10}} /></div>
        const facebook = <div onClick={() => this.props.navToLink('https://www.facebook.com', true)}><Icon className={classNames(classes.iconItem, 'fab fa-facebook')} style={{fontSize:30, marginLeft:10}} /></div>
        const weibo = <div onClick={() => this.props.navToLink('https://www.weibo.com', true)}><Icon className={classNames(classes.headerItem, 'fab fa-weibo')} style={{fontSize:30, marginLeft:10}} /></div>

        const subscriber = success ? 
                            <div className={classes.thanksforsubscribing}>
                                <Grid container direction="column" justify="center" alignItems="center" style={{ height:'100%' }}>
                                    感谢您订阅我们的邮件列表！
                                </Grid>
                            </div> :
                            <div style={{ width:'100%' }}>
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <TextField
                                        required
                                        id="subscriberEmail"
                                        label="邮件地址"
                                        className={classes.textField}
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        margin="dense"
                                        variant="outlined"
                                    />
                                    <TextField
                                        required
                                        id="subscriberName"
                                        label="如何称呼您"
                                        className={classes.textField}
                                        // value={this.state.name}
                                        margin="dense"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid container direction="column" justify="center" alignItems="center" style={{ position: 'relative', width:'100%' }}>
                                    <Button variant="contained" color="primary" className={classes.button} disabled={loading} onClick={this.subscribe}>
                                        订阅我们
                                    </Button>
                                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </Grid>
                            </div>
            
            const follower = <Grid container justify="center" alignItems="center" className={classes.follower}>  
                                {instagram}{pinterest}{twitter}{facebook}{weibo}
                            </Grid>

            const wechat = <Grid container direction="column" justify="center" alignItems="center" style={{ width:'100%' }}>
                                <img src={`/assets/images/wechat.png`} className={classes.wechat}/>
                            </Grid>

        return <Grid container justify="center">
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                <Grid container justify="center">
                    <h3 className={classes.paragraph}>我们是谁</h3>
                    <p className={classes.paragraph}>成吉思汗的骑兵，攻击速度与二十世纪的装甲部队相当；北宋的床弩，射程达一千五百米，与二十世纪的狙击步枪差不多；但这些仍不过是古代的骑兵与弓弩而已，不可能与现代力量抗衡。基础理论决定一切，未来史学派清楚地看到了这一点。而你们，却被回光返照的低级技术蒙住了眼睛。你们躺在现代文明的温床中安于享乐，对即将到来的决定人类命运的终极决战完全没有精神上的准备。</p>
                    <p className={classes.paragraph}>同为军人，知道我们之间最大的区别在哪里吗，你们按照可能的结果来决定自己的行动；而我们，不管结果如何，必须尽责任，这是唯一的机会，所以我就做了。有一颗遥远的星星，是夜空中一个隐约可见的光点，所有随便望了它一眼的人都说，那颗星星是安全的。宇宙很大，生活更大，也许以后还有缘相见。</p>
                    <p className={classes.paragraph}>我知道你作为执剑人的经历，只是想说，你没有错。人类世界选择了你，就是选择了用爱来对待生命和一切，尽管要付出巨大的代价。你实现了那个世界的愿望，实现了那里的价值观，你实现了他们的选择，你真的没有错。</p>
                    <p className={classes.paragraph}>成吉思汗的骑兵，攻击速度与二十世纪的装甲部队相当；北宋的床弩，射程达一千五百米，与二十世纪的狙击步枪差不多；但这些仍不过是古代的骑兵与弓弩而已，不可能与现代力量抗衡。基础理论决定一切，未来史学派清楚地看到了这一点。而你们，却被回光返照的低级技术蒙住了眼睛。你们躺在现代文明的温床中安于享乐，对即将到来的决定人类命运的终极决战完全没有精神上的准备。</p>
                    <p className={classes.paragraph}>同为军人，知道我们之间最大的区别在哪里吗，你们按照可能的结果来决定自己的行动；而我们，不管结果如何，必须尽责任，这是唯一的机会，所以我就做了。有一颗遥远的星星，是夜空中一个隐约可见的光点，所有随便望了它一眼的人都说，那颗星星是安全的。宇宙很大，生活更大，也许以后还有缘相见。</p>
                    <p className={classes.paragraph}>我知道你作为执剑人的经历，只是想说，你没有错。人类世界选择了你，就是选择了用爱来对待生命和一切，尽管要付出巨大的代价。你实现了那个世界的愿望，实现了那里的价值观，你实现了他们的选择，你真的没有错。</p>
                    <p className={classes.paragraph}>成吉思汗的骑兵，攻击速度与二十世纪的装甲部队相当；北宋的床弩，射程达一千五百米，与二十世纪的狙击步枪差不多；但这些仍不过是古代的骑兵与弓弩而已，不可能与现代力量抗衡。基础理论决定一切，未来史学派清楚地看到了这一点。而你们，却被回光返照的低级技术蒙住了眼睛。你们躺在现代文明的温床中安于享乐，对即将到来的决定人类命运的终极决战完全没有精神上的准备。</p>
                    <p className={classes.paragraph}>同为军人，知道我们之间最大的区别在哪里吗，你们按照可能的结果来决定自己的行动；而我们，不管结果如何，必须尽责任，这是唯一的机会，所以我就做了。有一颗遥远的星星，是夜空中一个隐约可见的光点，所有随便望了它一眼的人都说，那颗星星是安全的。宇宙很大，生活更大，也许以后还有缘相见。</p>
                    <p className={classes.paragraph}>我知道你作为执剑人的经历，只是想说，你没有错。人类世界选择了你，就是选择了用爱来对待生命和一切，尽管要付出巨大的代价。你实现了那个世界的愿望，实现了那里的价值观，你实现了他们的选择，你真的没有错。</p>
                </Grid>  
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                <Grid container direction="column" justify="center" alignItems="center" className={classes.sidebar}>
                    {subscriber}
                    {follower}
                    {wechat}
                </Grid> 
            </Grid>
        </Grid>
    }
}

export default compose(
    withContext,
    withStyles(styles)
)(About)