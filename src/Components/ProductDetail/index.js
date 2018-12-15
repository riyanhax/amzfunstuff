import React, { Component } from 'react'
import {
    Grid, Button, CircularProgress
} from '@material-ui/core'
import { orange, red } from '@material-ui/core/colors'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'
import Products from '../Products'
import axios from "axios"

const styles = theme => ({
    content: {
        marginBottom: 20,
    },
    share: {
        marginTop: 20,
    },
    titleCN: {
        fontSize: '1.2rem',
        fontWeight: '900',
        color: theme.palette.primary.main,
        marginTop: 10,
        cursor: 'pointer',
        textAlign: 'center',
    },
    titleEN: {
        fontSize: '.8rem',
        fontWeight: '600',
        color: '#000000',
        marginTop: 10,
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
        marginBottom: 2,
    },
    description: {
        marginTop: 10,
        overflowWrap: 'break-word',
        fontSize: '.85rem',
        fontWeight: '400',
        color: '#000000',
        letterSpacing: .9,
    },
    priceAndLikes: {
        marginTop: 10,
        fontSize: '1.2rem',
        fontWeight: '900',
    },
    buttonDiv: {
        marginTop: 10,
    },
    ad: {
        width: '100%',
        height: 'auto',
        marginBottom: 20,
    },
    image: {
        position: 'relative',
    },
    imageShadow: {
        position: 'absolute',
        top: 0,
        background: 'transparent',
        width: '100%',
        padding: 20,
    },
    imageTitleCN: {
        fontSize: '1.8rem',
        fontWeight: '900',
        color: '#fff',
        textShadow: `2px 2px 2px #222`,
    },
    imageTitleEN: {
        fontSize: '1.2rem',
        fontWeight: '600',
        color: '#fff',
        textShadow: `2px 2px 2px #222`,
        marginLeft: 20,
    },
    related: {
        marginTop: 20,
        fontSize: '.9rem',
        fontWeight: '600',
        letterSpacing: .8,
    }
})

  
class ProductDetail extends Component {

    state = {
        viewWidth: window.innerWidth >= 960 ? window.innerWidth - 240 : window.innerWidth,
        liked: null,
        product: null,
    }

