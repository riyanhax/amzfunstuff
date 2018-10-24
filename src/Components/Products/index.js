import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
    Grid, Hidden, FormControl, Select, MenuItem, CircularProgress
} from '@material-ui/core'
import { Slider } from 'material-ui-slider'
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
    banner: {
        width: '100%',
        height: 'auto',
        marginBottom: 20,
    },
    header: {
        borderBottom: `1px solid #ccc`,
        marginBottom: 20,
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
        marginBottom: 15,
    },
    setting: {
        marginBottom: 20,
    },
    priceValue: {
        fontSize: '.8rem',
        fontWeight: '900',
        color: '#E64A19',
        marginLeft: 3,
        marginRight: 3,
    },
    selector: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
})

  
class Products extends Component {

    state = {
        viewWidth: window.innerWidth >= 960 ? window.innerWidth - 240 : window.innerWidth,
        products: [],
        info: null,
        index: null,
        liked: null,
        type: null,
        price: [0,220],
        sort: 1,
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize)
        window.addEventListener('scroll', this.handleScroll)

        const { location: { pathname } } = this.props

        let category = null
        let subcategory = null 

        // if used as related products in product detail component, then these 2 props would be passed; otherwise, it's used as independent component
        if(this.props.category != null && this.props.subcategory != null){
            category = this.props.category
            subcategory = this.props.subcategory
            this.setState({ type:'related' })
        }else{
            category = pathname.split('/')[1]
            subcategory = pathname.split('/')[2]
            this.setState({ type:'independent' })
        }
        
        // console.log('pathname ', pathname)
        // console.log('category ', category)
        // console.log('subcategory ', subcategory)

        this.loadLiked()

        if(pathname != null & pathname == '/'){
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

    // handle scroll - load more by modifying index
    handleScroll = () => {
        // if(innerHeight + scrollY >= document.body.offsetHeight - 50) - this worked added 100% height to html and body tags, and the new solution was to use document.getElementById('root').offsetHeight (with 'root' being a container that actually occupied 100% of the page height)

        const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)

        if(innerHeight + scrollTop >= document.getElementById('root').offsetHeight - 50){
            console.log('bottom')
            const index = this.state.index + 12 > this.state.products.length ? this.state.products.length : this.state.index + 12
            this.setState({ index })
        }
    }

    // handle resize - pass viewWidth to each Product sub-component for better responsive design
    handleResize = () => {
        this.setState({ viewWidth: window.innerWidth >= 960 ? window.innerWidth - 240 : window.innerWidth })
    }

    // handle slider change - modify price low and high, which would be used for product filtering
    handleSliderChange = (price) => {
        this.setState({ price })
    }

    // handle selector change - modify sort option, which would be used for product sorting
    handleSelectorChange = (event) => {
        this.setState({ sort: event.target.value })
    }

    // used for products sorting
    sortProducts = (filteredProducts) => {
        const sort = this.state.sort 
        if(sort == 1){
            return filteredProducts
        }else if(sort == 2){
            return filteredProducts.sort((productA, productB) => {
                if(productA.likes < productB.likes){
                    return 1
                }
                if(productA.likes > productB.likes){
                    return -1
                }
                return 0
            })
        }else if(sort == 3){
            return filteredProducts.sort((productA, productB) => {
                if(productA.price < productB.price){
                    return 1
                }
                if(productA.price > productB.price){
                    return -1
                }
                return 0
            })
        }else if(sort == 4){
            return filteredProducts.sort((productA, productB) => {
                if(productA.price < productB.price){
                    return -1
                }
                if(productA.price > productB.price){
                    return 1
                }
                return 0
            })
        }
    }

    // used for products shuffle (https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/)
    shuffle = (products) => {
        let currentIndex = products.length
        let temporaryValue = null 
        let randomIndex = null 

        while(0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = products[currentIndex];
            products[currentIndex] = products[randomIndex];
            products[randomIndex] = temporaryValue;
        }

        return products;
    }

