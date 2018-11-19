import React, { Component } from 'react'
import {
    Grid, Button
} from '@material-ui/core'
import { orange, red } from '@material-ui/core/colors'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'

const styles = theme => ({
    // generic css
    detailButton: {
        color: '#fff',
        backgroundColor: orange[500],
        '&:hover': {
            backgroundColor: orange[800],
          },
        fontSize: '1rem',
        fontWeight: '900',
    },
    likeButton: {
        color: '#fff',
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[800],
          },
        fontSize: '1rem',
        fontWeight: '900',
    },
    // single col css
    singleColImage: {
        marginBottom: 25,
        position: 'relative',
    },
    singleColTitle: {
        // fontSize: '1.3rem',
        fontWeight: '900',
        color: '#fff',
        textShadow: `2px 2px 2px #222`,
    },
    singleColTitleShadow: {
        position: 'absolute',
        top: '30%',
        background: 'transparent',
        width: '100%',
        padding: 20,
    },
    singleColButtonShadow: {
        position: 'absolute',
        bottom: 0,
        background: 'transparent',
        width: '100%',
        padding: 20,
    },
    // multiple col css
    multipleColImage: {
        marginBottom: 5,
        position: 'relative',
        "&:hover $multipleColShadow": {
            visibility: 'visible',
        },
    },
    multipleColShadow: {
        position: 'absolute',
        top: 0,
        background: 'transparent',
        width: '100%',
        padding: 20,
        visibility: 'hidden',
    },
    multipleColTitle: {
        fontSize: '1.1rem',
        fontWeight: '900',
        color: theme.palette.primary.main,
        letterSpacing: .7,
        cursor: 'pointer',
    },
    multipleColSummary: {
        overflowWrap: 'break-word',
        fontSize: '.75rem',
        fontWeight: '400',
        lineHeight: 1.5,
        color: '#000000',
        letterSpacing: .9,
        marginTop: 5,
        paddingBottom: 10,
        borderBottom: `1px solid #ccc`,
        cursor: 'pointer',
    },
    multipleColInfo: {
        fontSize: '.6rem',
        fontWeight: '800',
        marginTop: 5,
        color: theme.palette.primary.main,
    }
})

  
class Article extends Component {

    /* 
        < 650 : 1 col 
        < 1280 : 2 col
        < 1650 : 3 col 

        1. 'windowWidth' would match material-ui's breakpoints, however, due to the fact that drawer would display after 960, the viewWidth is actually used when calculating item's width and height
        2. we will use localStorage to pass product info to detail page, the key is 'amzfunstuff-{productId}', and the value is stringified product info
    */
   createArticles = (classes, article, viewWidth, windowWidth, liked, addLiked) => {

        if(viewWidth < 650){
            return this.createSingleColArticle(classes, article, viewWidth)
        }else if(windowWidth < 1280){
            return this.createMultipleColArticle(classes, article, viewWidth, liked, addLiked, 2)
        }else if(windowWidth < 1650){
            return this.createMultipleColArticle(classes, article, viewWidth, liked, addLiked, 2)
        }else{
            return this.createMultipleColArticle(classes, article, viewWidth, liked, addLiked, 3)
        }
    }

    createSingleColArticle = (classes, article, viewWidth) => {

        const viewWidthRatio = 0.85
        const heightToWidthRatio = 350/525
        const maxWidth = 525
        
        const adjustedWidth = viewWidth * viewWidthRatio > maxWidth ? maxWidth : viewWidth * viewWidthRatio
        const adjustedHeight = adjustedWidth * heightToWidthRatio

        const adjustedFontSize = viewWidth < 350 ? '1rem' : '1.3rem'

        return <Grid item>
                    <Grid container justify="center">
                        <div className={classes.singleColImage}>
                            <a href={article.link} rel="nofollow" target="_blank">
                                <img src={`/articles/covers/${article.image}.jpg`} alt={article.title} style={{ width:adjustedWidth, height:adjustedHeight }}/>
                                <Grid container justify="center" className={classes.singleColTitleShadow}>
                                    <div className={classes.singleColTitle} style={{ fontSize:adjustedFontSize }}>{article.title}</div>
                                </Grid>
                                <Grid container justify="flex-end" className={classes.singleColButtonShadow}>
                                    <Button variant="contained" className={classes.detailButton} onClick={() => { this.props.navToLink(article.link, true) }}>查看详情</Button>
                                </Grid>
                            </a>
                        </div>
                    </Grid>
                </Grid>
                
    }

    createMultipleColArticle = (classes, article, viewWidth, liked, addLiked, column) => {

        const viewWidthRatio = 0.8
        const heightToWidthRatio = 350/525
        const maxWidth = 525
        
        const adjustedWidth = (viewWidth * viewWidthRatio)/column > maxWidth ? maxWidth : (viewWidth * viewWidthRatio)/column
        const adjustedHeight = adjustedWidth * heightToWidthRatio

        const likeOrNot = liked != null && liked.has(article.id) ?
                             <div className={classes.multipleColLikes}><span style={{fontSize:'10px', color:'red'}}><i className="fas fa-heart"></i></span> {article.likes+1}</div> :
                             <div className={classes.multipleColLikes}><span style={{fontSize:'10px'}}><i className="far fa-heart"></i></span> {article.likes}</div>

        return <Grid item style={{ marginBottom: 20 }}>
                    <Grid container justify="center">
                        <div className={classes.multipleColImage}>
                            <a href={article.link} rel="nofollow" target="_blank">
                                <img src={`/articles/covers/${article.image}.jpg`} alt={article.title} style={{ width:adjustedWidth, height:adjustedHeight }}/>
                                <Grid container justify="flex-end" className={classes.multipleColShadow}>
                                    <Button variant="contained" className={classes.likeButton} onClick={(event) => { event.preventDefault(), addLiked(article.id) }}>喜欢</Button>
                                </Grid>
                            </a>
                        </div>
                        <Grid container direction="column" justify="center" alignItems="center" style={{ width:adjustedWidth }}>
                            <div className={classes.multipleColTitle} onClick={() => {this.props.navToLink(`${article.link}`, true)}}>
                                {article.title}
                            </div>
                            <div className={classes.multipleColSummary} style={{ width:adjustedWidth - 20 }} onClick={() => {this.props.navToLink(`${article.link}`, true)}}>
                                {article.summary}
                            </div>
                            <div className={classes.multipleColInfo} style={{ width:adjustedWidth - 20 }}>
                                <Grid container justify="space-around" alignItems="center">
                                    <Grid item>
                                        {likeOrNot}
                                    </Grid>
                                    <Grid item>
                                        <div>{article.date}</div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
    }

    render() {

        const { classes, article, viewWidth, windowWidth, liked, addLiked } = this.props
        
        const content = this.createArticles(classes, article, viewWidth, windowWidth, liked, addLiked)

        return <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
                    <Grid container justify="center">
                        {content}
                    </Grid>  
                </Grid>
    }
}

export default compose(
    withContext,
    withStyles(styles)
)(Article)