    componentDidMount() {
        this.loadLiked()
        window.addEventListener("resize", this.handleResize)

        const links= window.location.href.split('/')
        const category = links[links.length-3]
        const subcategory = links[links.length-2]
        const productId = links[links.length-1]

        let product = JSON.parse(localStorage.getItem(`amzfunstuff-${productId}`))

        if(product == null){
            this.loadProduct(category, subcategory, productId)
        }else{
            this.setState({ product })
        }
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.handleResize)
    }

    // load product
    loadProduct = async (category, subcategory, productId) => {
        // load products
        let productsURL = `/assets/products/${category}/${subcategory}`
        let next = true
        let counter = 1
        let products = []
        while(next){
            const content = await axios.get(`${productsURL}/${counter}.json`)
            products = content.data.products.concat(products)
            counter++
            next = content.data.next
        }

        // find product
        const product = products.find((product) => {
            return product.id == productId
        })
        if(product == null){
            this.setState({ product:'not found' })
        }else{
            localStorage.setItem(`amzfunstuff-${product.id}`, JSON.stringify(product))
            this.setState({ product })
        }
    }

    // load liked set
    loadLiked = () => {
        const liked = new Set(JSON.parse(localStorage.getItem(`amzfunstuff-liked`)))
        this.setState({ liked })
    }

    // add like into liked
    addLiked = (productId) => {
        const liked = this.state.liked
        liked.add(productId)
        this.setState({ liked })
        localStorage.setItem('amzfunstuff-liked', JSON.stringify(Array.from(liked)))
    }

    // handle resize - pass viewWidth to each Product sub-component for better responsive design
    handleResize = () => {
        this.setState({ viewWidth: window.innerWidth >= 960 ? window.innerWidth - 240 : window.innerWidth })
    }

    /* 
        used viewWidth to determin 1 col or 2 cols, and the breakpoint is 900
    */
    createContent = (classes, product, viewWidth, liked) => {

        if(viewWidth < 900){
            return this.createContentForSingleCol(classes, product, viewWidth, liked)
        }else{
            return this.createContentForTwoCol(classes, product, viewWidth, liked)
        }
    }

    createContentForSingleCol = (classes, product, viewWidth, liked) => {

        const viewWidthRatio = 0.85
        const heightToWidthRatio = 534/640
        const maxWidth = 750
        
        const adjustedWidth = viewWidth * viewWidthRatio > maxWidth ? maxWidth : viewWidth * viewWidthRatio
        const adjustedHeight = adjustedWidth * heightToWidthRatio

        const likeOrNot = liked != null && liked.has(product.id) ?
                             <div className={classes.singleColPriceAndLikes}><span style={{fontSize:'10px', color:'red'}}><i className="fas fa-heart"></i></span> {product.likes+1}</div> :
                             <div className={classes.singleColPriceAndLikes}><span style={{fontSize:'10px'}}><i className="far fa-heart"></i></span> {product.likes}</div>

        const priceIcons = this.getPriceIcons(product.price, classes)

        return <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.content}>
                    <Grid container justify="center" alignItems="center">
                        <div>
                            <a href={product.link} rel="nofollow" target="_blank">
                                <img src={`/assets/images/products/${product.imageLarge}.jpg`} alt={product.titleCN} style={{ width:adjustedWidth, height:adjustedHeight }}/>
                            </a>
                        </div>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <div className={classes.titleCN} style={{ width:adjustedWidth }} onClick={() => { this.props.navToLink(product.link, true) }}>{product.titleCN}</div>
                            <div className={classes.titleEN} style={{ width:adjustedWidth }} onClick={() => { this.props.navToLink(product.link, true) }}>{product.titleEN}</div>
                        </Grid>
                        <div className={classes.description} style={{ width:adjustedWidth }}>{product.description}</div>
                        <Grid container justify="space-around" alignItems="center" className={classes.priceAndLikes} style={{ width:adjustedWidth }}>
                            {likeOrNot}
                            <div>{priceIcons}</div>
                        </Grid>
                        <div className={classes.buttonDiv}>
                            <Button variant="contained" style={{ width:adjustedWidth }} className={classes.detailButton} onClick={() => { this.props.navToLink(product.link, true) }}>查看详情</Button>
                        </div>
                        <div className={classes.buttonDiv}>
                            <Button variant="contained" style={{ width:adjustedWidth }} className={classes.likeButton} onClick={(event) => { event.preventDefault(), this.addLiked(product.id) }}>喜欢</Button>
                        </div>
                        <Grid container justify="center" alignItems="center" className={classes.share}>
                            <div className="addthis_inline_share_toolbox"></div>
                            <div className={classes.related}>你或许也想把辛苦赚来的💰浪费在下面这些奇葩好物上...</div>
                        </Grid>
                    </Grid>
                </Grid>
                
    }

    createContentForTwoCol = (classes, product, viewWidth, liked) => {

        const viewWidthRatio = 0.6
        const heightToWidthRatio = 534/640
        const maxWidth = 800
        
        const adjustedWidth = viewWidth * viewWidthRatio > maxWidth ? maxWidth : viewWidth * viewWidthRatio
        const adjustedHeight = adjustedWidth * heightToWidthRatio

        const likeOrNot = liked != null && liked.has(product.id) ?
                             <div className={classes.singleColPriceAndLikes}><span style={{fontSize:'10px', color:'red'}}><i className="fas fa-heart"></i></span> {product.likes+1}</div> :
                             <div className={classes.singleColPriceAndLikes}><span style={{fontSize:'10px'}}><i className="far fa-heart"></i></span> {product.likes}</div>

        const priceIcons = this.getPriceIcons(product.price, classes)

        return <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.content}>
                    <Grid container justify="center" alignItems="center">
                        <Grid>
                            <div className={classes.image}>
                                <a href={product.link} rel="nofollow" target="_blank">
                                    <img src={`/assets/images/products/${product.imageLarge}.jpg`} alt={product.titleCN} style={{ width:adjustedWidth, height:adjustedHeight }}/>
                                    <Grid container direction="column" justify="flex-end" className={classes.imageShadow}>
                                        <div className={classes.imageTitleCN}>{product.titleCN}</div>
                                        <div className={classes.imageTitleEN}>{product.titleEN}</div>
                                    </Grid>
                                </a>
                            </div>
                        </Grid>
                        <Grid>
                            <Grid container direction="column" justify="space-evenly" alignItems="center" style={{ height:adjustedHeight, marginLeft: 20 }}>
                                <div>
                                    <a href="www.amazon.com" rel="nofollow" target="_blank">
                                        <img className={classes.banner} src={`/assets/images/ads/ad.png`}/>
                                    </a>
                                </div>
                                <div className={classes.description} style={{ width: 280 }}>{product.description}</div>
                                <Grid container justify="space-around" alignItems="center" className={classes.priceAndLikes} style={{ width: 280 }}>
                                    {likeOrNot}
                                    <div>{priceIcons}</div>
                                </Grid>
                                <Button variant="contained" style={{ width: 280 }} className={classes.detailButton} onClick={() => { this.props.navToLink(product.link, true) }}>查看详情</Button>
                                <Button variant="contained" style={{ width: 280 }} className={classes.likeButton} onClick={(event) => { event.preventDefault(), this.addLiked(product.id) }}>喜欢</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container direction="column" justify="center" alignItems="center" className={classes.share}>
                        <div className="addthis_inline_share_toolbox"></div>
                        <div className={classes.related}>你或许也想把辛苦赚来的💰浪费在下面这些奇葩好物上...</div>
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
        const { classes } = this.props
        const { viewWidth, liked, product } = this.state

        let content = null 
        let related = null

        if(product == null){
            content = <Grid container justify="center" alignItems="center" style={{ height: window.innerHeight * .6 }} ><CircularProgress size={100} /></Grid>
        }else if(product == 'not found'){
            this.props.navToLink('/', false)
        }else{
            content = this.createContent(classes, product, viewWidth, liked)
            related = <Products category={product.category} subcategory={product.subcategory} />
        }
        
        return <Grid container justify="center" alignItems="center">
                    {content}
                    {related}
                </Grid>
    }
}

export default compose(
    withContext,
    withStyles(styles)
)(ProductDetail)