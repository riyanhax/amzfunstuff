import React, { Component } from 'react'
import classNames from 'classnames/bind'
import {
    Icon, TextField, Button, Grid, CircularProgress
} from '@material-ui/core'
import Recaptcha from 'react-recaptcha'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'
import Footer from '../Footer'

const styles = theme => ({
    paragraph: {
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            marginLeft: 0,
            marginRight: 0,
        },
        width: '100%',
        marginLeft: 30,
        marginRight: 30,
    },
    sidebar: {
        [theme.breakpoints.down('sm')]: {
            marginTop: 20,
        },
        marginTop: 70,
    },
    thanksnote: {
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
        width: '60%',
    },
    email: {
        marginTop: 50,
        height:'100%',
        color: theme.palette.primary.main,
    },
    iconItem: {
        display: 'inline-block',
        cursor: 'pointer',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: 2 * theme.spacing.unit,
        width: '80%',
    },
    button: {
        marginTop: 2 * theme.spacing.unit,
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
    rechaptchaError: {
        fontSize: '.6rem',
        fontWeight: '700',
        color: 'red',
        textAlign: 'center',
        marginBottom: theme.spacing.unit,
    }
})

  
class About extends Component {

    state = {
        subscriber_name: '',
        subscriber_email: '',

        subscriber_name_error: false,
        subscriber_email_error: false,

        subscriber_name_too_long: false,
        subscriber_email_too_long: false,

        subscriber_loading: false,
        subscriber_success: false,

        recaptcha_verified: false,
        recaptcha_verify_error: false,
    }

    componentDidMount() {
        this.props.logPageView('about')
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    validateNull = (value) => {
        if(typeof value == 'undefined' || value == null || value == ''){
            return false
        }else{
            return true 
        }
    }

    validateLength = (value, length) => {
        if(value.length > length){
            return false
        }else{
            return true 
        }
    }

    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
    }

    subscribe = () => {
        let subscriberNameHasError = false
        let subscriberEmailHasError = false

        let subscriberNameTooLong = false
        let subscriberEmailTooLong = false

        // check subscriber_name null or not
        if(!this.validateNull(this.state.subscriber_name)){
            this.setState({ subscriber_name_error: true })
            subscriberNameHasError = true
        }else{
            this.setState({ subscriber_name_error: false })
            subscriberNameHasError = false
        }

        // check subscriber_email null or not || valid email format or not
        if(!this.validateNull(this.state.subscriber_email) || !this.validateEmail(this.state.subscriber_email)){
            this.setState({ subscriber_email_error: true })
            subscriberEmailHasError = true
        }else{
            this.setState({ subscriber_email_error: false })
            subscriberEmailHasError = false
        }

        // check subscriber_name if too long
        if(!this.validateLength(this.state.subscriber_name, 40)){
            this.setState({ subscriber_name_too_long: true })
            subscriberNameTooLong = true
        }else{
            this.setState({ subscriber_name_too_long: false })
            subscriberNameTooLong = false
        }

        // check subscriber_email if too long
        if(!this.validateLength(this.state.subscriber_email, 40)){
            this.setState({ subscriber_email_too_long: true })
            subscriberEmailTooLong = true
        }else{
            this.setState({ subscriber_email_too_long: false })
            subscriberEmailTooLong = false
        }

        if(subscriberNameHasError || subscriberEmailHasError || subscriberNameTooLong || subscriberEmailTooLong){
            return
        }

         // validation pass, proceed with recaptcha check
         if(!this.state.recaptcha_verified){
            this.setState({ recaptcha_verify_error: true })
            return 
        }else{
            this.setState({ recaptcha_verify_error: false })
        }

        // rechaptcha pass, proceed with data saving
        if (!this.state.subscriber_loading) {
            this.setState({ subscriber_loading: true })

            const subscriberListRef = firebase.database().ref().child('subscriberList')
            const newSubscriber = subscriberListRef.push()
            newSubscriber.set({
                name: this.state.subscriber_name,
                email: this.state.subscriber_email
            })

            setTimeout(() => { this.setState({ subscriber_loading: false, subscriber_success: true }) }, 2000)
            setTimeout(() => { this.setState({ subscriber_name: '', subscriber_email: '', subscriber_success: false }) }, 4000)
        }
    }

    recaptchaOnLoad = () => {
        // do nothing
    }

    recaptchaVerify = (response) => {
        if(response){
            this.setState({ recaptcha_verified: true })
        }
    }

