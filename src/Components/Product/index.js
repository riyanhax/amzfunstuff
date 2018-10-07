import React, { Component } from 'react'
import {
    Grid
} from '@material-ui/core'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    image: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secondary.light,
        marginBottom: 10,
        position: 'relative',
        "&:hover $shadow": {
            opacity: 0.8,
        },
        "&:hover $titleCN": {
            fontSize: '1.1rem',
            fontWeight: '800',
        },
        "&:hover $titleEN": {
            fontSize: '.9rem',
            fontWeight: '400',
        }
    },
    shadow: {
        position: 'absolute',
        bottom: 0,
        background: '#000',
        opacity: 0.6,
        color: '#f1f1f1',
        width: '100%',
        padding: 20,
    },
    titleCN: {
        fontSize: '1rem',
        fontWeight: '800',
    },
    titleEN: {
        fontSize: '.8rem',
        fontWeight: '400',
        marginLeft: 20,
    },
})

  
class Product extends Component {

    /* 
        < 650 : 1 col 
        < 1280 : 2 col
        < 1650 : 3 col 
    */
    createProduct = () => {

    }

    createOneColProduct = () => {

    }

    createTwoColProduct = () => {

    }

    createThreeColProduct = () => {

    }

    createFourColProduct = () => {

    }

    render() {

        const { classes, product, viewWidth, windowWidth } = this.props

        return <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <Grid container justify="center">
                    <div className={classes.image}>
                        <a href={product.link} rel="nofollow" target="_blank">
                            <img src={`/assets/images/${product.imageSmall}.jpg`} alt={product.titleCN} />
                            <div className={classes.shadow}>
                                <div className={classes.titleCN}>{product.titleCN}</div>
                                <div className={classes.titleEN}>{product.titleEN}</div>
                            </div>
                        </a>
                    </div>
                </Grid>  
            </Grid>
    }
}

export default compose(
    withStyles(styles)
)(Product)