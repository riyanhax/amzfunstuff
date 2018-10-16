import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
    Grid
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
})

  
class Products extends Component {

    state = {
        viewWidth: window.innerWidth >= 960 ? window.innerWidth - 240 : window.innerWidth,
        type: '',
        products: [],
        index: null,
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

        

        if(pathname == '/'){
            this.setState({type:'whatsnew'})
        }else if(category != null && subcategory != null){
            this.setState({type:'subcategory'})
            this.loadSubCategoryProducts(category, subcategory)
        }
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.handleResize)
        window.removeEventListener('scroll', this.handleScroll)
    }

    // load subcategory products (load once for all) 
    loadSubCategoryProducts = async (category, subcategory) => {
        let next = true
        let counter = 1
        let products = []
        while(next){
            const content = await axios.get(`/assets/products/${category}/${subcategory}/${counter}.json`)
            products = content.data.products.concat(products)
            counter++
            next = content.data.next
        }
        const index = 24
        this.setState({ products, index })
    }

    handleScroll = () => {
        // if(innerHeight + scrollY >= document.body.offsetHeight - 50) - this worked added 100% height to html and body tags, and the new solution was to use document.getElementById('root').offsetHeight (with 'root' being a container that actually occupied 100% of the page height)

        const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)

        // console.log('innerHeight ',innerHeight)
        // console.log('document.body.scrollTop ', innerHeight + scrollTop)
        // console.log('total ',document.getElementById('root').offsetHeight)


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

        console.log('old products ',this.state.products.length)
        console.log('new products ',products.length)
        console.log('index ',index)
        // console.log('window.innerWidth ',window.innerWidth)
        // console.log('viewWidth ',this.state.viewWidth)

        return <div className={classes.root} ref={this.productsRef}>
                    <Grid container justify="center">
                        {products.map(product => (
                            <Product key={product.id} product={product} windowWidth={window.innerWidth} viewWidth={this.state.viewWidth}/>
                        ))}
                    </Grid>
                </div>
    }
}

export default compose(
    withRouter,
    withStyles(styles)
)(Products)