    render() { 
        const { classes } = this.props
        const { products, index, info, viewWidth, price, liked, sort, type } = this.state

        //create banner sub-component (display on whatsnew only)
        const banner = info != null ? null :
                        <a href="www.amazon.com" rel="nofollow" target="_blank">
                            <img className={classes.banner} src={`/assets/images/banner.png`}/>
                        </a>

        // create header sub-component (display on non-whatsnew only)
        const header = info == null || (type == null || type == 'related') ? null : 
                       <Grid container direction="column" justify="center" className={classes.header}>
                            <div className={classes.headerTitle}>{info.title}</div>
                            <Hidden xsDown>
                                <div className={classes.headerDescription}>{info.description}</div>
                            </Hidden>
                       </Grid>
        
        // create setting sub-component
        let sliderWidth = null
        if(window.innerWidth < 650){
            sliderWidth = viewWidth * 0.7
        }else{
            sliderWidth = viewWidth * 0.5
        }
        const startPrice = <span className={classes.priceValue}>${price[0]}</span>
        const endPrice = price[1] == 220 ? <span className={classes.priceValue}>Max</span> : <span className={classes.priceValue}>${price[1]}</span>
        const priceDivWidth = sliderWidth + 22 - sliderWidth / 220 * ((220 - price[1]) + (price[0] - 0)) < 65 ? 65 : sliderWidth + 22 - sliderWidth / 220 * ((220 - price[1]) + (price[0] - 0))
        const leftMargin = price[0] == 0 ? 0 : (sliderWidth / 220 * price[0])
        const rightMargin = price[1] == 220 ? 0 : (sliderWidth / 220 * (220 - price[1]))

        const panel = info == null || (type == null || type == 'related') ? null : 
                    <Grid container justify="center" alignItems="center" className={classes.setting}>
                        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <div style={{ width:priceDivWidth, marginLeft:leftMargin, marginRight: rightMargin }}><Grid container justify="space-between" alignItems="center">{startPrice}{endPrice}</Grid></div>
                                <div style={{ width:sliderWidth }}><Slider color="#FF5252" range min={0} max={220} value={price} scaleLength={20} onChange={this.handleSliderChange}/></div>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                            <Grid container justify="center" alignItems="center">
                                <Hidden xsDown>
                                    <form className={classes.selector} autoComplete="off">
                                        <FormControl className={classes.formControl}>
                                            <Select
                                                value={sort}
                                                onChange={this.handleSelectorChange}
                                                inputProps={{
                                                    name: 'sort',
                                                }}
                                            >
                                                <MenuItem value={1}>添加时间</MenuItem>
                                                <MenuItem value={2}>喜欢数量</MenuItem>
                                                <MenuItem value={3}>高价-低价</MenuItem>
                                                <MenuItem value={4}>低价-高价</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </form>
                                </Hidden>
                            </Grid>
                        </Grid>
                    </Grid>
            
        // create content sub-component
        let content = null
        if(products.length == 0){
            content = <Grid container justify="center" alignItems="center" style={{ height: window.innerHeight * .6 }} ><CircularProgress className={classes.progress} size={100} /></Grid>
        }else{
            const filteredProducts = products.filter((product) => {
                return product.price >= price[0] && (price[1] == 210 ? true : product.price <= price[1])
            })
            const sortedProducts = (type == null || type != 'related') ? this.sortProducts(filteredProducts) : this.shuffle(filteredProducts)
            const finalIndex = index > sortedProducts.length ? sortedProducts.length : index
            const finalProducts = sortedProducts.slice(0, finalIndex)

            content = <Grid container justify="center">
                        {finalProducts.map(product => (
                            <Product key={product.id} product={product} windowWidth={window.innerWidth} viewWidth={viewWidth} liked={liked} addLiked={this.addLiked}/>
                        ))}
                    </Grid>
        }

        // console.log('old products ', products.length)
        // console.log('new products ', finalProducts.length)
        // console.log('index ', index)
        // console.log('window.innerWidth ', window.innerWidth)
        // console.log('viewWidth ', viewWidth)

        return <div className={classes.root}>
                    {banner}
                    {header}
                    {panel}
                    {content}
                </div>
    }
}

export default compose(
    withRouter,
    withStyles(styles)
)(Products)