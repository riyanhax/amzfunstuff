import React, { Component } from 'react'
import {
    Grid, Button
} from '@material-ui/core'
import { orange, red } from '@material-ui/core/colors'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'

const styles = theme => ({
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
    }
})

  
class ProductDetail extends Component {

    state = {
        viewWidth: window.innerWidth >= 960 ? window.innerWidth - 240 : window.innerWidth,
        liked: null,
    }

    componentDidMount() {
        this.loadLiked()
        window.addEventListener("resize", this.handleResize)
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.handleResize)
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

    createProduct = (classes, product, windowWidth, viewWidth, liked) => {

        if(windowWidth < 650){
            return this.createProductForSingleCol(classes, product, viewWidth, liked)
        }else{
            return this.createProductForTwoCol(classes, product, viewWidth, liked)
        }
    }

    createProductForSingleCol = (classes, product, viewWidth, liked) => {

        const viewWidthRatio = 0.85
        const heightToWidthRatio = 534/640
        const maxWidth = 750
        
        const adjustedWidth = viewWidth * viewWidthRatio > maxWidth ? maxWidth : viewWidth * viewWidthRatio
        const adjustedHeight = adjustedWidth * heightToWidthRatio

        const likeOrNot = liked != null && liked.has(product.id) ?
                             <div className={classes.singleColPriceAndLikes}><span style={{fontSize:'10px', color:'red'}}><i className="fas fa-heart"></i></span> {product.likes+1}</div> :
                             <div className={classes.singleColPriceAndLikes}><span style={{fontSize:'10px'}}><i className="far fa-heart"></i></span> {product.likes}</div>


        return <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Grid container justify="center" alignItems="center">
                        <div>
                            <a href={product.link} rel="nofollow" target="_blank">
                                <img src={`/assets/images/${product.imageLarge}.jpg`} alt={product.titleCN} style={{ width:adjustedWidth, height:adjustedHeight }}/>
                            </a>
                        </div>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <div className={classes.titleCN} style={{ width:adjustedWidth }} onClick={() => { this.props.navToLink(product.link, true) }}>{product.titleCN}</div>
                            <div className={classes.titleEN} style={{ width:adjustedWidth }} onClick={() => { this.props.navToLink(product.link, true) }}>{product.titleEN}</div>
                        </Grid>
                        <div className={classes.description} style={{ width:adjustedWidth }}>{product.description}</div>
                        <Grid container justify="space-around" alignItems="center" className={classes.priceAndLikes} style={{ width:adjustedWidth }}>
                            {likeOrNot}
                            <div><span style={{fontSize:'12px'}}><i className="fas fa-dollar-sign"></i></span> {product.price}</div>
                        </Grid>
                        <div className={classes.buttonDiv}>
                            <Button variant="contained" style={{ width:adjustedWidth }} className={classes.detailButton} onClick={() => { this.props.navToLink(product.link, true) }}>查看详情</Button>
                        </div>
                        <div className={classes.buttonDiv}>
                            <Button variant="contained" style={{ width:adjustedWidth }} className={classes.likeButton} onClick={(event) => { event.preventDefault(), this.addLiked(product.id) }}>喜欢</Button>
                        </div>
                    </Grid>
                </Grid>
                
    }

    createProductForTwoCol = (classes, product, viewWidth, liked) => {

        return <Grid>
                  
                </Grid>
    }

    render() {

        const { classes } = this.props
        const { viewWidth, liked } = this.state
        
        const links= window.location.href.split('/')
        const productId = links[links.length-1]

        let product = JSON.parse(localStorage.getItem(`amzfunstuff-${productId}`))
        console.log('product ',product)

        //TODO: redirect to home page if product not found

        console.log('window width ', window.innerWidth)

        const content = this.createProduct(classes, product, window.innerWidth, viewWidth, liked)

        return <Grid container justify="center" alignItems="center">
                    {content}
                </Grid>
    }
}

export default compose(
    withContext,
    withStyles(styles)
)(ProductDetail)