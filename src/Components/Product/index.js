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
        fontSize: '1.1rem',
        fontWeight: '900',
        color: theme.palette.primary.main,
        marginBottom: 3,
        cursor: 'pointer',
        textAlign: 'center',
    },
    titleEN: {
        fontSize: '.7rem',
        fontWeight: '600',
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
    priceIcons: {
        fontSize: '13px',
        marginBottom: 3,
    },
    likeOrNot: {
        fontSize: '10px',
        color: red[500],
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
        fontSize: '.72rem',
        fontWeight: '600',
        color: theme.palette.secondary.main,
        letterSpacing: 1,
        cursor: 'pointer',
    },
    multipleColInfo: {
        marginTop: 13,
        cursor: 'pointer',
    },
    multipleColPrice: {
        fontSize: '.9rem',
        fontWeight: '900',
        marginBottom: 3,
    },
    multipleColLikes: {
        fontSize: '.7rem',
        fontWeight: '800',
        color: theme.palette.secondary.dark,
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
    createProduct = (classes, product, viewWidth, windowWidth, liked, addLiked, removeLiked) => {

        if(windowWidth < 650){
            return this.createSingleColProduct(classes, product, viewWidth)
        }else if(windowWidth < 1280){
            return this.createMultipleColProduct(classes, product, viewWidth, liked, addLiked, removeLiked, 2)
        }else if(windowWidth < 1650){
            return this.createMultipleColProduct(classes, product, viewWidth, liked, addLiked, removeLiked, 3)
        }else{
            return this.createMultipleColProduct(classes, product, viewWidth, liked, addLiked, removeLiked, 4)
        }
    }

    createSingleColProduct = (classes, product, viewWidth) => {

        const viewWidthRatio = 0.85
        const heightToWidthRatio = 250/300
        const maxWidth = 400
        
        const adjustedWidth = viewWidth * viewWidthRatio > maxWidth ? maxWidth : viewWidth * viewWidthRatio
        const adjustedHeight = adjustedWidth * heightToWidthRatio

        const navToLink = product.subcategory != '' ? `/products/${product.category}/${product.subcategory}/${product.id}` : `/products/${product.category}/${product.id}`

        return <Grid item onClick={() => {this.props.logEvent('product', product.titleCN)}}>
                    <Grid container justify="center">
                        <div className={classes.titleCN} onClick={() => {localStorage.setItem(`amzfunstuff-${product.id}`, JSON.stringify(product)), this.props.navToLink(navToLink, true)}} style={{ width:adjustedWidth }}>{product.titleCN}</div>
                        <div className={classes.titleEN} onClick={() => {localStorage.setItem(`amzfunstuff-${product.id}`, JSON.stringify(product)), this.props.navToLink(navToLink, true)}} style={{ width:adjustedWidth }}>{product.titleEN}</div>
                        <div className={classes.singleColImage}>
                            <a href={product.link} rel="nofollow" target="_blank">
                                <img src={`/assets/images/products/${product.id}.jpg`} alt={product.titleCN} style={{ width:adjustedWidth, height:adjustedHeight }}/>
                                <Grid container justify="flex-end" className={classes.singleColShadow}>
                                    <Button variant="contained" className={classes.detailButton} onClick={() => { this.props.navToLink(product.link, true) }}>查看详情</Button>
                                </Grid>
                            </a>
                        </div>
                    </Grid>
                </Grid>
                
    }

    createMultipleColProduct = (classes, product, viewWidth, liked, addLiked, removeLiked, column) => {

        const viewWidthRatio = 0.8
        const heightToWidthRatio = 250/300
        const maxWidth = 400
        
        const adjustedWidth = (viewWidth * viewWidthRatio)/column > maxWidth ? maxWidth : (viewWidth * viewWidthRatio)/column
        const adjustedHeight = adjustedWidth * heightToWidthRatio

        const ifLiked = liked != null && liked.has(product.id)

        const likeButton = ifLiked ?
                            <Grid container justify="flex-end" className={classes.multipleColShadow}>
                                <Button variant="contained" className={classes.likeButton} onClick={(event) => { event.preventDefault(), removeLiked(product.id) }}>移除</Button>
                            </Grid> : 
                            <Grid container justify="flex-end" className={classes.multipleColShadow}>
                                <Button variant="contained" className={classes.likeButton} onClick={(event) => { event.preventDefault(), addLiked(product.id) }}>喜欢</Button>
                            </Grid>

        const likeOrNot = ifLiked ?
                             <div className={classes.multipleColLikes} onClick={() => this.props.navToLink('/myfavs', true)}><span className={classes.likeOrNot}><i className="fas fa-heart"></i></span> {product.likes+1}</div> :
                             <div className={classes.multipleColLikes} onClick={() => this.props.navToLink('/myfavs', true)}><span className={classes.likeOrNot}><i className="far fa-heart"></i></span> {product.likes}</div>
        
        const priceIcons = this.getPriceIcons(product.price, classes)

        const navToLink = product.subcategory != '' ? `/products/${product.category}/${product.subcategory}/${product.id}` : `/products/${product.category}/${product.id}`

        return <Grid item style={{ marginBottom: 20 }} onClick={() => {this.props.logEvent('product', product.titleCN)}}>
                    <Grid container justify="center">
                        <div className={classes.titleCN} onClick={() => {localStorage.setItem(`amzfunstuff-${product.id}`, JSON.stringify(product)), this.props.navToLink(navToLink, true)}} style={{ width:adjustedWidth }}>{product.titleCN}</div>
                        <div className={classes.titleEN} onClick={() => {localStorage.setItem(`amzfunstuff-${product.id}`, JSON.stringify(product)), this.props.navToLink(navToLink, true)}} style={{ width:adjustedWidth }}>{product.titleEN}</div>    
                        <div className={classes.multipleColImage}>
                            <a href={product.link} rel="nofollow" target="_blank">
                                <img src={`/assets/images/products/${product.id}.jpg`} alt={product.titleCN} style={{ width:adjustedWidth, height:adjustedHeight }}/>
                                {likeButton}
                            </a>
                        </div>
                        <div className={classes.multipleColDescription} style={{ width:adjustedWidth, height: adjustedWidth < 280 ? 78 : 65 }}>
                            {product.description}
                        </div>
                        <div className={classes.multipleColInfo}>
                            <Grid container justify="space-between" alignItems="center" style={{ width:adjustedWidth }}>
                                <Grid item>
                                    <div className={classes.multipleColPrice} onClick={() => { this.props.navToLink(product.link, true) }}>{priceIcons}</div>
                                    {likeOrNot}
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" className={classes.detailButton} onClick={() => { this.props.navToLink(product.link, true) }}>查看详情</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
    }

     // convert price to icons
    getPriceIcons = (price, classes) => {

        const dollar = <i className="fas fa-dollar-sign" style={{ marginRight: 2 }}/>
        const coins = <i className="fas fa-coins" style={{ marginRight: 2 }}/>
        const diamond = <i className="far fa-gem" style={{ marginRight: 2 }}/>

        if(price > 0 && price <= 20){
            return <Grid container justify="flex-start" className={classes.priceIcons} style={{ color:'#85bb65' }}>{dollar}</Grid>
        }else if(price > 20 && price <= 40){
            return <Grid container justify="flex-start" className={classes.priceIcons} style={{ color:'#85bb65' }}>{dollar}{dollar}</Grid>
        }else if(price > 40 && price <= 60){
            return <Grid container justify="flex-start" className={classes.priceIcons} style={{ color:'#85bb65' }}>{dollar}{dollar}{dollar}</Grid>
        }else if(price > 60 && price <= 80){
            return <Grid container justify="flex-start" className={classes.priceIcons} style={{ color:'#85bb65' }}>{dollar}{dollar}{dollar}{dollar}</Grid>
        }else if(price > 80 && price <= 100){
            return <Grid container justify="flex-start" className={classes.priceIcons} style={{ color:'#85bb65' }}>{dollar}{dollar}{dollar}{dollar}{dollar}</Grid>
        }else if(price > 100 && price <= 200){
            return <Grid container justify="flex-start" className={classes.priceIcons} style={{ color:'#f7931a' }}>{coins}</Grid>
        }else if(price > 200 && price <= 400){
            return <Grid container justify="flex-start" className={classes.priceIcons} style={{ color:'#f7931a' }}>{coins}{coins}</Grid>
        }else if(price > 400 && price <= 600){
            return <Grid container justify="flex-start" className={classes.priceIcons} style={{ color:'#f7931a' }}>{coins}{coins}{coins}</Grid>
        }else if(price > 600 && price <= 800){
            return <Grid container justify="flex-start" className={classes.priceIcons} style={{ color:'#f7931a' }}>{coins}{coins}{coins}{coins}</Grid>
        }else if(price > 800 && price <= 1000){
            return <Grid container justify="flex-start" className={classes.priceIcons} style={{ color:'#f7931a' }}>{coins}{coins}{coins}{coins}{coins}</Grid>
        }else if(price > 1000 && price <= 2000){
            return <Grid container justify="flex-start" className={classes.priceIcons} style={{ color:'#2196F3' }}>{diamond}</Grid>
        }else if(price > 2000 && price <= 4000){
            return <Grid container justify="flex-start" className={classes.priceIcons} style={{ color:'#2196F3' }}>{diamond}{diamond}</Grid>
        }else if(price > 4000 && price <= 6000){
            return <Grid container justify="flex-start" className={classes.priceIcons} style={{ color:'#2196F3' }}>{diamond}{diamond}{diamond}</Grid>
        }else if(price > 6000 && price <= 8000){
            return <Grid container justify="flex-start" className={classes.priceIcons} style={{ color:'#2196F3' }}>{diamond}{diamond}{diamond}{diamond}</Grid>
        }else if(price > 8000){
            return <Grid container justify="flex-start" className={classes.priceIcons} style={{ color:'#2196F3' }}>{diamond}{diamond}{diamond}{diamond}{diamond}</Grid>
        }
    }

    render() {

        const { classes, product, viewWidth, windowWidth, liked, addLiked, removeLiked } = this.props
        
        const content = this.createProduct(classes, product, viewWidth, windowWidth, liked, addLiked, removeLiked)

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