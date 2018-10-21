import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
    Grid, Hidden
} from '@material-ui/core'
import Product from '../Product'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import axios from "axios"

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: '5%',
        marginRight: '5%',
    },
    header: {
        borderBottom: `1px solid #ccc`,
    },
    headerTitle: {
        fontSize: '1.3rem',
        fontWeight: '900',
        color: theme.palette.primary.main,
        marginBottom: 10,
    },
    headerDescription: {
        fontSize: '.8rem',
        fontWeight: '400',
        color: '#000000',
        marginBottom: 10,
    }
})

  
class Products extends Component {

    state = {
        viewWidth: window.innerWidth >= 960 ? window.innerWidth - 240 : window.innerWidth,
        products: [],
        info: null,
        index: null,
        liked: null,
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize)
        window.addEventListener('scroll', this.handleScroll)

        const { location: { pathname } } = this.props

        const category = pathname.split('/')[1]
        const subcategory = pathname.split('/')[2]

        // console.log('pathname ', pathname)
        // console.log('category ', category)
        // console.log('subcategory ', subcategory)

        this.loadLiked()

        if(pathname == '/'){
            this.loadProducts('whatsnew', null)
        }else if(category != null && subcategory == null){
            this.loadProducts(category, null)
        }else if(category != null && subcategory != null){
            this.loadProducts(category, subcategory)
        }
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.handleResize)
        window.removeEventListener('scroll', this.handleScroll)
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

    // load products (load once for all) 
    loadProducts = async (category, subcategory) => {
        // load product info
        let info = await axios.get('/assets/products/info.json')
        info = info.data
        if(category != 'whatsnew'){
            info = info[category]
            if(subcategory != null){
                info = info[subcategory]
            }
        }else{
            info = null
        } 
 
        // load products
        let productsURL = null
        if(subcategory != null){
            productsURL = `/assets/products/${category}/${subcategory}`
        }else{
            productsURL = `/assets/products/${category}`
        } 
        let next = true
        let counter = 1
        let products = []
        while(next){
            const content = await axios.get(`${productsURL}/${counter}.json`)
            products = content.data.products.concat(products)
            counter++
            next = content.data.next
        }
        const index = 24
        this.setState({ info, products, index })
    }

    handleScroll = () => {
        // if(innerHeight + scrollY >= document.body.offsetHeight - 50) - this worked added 100% height to html and body tags, and the new solution was to use document.getElementById('root').offsetHeight (with 'root' being a container that actually occupied 100% of the page height)

        const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)

        if(innerHeight + scrollTop >= document.getElementById('root').offsetHeight - 50){
            console.log('bottom')
            const index = this.state.index + 12 > this.state.products.length ? this.state.products.length : this.state.index + 12
            this.setState({ index })
        }
    }

    handleResize = () => {
        this.setState({ viewWidth: window.innerWidth >= 960 ? window.innerWidth - 240 : window.innerWidth })
    }


    render() {
        const { classes } = this.props

        const index = this.state.index > this.state.products.length ? this.state.products.length : this.state.index
        const products = this.state.products.slice(0, index)

        const info = this.state.info
        const header = info == null ? null : 
                       <Grid container direction="column" justify="center" className={classes.header}>
                            <div className={classes.headerTitle}>{info.title}</div>
                            <Hidden xsDown>
                                <div className={classes.headerDescription}>{info.description}</div>
                            </Hidden>
                       </Grid>

        // console.log('old products ',this.state.products.length)
        // console.log('new products ',products.length)
        // console.log('index ',index)
        // console.log('window.innerWidth ',window.innerWidth)
        // console.log('viewWidth ',this.state.viewWidth)

        return <div className={classes.root}>
                    {header}
                    <Grid container justify="center">
                        {products.map(product => (
                            <Product key={product.id} product={product} windowWidth={window.innerWidth} viewWidth={this.state.viewWidth} liked={this.state.liked} addLiked={this.addLiked}/>
                        ))}
                    </Grid>
                </div>
    }
}

export default compose(
    withRouter,
    withStyles(styles)
)(Products)