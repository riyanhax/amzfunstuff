import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
    Grid, Hidden, FormControl, Select, MenuItem, CircularProgress
} from '@material-ui/core'
import { Slider } from 'material-ui-slider'
import Product from '../Product'
import Footer from '../Footer'
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
        scale: [1,15],
        price: [0,100000000000],
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
            if(category == 'myfavs'){
                this.setState({ type: 'myfavs' })
            }else{
                this.setState({ type:'related' })
            }
        }else{
            category = pathname.split('/')[1]
            subcategory = pathname.split('/')[2]
            this.setState({ type:'independent' }) 
        }
        
        // console.log('pathname ', pathname)
        // console.log('category ', category)
        // console.log('subcategory ', subcategory)

        this.loadLiked()

        if((pathname != null && pathname == '/') || category == 'myfavs'){
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

    // remove like from liked
    removeLike = (productId) => {
        const liked = this.state.liked
        liked.delete(productId)
        this.setState({ liked })
        localStorage.setItem('amzfunstuff-liked', JSON.stringify(Array.from(liked)))
    }

    // load products (load once for all) 
    loadProducts = async (category, subcategory) => {
        // load product info
        let info = await axios.get('/assets/products/info.json')
        info = info.data
        if(category != 'whatsnew' && category != 'myfavs'){
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
        if(this.state.type == 'related'){
            this.shuffle(products)
        }
        this.setState({ info, products, index })
    }

    // handle scroll - load more by modifying index
    handleScroll = () => {
        // if(innerHeight + scrollY >= document.body.offsetHeight - 50) - this worked added 100% height to html and body tags, and the new solution was to use document.getElementById('root').offsetHeight (with 'root' being a container that actually occupied 100% of the page height)

        const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)

        if(innerHeight + scrollTop >= document.getElementById('root').offsetHeight - 50){
            const index = this.state.index + 12 > this.state.products.length ? this.state.products.length : this.state.index + 12
            this.setState({ index })
        }
    }

    // handle resize - pass viewWidth to each Product sub-component for better responsive design
    handleResize = () => {
        this.setState({ viewWidth: window.innerWidth >= 960 ? window.innerWidth - 240 : window.innerWidth })
    }

    // handle slider change - modify price low and high, which would be used for product filtering
    handleSliderChange = (scale) => {
        let price, startPrice, endPrice

        switch (scale[0]) {
            case 1:
                startPrice = 0
                break;
            case 2:
                startPrice = 40
                break;
            case 3:
                startPrice = 60
                break;
            case 4:
                startPrice = 80
                break;
            case 5:
                startPrice = 100
                break;
            case 6:
                startPrice = 200
                break;
            case 7:
                startPrice = 400
                break;
            case 8:
                startPrice = 600
                break;
            case 9:
                startPrice = 800
                break;
            case 10:
                startPrice = 1000
                break;
            case 11:
                startPrice = 2000
                break;
            case 12:
                startPrice = 4000
                break;
            case 13:
                startPrice = 6000
                break;
            case 14:
                startPrice = 8000
                break;
            default:
                startPrice = 0
                break;
        }

        switch (scale[1]) {
            case 2:
                endPrice = 40
                break;
            case 3:
                endPrice = 60
                break;
            case 4:
                endPrice = 80
                break;
            case 5:
                endPrice = 100
                break;
            case 6:
                endPrice = 200
                break;
            case 7:
                endPrice = 400
                break;
            case 8:
                endPrice = 600
                break;
            case 9:
                endPrice = 800
                break;
            case 10:
                endPrice = 1000
                break;
            case 11:
                endPrice = 2000
                break;
            case 12:
                endPrice = 4000
                break;
            case 13:
                endPrice = 6000
                break;
            case 14:
                endPrice = 8000
                break;
            case 15:
                endPrice = 100000000000
                break;
            default:
                endPrice = 100000000000
                break;
        }

        price = [startPrice, endPrice]

        this.setState({ scale, price })
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
    }

    getPriceIcon = (scale) => {

        const dollar = <i className="fas fa-dollar-sign"/>
        const coins = <i className="fas fa-coins"/>
        const diamond = <i className="far fa-gem"/>
        
        switch (scale) {
            case 1:
                return <span style={{ color:'#85bb65' }}>{dollar}</span>
            case 2:
                return <span style={{ color:'#85bb65' }}>{dollar}✖2</span>
            case 3:
                return <span style={{ color:'#85bb65' }}>{dollar}✖3</span>
            case 4:
                return <span style={{ color:'#85bb65' }}>{dollar}✖4</span>
            case 5:
                return <span style={{ color:'#85bb65' }}>{dollar}✖5</span>
            case 6:
                return <span style={{ color:'#f7931a' }}>{coins}</span>
            case 7:
                return <span style={{ color:'#f7931a' }}>{coins}✖2</span>
            case 8:
                return <span style={{ color:'#f7931a' }}>{coins}✖3</span>
            case 9:
                return <span style={{ color:'#f7931a' }}>{coins}✖4</span>
            case 10:
                return <span style={{ color:'#f7931a' }}>{coins}✖5</span>
            case 11:
                return <span style={{ color:'#2196F3' }}>{diamond}</span>
            case 12:
                return <span style={{ color:'#2196F3' }}>{diamond}✖2</span>
            case 13:
                return <span style={{ color:'#2196F3' }}>{diamond}✖3</span>
            case 14:
                return <span style={{ color:'#2196F3' }}>{diamond}✖4</span>
            case 15:
                return <span style={{ color:'#2196F3' }}>{diamond}✖5</span>
            default:
                return <span style={{ color:'#2196F3' }}>{diamond}✖5</span>
        }
    }

    getPriceDivWidth = (sliderWidth, scale) => {

        if(scale[1] - scale[0] == 1){
            if(scale[0] == 1 || scale[1] == 1 || scale[0] == 6 || scale[1] == 6 || scale[0] == 11 || scale[1] == 11){
                return 60
            }else{
                return 80
            }  
        }else{
            return sliderWidth - sliderWidth / 15 * ((15 - scale[1]) + (scale[0] - 1)) < 80 ? 80 : sliderWidth - sliderWidth / 15 * ((15 - scale[1]) + (scale[0] - 1))
        }
    }

    render() { 
        const { classes } = this.props
        const { products, index, info, viewWidth, price, scale, liked, sort, type } = this.state

        //create banner sub-component (display on whatsnew only)
        const banner = info != null || (type == null || type == 'myfavs') ? null :
                        <a href="www.amazon.com" rel="nofollow" target="_blank">
                            <img className={classes.banner} src={`/assets/images/ads/banner.png`}/>
                        </a>

        // create header sub-component (display on non-whatsnew non-myfavs only)
        const header = info == null || (type == null || type == 'related' || type == 'myfavs') ? null : 
                       <Grid container direction="column" justify="center" className={classes.header}>
                            <div className={classes.headerTitle}>{info.title}</div>
                            <Hidden xsDown>
                                <div className={classes.headerDescription}>{info.description}</div>
                            </Hidden>
                       </Grid>
        
        // create panel sub-component (display on non-whatsnew non-myfavs only)
        let sliderWidth = null
        if(window.innerWidth < 650){
            sliderWidth = viewWidth * 0.7
        }else{
            sliderWidth = viewWidth * 0.5
        }
  
        const startPrice = this.getPriceIcon(scale[0])
        const endPrice = this.getPriceIcon(scale[1])
        const priceDivWidth = this.getPriceDivWidth(sliderWidth, scale)
        const leftMargin = scale[0] == 1 ? 0 : (sliderWidth / 15 * (scale[0]-1))
        const rightMargin = scale[1] == 15 ? 0 : (sliderWidth / 15 * (15 - scale[1]))
        
        const panel = info == null || (type == null || type == 'related' || type == 'myfavs') ? null : 
                    <Grid container justify="center" alignItems="center" className={classes.setting}>
                        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Hidden xsDown>
                                    <div style={{ width:priceDivWidth, marginLeft:leftMargin, marginRight: rightMargin }}><Grid container justify="space-between" alignItems="center">{startPrice}{endPrice}</Grid></div>
                                    <div style={{ width:sliderWidth }}><Slider color="#FF5252" range min={1} max={15} value={scale} scaleLength={1} onChange={this.handleSliderChange}/></div>
                                </Hidden>
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
            content = <Grid container justify="center" alignItems="center" style={{ height: window.innerHeight * .6 }} ><CircularProgress size={100} /></Grid>
        }else{
            const filteredProducts = (type == null || type != 'myfavs') ? products.filter((product) => {
                return product.price >= price[0] && (price[1] == 100000000000 ? true : product.price <= price[1])
            }) : products.filter((product) => {
                if(liked == null){
                    return false
                }else{
                    if(liked.has(product.id)){
                        return true
                    }else{
                        return false
                    }
                }
            })
            const sortedProducts = (type == null || type != 'related' || type != 'myfavs') ? this.sortProducts(filteredProducts) : filteredProducts
            const finalIndex = index > sortedProducts.length ? sortedProducts.length : index
            const finalProducts = sortedProducts.slice(0, finalIndex)

            content = <Grid container justify="center">
                        {finalProducts.map(product => (
                            <Product key={product.id} product={product} windowWidth={window.innerWidth} viewWidth={viewWidth} liked={liked} addLiked={this.addLiked} removeLiked={this.removeLike}/>
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
                    <Footer/>
                </div>
    }
}

export default compose(
    withRouter,
    withStyles(styles)
)(Products)