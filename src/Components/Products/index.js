import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import {
    MenuList, MenuItem, ListItemIcon, Icon
} from '@material-ui/core'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'
import axios from "axios"

const styles = theme => ({
    hidden: {
        display: 'none',
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
        const { classes, location: { pathname } } = this.props

        return <div>{pathname}</div>
    }
}

export default compose(
    withContext,
    withRouter,
    withStyles(styles)
)(Products)