    render() {

        const { classes } = this.props
        const { 
            subscriber_name,
            subscriber_email,

            subscriber_name_error,
            subscriber_email_error,

            subscriber_name_too_long,
            subscriber_email_too_long,

            subscriber_loading, 
            subscriber_success, 

            recaptcha_verify_error
         } = this.state

        const tumblr = <div onClick={() => this.props.navToLink('https://www.tumblr.com', true)}><Icon className={classNames(classes.iconItem, 'fab fa-tumblr-square')} style={{fontSize:30, marginLeft:10}} /></div>
        const twitter = <div onClick={() => this.props.navToLink('https://www.twitter.com', true)}><Icon className={classNames(classes.iconItem, 'fab fa-twitter-square')} style={{fontSize:30, marginLeft:10}} /></div>
        const facebook = <div onClick={() => this.props.navToLink('https://www.facebook.com', true)}><Icon className={classNames(classes.iconItem, 'fab fa-facebook-square')} style={{fontSize:30, marginLeft:10}} /></div>
        const weibo = <div onClick={() => this.props.navToLink('https://www.weibo.com', true)}><Icon className={classNames(classes.iconItem, 'fab fa-weibo')} style={{fontSize:30, marginLeft:10}} /></div>

        const follower = <Grid container justify="center" alignItems="center" className={classes.follower}>  
                                {tumblr}{twitter}{facebook}{weibo}
                            </Grid>

        const wechat = <Grid container direction="column" justify="center" alignItems="center">
                            <img src={`/assets/images/ads/QR.jpg`} className={classes.wechat}/>
                        </Grid>

        const recaptcha = recaptcha_verify_error ? 
                        <Grid container direction="column" justify="center" alignItems="center">
                            <div className={classes.rechaptchaError}>请点击下面方块证明你不是机器人</div>
                            <Recaptcha
                                sitekey="6LeVl44UAAAAAMWiMSxkYXPr338m_xAEEObKlMqW"
                                render="explicit"
                                onloadCallback={this.recaptchaOnLoad}
                                verifyCallback={this.recaptchaVerify}
                            />
                        </Grid> : 
                        <Grid container direction="column" justify="center" alignItems="center">
                            <Recaptcha
                                sitekey="6LeVl44UAAAAAMWiMSxkYXPr338m_xAEEObKlMqW"
                                render="explicit"
                                onloadCallback={this.recaptchaOnLoad}
                                verifyCallback={this.recaptchaVerify}
                            />
                        </Grid>

        const subscriber = subscriber_success ? 
                            <div className={classes.thanksnote}>
                                <Grid container direction="column" justify="center" alignItems="center" style={{ height:'100%' }}>
                                    感谢订阅我们的邮件列表！
                                </Grid>
                            </div> :
                            <div style={{ width:'100%' }} id="wechat">
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <TextField
                                        error={subscriber_name_error || subscriber_name_too_long}
                                        required
                                        id="subscriberName"
                                        label= {subscriber_name_too_long ? "请勿超过40字" : "请问如何称呼您"}
                                        className={classes.textField}
                                        margin="dense"
                                        variant="outlined"
                                        onChange={this.handleChange('subscriber_name')}
                                        value={subscriber_name}
                                    />
                                    <TextField
                                        error={subscriber_email_error || subscriber_email_too_long}
                                        required
                                        id="subscriberEmail"
                                        label= {subscriber_email_too_long ? "请勿超过40字" : "请输入邮件地址"}
                                        className={classes.textField}
                                        type="email"
                                        margin="dense"
                                        variant="outlined"
                                        onChange={this.handleChange('subscriber_email')}
                                        value={subscriber_email}
                                    />
                                </Grid>
                                {recaptcha}
                                <Grid container direction="column" justify="center" alignItems="center" style={{ position: 'relative', width:'100%' }}>
                                    <Button variant="contained" color="primary" className={classes.button} disabled={subscriber_loading} onClick={this.subscribe}>
                                        订阅我们
                                    </Button>
                                    
                                    {subscriber_loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </Grid>
                            </div>

        return <Grid container justify="center">
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                <Grid container justify="center">
                    <h3 className={classes.paragraph}>我们是谁</h3>
                    <p className={classes.paragraph}><strong>无用之趣</strong> 是一个免费的线上购物指南，由一群志同道合的朋友们一起在闲暇时运营。</p>
                    <p className={classes.paragraph}>我们的遵旨很简单，找到有趣的东西，放在网上和你分享。</p>
                    <h5 className={classes.paragraph}>Disclaimer</h5>
                    <p className={classes.paragraph}>We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for us to earn fees by linking to Amazon.com and affiliated sites.</p>
                </Grid>  
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                <Grid container direction="column" justify="center" alignItems="center" className={classes.sidebar}>
                    {subscriber}
                    {follower}
                    {wechat}
                </Grid> 
            </Grid>
            <Footer/>
        </Grid>
    }
}

export default compose(
    withContext,
    withStyles(styles)
)(About)