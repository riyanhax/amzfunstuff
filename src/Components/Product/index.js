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
    titleCN: {
        fontSize: '1rem',
        fontWeight: '900',
        color: theme.palette.primary.main,
        marginBottom: 3,
        cursor: 'pointer',
        textAlign: 'center',
    },
    titleEN: {
        fontSize: '.6rem',
        fontWeight: '400',
        color: '#000000',
        marginBottom: 10,
        cursor: 'pointer',
        textAlign: 'center',
    },
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
    singleColShadow: {
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
    multipleColDescription: {
        overflowWrap: 'break-word',
        fontSize: '.7rem',
        fontWeight: '400',
        color: '#000000',
        letterSpacing: .9,
    },
    multipleColInfo: {
        marginTop: 10,
    },
    multipleColPrice: {
        fontSize: '.9rem',
        fontWeight: '900',
    },
    multipleColLikes: {
        fontSize: '.8rem',
        fontWeight: '400',
    },
})

  
class Product extends Component {

    /* 
        < 650 : 1 col 
        < 1280 : 2 col
        < 1650 : 3 col 

        1. 'windowWidth' would match material-ui's breakpoints, however, due to the fact that drawer would display after 960, the viewWidth is actually used when calculating item's width and height
        2. we will use localStorage to pass product info to detail page, the key is 'amzfunstuff-{productId}', and the value is stringified product info
    */
    createProduct = (classes, product, viewWidth, windowWidth) => {

        if(windowWidth < 650){
            return this.createSingleColProduct(classes, product, viewWidth)
        }else if(windowWidth < 1280){
            return this.createMultipleColProduct(classes, product, viewWidth, 2)
        }else if(windowWidth < 1650){
            return this.createMultipleColProduct(classes, product, viewWidth, 3)
        }else{
            return this.createMultipleColProduct(classes, product, viewWidth, 4)
        }
    }

    createSingleColProduct = (classes, product, viewWidth) => {

        const viewWidthRatio = 0.85
        const heightToWidthRatio = 250/300
        const maxWidth = 400
        
        const adjustedWidth = viewWidth * viewWidthRatio > maxWidth ? maxWidth : viewWidth * viewWidthRatio
        const adjustedHeight = adjustedWidth * heightToWidthRatio

        return <Grid item>
                    <Grid container justify="center">
                        <div className={classes.titleCN} onClick={() => {localStorage.setItem(`amzfunstuff-${product.id}`, JSON.stringify(product)), this.props.navToLink(`/products/${product.id}`, true)}} style={{ width:adjustedWidth }}>{product.titleCN}-{product.id}</div>
                        <div className={classes.titleEN} onClick={() => {localStorage.setItem(`amzfunstuff-${product.id}`, JSON.stringify(product)), this.props.navToLink(`/products/${product.id}`, true)}} style={{ width:adjustedWidth }}>{product.titleEN}-{product.id}</div>
                        <div className={classes.singleColImage}>
                            <a href={product.link} rel="nofollow" target="_blank">
                                <img src={`/assets/images/${product.imageSmall}.jpg`} alt={product.titleCN} style={{ width:adjustedWidth, height:adjustedHeight }}/>
                                <Grid container justify="flex-end" className={classes.singleColShadow}>
                                    <Button variant="contained" className={classes.detailButton} onClick={(event) => { event.preventDefault(), localStorage.setItem(`amzfunstuff-${product.id}`, JSON.stringify(product)), this.props.navToLink(`/products/${product.id}`, true) }}>查看详情</Button>
                                </Grid>
                            </a>
                        </div>
                    </Grid>
                </Grid>
                
    }

    createMultipleColProduct = (classes, product, viewWidth, column) => {

        const viewWidthRatio = 0.8
        const heightToWidthRatio = 250/300
        const maxWidth = 400
        
        const adjustedWidth = (viewWidth * viewWidthRatio)/column > maxWidth ? maxWidth : (viewWidth * viewWidthRatio)/column
        const adjustedHeight = adjustedWidth * heightToWidthRatio

        return <Grid item style={{ marginBottom: 20 }}>
                    <Grid container justify="center">
                        <div className={classes.titleCN} onClick={() => {localStorage.setItem(`amzfunstuff-${product.id}`, JSON.stringify(product)), this.props.navToLink(`/products/${product.id}`, true)}} style={{ width:adjustedWidth }}>{product.titleCN}-{product.id}</div>
                        <div className={classes.titleEN} onClick={() => {localStorage.setItem(`amzfunstuff-${product.id}`, JSON.stringify(product)), this.props.navToLink(`/products/${product.id}`, true)}} style={{ width:adjustedWidth }}>{product.titleEN}-{product.id}</div>    
                        <div className={classes.multipleColImage}>
                            <a href={product.link} rel="nofollow" target="_blank">
                                <img src={`/assets/images/${product.imageSmall}.jpg`} alt={product.titleCN} style={{ width:adjustedWidth, height:adjustedHeight }}/>
                                <Grid container justify="flex-end" className={classes.multipleColShadow}>
                                    <Button variant="contained" className={classes.likeButton} onClick={(event) => { event.preventDefault(), console.log('like')}}>喜欢</Button>
                                </Grid>
                            </a>
                        </div>
                        <div className={classes.multipleColDescription} style={{ width:adjustedWidth }}>
                            {product.description}
                        </div>
                        <div className={classes.multipleColInfo}>
                            <Grid container justify="space-between" alignItems="center" style={{ width:adjustedWidth }}>
                                <Grid item>
                                    <div className={classes.multipleColPrice}><span style={{fontSize:'12px'}}><i className="fas fa-dollar-sign"></i></span> {product.price}</div>
                                    <div className={classes.multipleColLikes}><span style={{fontSize:'10px'}}><i className="far fa-heart"></i></span> {product.likes}</div>
                                </Grid>
                               
                                <Grid item>
                                    <Button variant="contained" className={classes.detailButton} onClick={(event) => { event.preventDefault(), localStorage.setItem(`amzfunstuff-${product.id}`, JSON.stringify(product)), this.props.navToLink(`/products/${product.id}`, true) }}>查看详情</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
    }

    render() {

        const { classes, product, viewWidth, windowWidth } = this.props
        
        const content = this.createProduct(classes, product, viewWidth, windowWidth)

        return <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                    <Grid container justify="center">
                        {content}
                    </Grid>  
                </Grid>
    }
}

export default compose(
    withContext,
    withStyles(styles)
)(Product)