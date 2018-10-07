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
        marginBottom: 10,
    },
    
})

  
class Products extends Component {

    state = {
        products: []
    }

    async componentDidMount() {
        console.log('componentDidMount')

        const { location: { pathname } } = this.props

        const category = pathname.split('/')[1]
        const subcategory = pathname.split('/')[2]

        console.log('pathname ', pathname)
        console.log('category ', category)
        console.log('subcategory ', subcategory)

        if(pathname == '/'){
            console.log('add scroll event')
            window.addEventListener('scroll', this.handleScroll);
        }else{
            // only load data if subcategory being clicked, and would load all data 
            if(category != null && subcategory != null){
                let next = true
                let counter = 1
                let products = []
                while(next){
                    const content = await axios.get(`/assets/products/${category}/${subcategory}/${counter}.json`)
                    products = content.data.products.concat(products)
                    counter++
                    next = content.data.next
                }
                this.setState({ products })
                console.log('size ',this.state.products.length)
            }
        }
    }

    componentWillUnmount(){
        console.log('componentWillUnmount')

        const { location: { pathname } } = this.props

        // console.log('pathname ', pathname)

        if(pathname == '/'){
            console.log('remove scroll event')
            window.removeEventListener('scroll', this.handleScroll);
        }else{

        }
    }


    render() {
        const { classes } = this.props

        return <div className={classes.root}>
                    <Grid container spacing={8}>
                        {this.state.products.map(product => (
                            <Product key={product.id} product={product}/>
                        ))}
                    </Grid>
                </div>
    }
}

export default compose(
    withRouter,
    withStyles(styles)
)(Products)