import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
    Grid
} from '@material-ui/core'
import Product from '../Product'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'

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
        category:null,
        subcategory:null,
    }



    componentDidMount() {
        console.log('componentDidMount')

        const { location: { pathname }, loadSubCategoryProducts } = this.props

        const category = pathname.split('/')[1]
        const subcategory = pathname.split('/')[2]

        this.setState({ category, subcategory })

        // console.log('pathname ', pathname)
        // console.log('category ', category)
        // console.log('subcategory ', subcategory)

        window.addEventListener("resize", this.handleResize)

        if(pathname == '/'){
            console.log('add scroll event')
            window.addEventListener('scroll', this.handleScroll)
        }else{
            // only load data if subcategory being clicked, and would load all data 
            if(category != null && subcategory != null){
                loadSubCategoryProducts(category, subcategory)
            }
        }
    }

    componentWillUnmount(){
        console.log('componentWillUnmount')

        const { location: { pathname } } = this.props

        // console.log('pathname ', pathname)

        window.removeEventListener('resize', this.handleResize)

        if(pathname == '/'){
            console.log('remove scroll event')
            window.removeEventListener('scroll', this.handleScroll)
        }
    }

    handleScroll = (bottom) => {
        // if(bottom){
        //   this.setState({
        //     footerHeight: 50
        //   })
        // }else{
        //   this.setState({
        //     footerHeight: 0
        //   })
        // }
    }

    handleResize = () => {
        this.setState({viewWidth: window.innerWidth >= 960 ? window.innerWidth - 240 : window.innerWidth})
    }


    render() {
        const { classes, products } = this.props

        console.log('size ',products.length)
        // console.log('window.innerWidth ',window.innerWidth)
        // console.log('viewWidth ',this.state.viewWidth)

        return <div className={classes.root}>
                    <Grid container justify="center">
                        {products.map(product => (
                            <Product key={product.id} product={product} category={this.state.category} subcategory={this.state.subcategory} windowWidth={window.innerWidth} viewWidth={this.state.viewWidth}/>
                        ))}
                    </Grid>
                </div>
    }
}

export default compose(
    withContext,
    withRouter,
    withStyles(styles)
)(Products)