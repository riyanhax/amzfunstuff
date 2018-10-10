import React, { Component } from 'react'
import {
    Grid, Button
} from '@material-ui/core'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'

const styles = theme => ({
    titleCN: {
        fontSize: '1rem',
        fontWeight: '800',
    },
})

  
class ProductDetail extends Component {

    render() {

        const { classes } = this.props
        
        const links= window.location.href.split('/')
        const productId = links[links.length-1]

        let product = JSON.parse(localStorage.getItem(`amzfunstuff-${productId}`))
        console.log('product ',product)

        //TODO: redirect to home page if product not found

        return <div>Detail:{productId}:{product.titleCN}</div>
    }
}

export default compose(
    withContext,
    withStyles(styles)
)(ProductDetail)