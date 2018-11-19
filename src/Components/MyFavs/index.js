import React, { Component } from 'react'
import classNames from 'classnames/bind'
import {
    Grid, Paper, Tabs, Tab, Icon,
} from '@material-ui/core'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Products from '../Products'
import Articles from '../Articles'


const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 20,
        width: '80%',
    },
    content: {
        marginTop: 30,
        width: '100%',
    },
    note: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        fontSize: '.8rem',
        fontWeight: 600,
        color: theme.palette.secondary.main,
    },
})

  
class MyFavs extends Component {

    state = {
        value: 0,
    }

    handleChange = (event, value) => {
        this.setState({ value });
    }

    getFavs = (value, classes) => {
        let content = null
        if(value == 0){
            content = <div className={classes.content}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <div className={classes.note}>如果您使用手机或平板电脑，在主页面会看不到“喜欢”按钮，请点击产品标题进入详细页面进行操作</div>
                            <div className={classes.note}>本页中的数据依赖于缓存，如果您使用了不同的设备或者清除过缓存，则可能无法看到之前保存的记录</div>
                            <Products category={'myfavs'} subcategory={'dummyvalue'} /> 
                        </Grid>
                    </div>
        }else if(value == 1){
            content = <div className={classes.content}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <div className={classes.note}>如果您使用手机或平板电脑，在主页面会看不到“喜欢”按钮，请点击产品标题进入详细页面进行操作</div>
                            <div className={classes.note}>本页中的数据依赖于缓存，如果您使用了不同的设备或者清除过缓存，则可能无法看到之前保存的记录</div>
                            <Articles type={'blogs'} /> 
                        </Grid>
                    </div>
        }else{
            content = <div className={classes.content}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <div className={classes.note}>如果您使用手机或平板电脑，在主页面会看不到“喜欢”按钮，请点击产品标题进入详细页面进行操作</div>
                            <div className={classes.note}>本页中的数据依赖于缓存，如果您使用了不同的设备或者清除过缓存，则可能无法看到之前保存的记录</div>
                            <Articles type={'guides'} /> 
                        </Grid>
                    </div> 
        }
        return content
    }

    render() {
        const { classes } = this.props
        const { value } = this.state
        
        let content = this.getFavs(value, classes)
            
        let articles = null

        const productsIcon = <Icon className={classNames('fas fa-fire')} style={{fontSize:30}} />
        const blogsIcon = <Icon className={classNames('fas fa-pen-fancy')} style={{fontSize:30}} />
        const guidesIcon = <Icon className={classNames('fab fa-glide-g')} style={{fontSize:30}} />

        return <Grid container justify="center" alignItems="center">
                    <Paper className={classes.root}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab icon={productsIcon} />
                            <Tab icon={blogsIcon} />
                            <Tab icon={guidesIcon} />
                        </Tabs>
                    </Paper>
                    {content}
                </Grid>
    }
}

export default compose(
    withStyles(styles)
)(MyFavs)