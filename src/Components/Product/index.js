import React, { Component } from 'react'
import {
    Grid, Button
} from '@material-ui/core'
import orange from '@material-ui/core/colors/orange'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'

const styles = theme => ({
    singleColTitleCN: {
        fontSize: '.8rem',
        fontWeight: '600',
        color:theme.palette.primary.main,
        marginBottom: 3,
        display: 'block',
    },
    singleColTitleEN: {
        fontSize: '.6rem',
        fontWeight: '400',
        color:theme.palette.secondary.main,
        marginBottom: 5,
        display: 'block',
    },
    singleColImage: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secondary.light,
        marginBottom: 25,
        position: 'relative',
    },
    singleColShadow: {
        position: 'absolute',
        bottom: 0,
        background: 'transparent',
        color: '#f1f1f1',
        width: '100%',
        padding: 20,
    },
    button: {
        color: '#f1f1f1',
        backgroundColor: orange[500],
        '&:hover': {
            backgroundColor: orange[800],
          },
        fontSize: '.8rem',
        fontWeight: '600',
    },
    image: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secondary.light,
        marginBottom: 25,
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
    createProduct = (classes, product, viewWidth, windowWidth) => {

        if(windowWidth < 650){
            return this.createOneColProduct(classes, product, viewWidth)
        }else if(windowWidth < 1280){
            return this.createTwoColProduct(classes, product, viewWidth)
        }else if(windowWidth < 1650){
            return this.createThreeColProduct(classes, product, viewWidth)
        }else{
            return this.createFourColProduct(classes, product, viewWidth)
        }
    }

    createOneColProduct = (classes, product, viewWidth) => {
        
        const viewWidthRatio = 0.8
        const heightToWidthRatio = 250/300
        const maxWidth = 380
        
        const adjustedWidth = viewWidth * viewWidthRatio > maxWidth ? maxWidth : viewWidth * viewWidthRatio
        const adjustedHeight = adjustedWidth * heightToWidthRatio

        return <Grid item>
                    <Grid container justify="center">
                        <div className={classes.singleColTitleCN} onClick={() => this.props.navToLink('/', true)}>{product.titleCN}</div>
                        <div className={classes.singleColTitleEN} onClick={() => this.props.navToLink('/', true)}>{product.titleEN}</div>
                        <div className={classes.singleColImage}>
                            <a href={product.link} rel="nofollow" target="_blank">
                                <img src={`/assets/images/${product.imageSmall}.jpg`} alt={product.titleCN} style={{ width:adjustedWidth, height:adjustedHeight }}/>
                                <Grid container justify="flex-end" className={classes.singleColShadow}>
                                    <Button variant="contained" color="primary" className={classes.button}>查看详情</Button>
                                </Grid>
                            </a>
                        </div>
                    </Grid>
                </Grid>

        // return <Grid item className={classes.image}>
        //             <a href={product.link} rel="nofollow" target="_blank">
        //                 <img src={`/assets/images/${product.imageSmall}.jpg`} alt={product.titleCN} style={{ width:adjustedWidth, height:adjustedHeight }}/>
        //                 <Grid container justify="center" className={classes.shadow} style={{ opacity: 0.7 }}>
        //                     <div className={classes.titleCN} style={{ fontSize: '1.1rem', fontWeight: '800' }}>{product.titleCN}</div>
        //                     <div className={classes.titleEN} style={{ fontSize: '.9rem', fontWeight: '400' }}>{product.titleEN}</div>
        //                     <div style={{ marginTop: 8 }}>
        //                         price
        //                     </div>
        //                 </Grid>
        //             </a>
        //         </Grid>
                
    }

    createTwoColProduct = (classes, product, viewWidth) => {

        return <div className={classes.image}>
                    <a href={product.link} rel="nofollow" target="_blank">
                        <img src={`/assets/images/${product.imageSmall}.jpg`} alt={product.titleCN} />
                        <div className={classes.shadow}>
                            <div className={classes.titleCN}>{product.titleCN}</div>
                            <div className={classes.titleEN}>{product.titleEN}</div>
                        </div>
                    </a>
                </div>
    }

    createThreeColProduct = (classes, product, viewWidth) => {

        return <div className={classes.image}>
                    <a href={product.link} rel="nofollow" target="_blank">
                        <img src={`/assets/images/${product.imageSmall}.jpg`} alt={product.titleCN} />
                        <div className={classes.shadow}>
                            <div className={classes.titleCN}>{product.titleCN}</div>
                            <div className={classes.titleEN}>{product.titleEN}</div>
                        </div>
                    </a>
                </div>
    }

    createFourColProduct = (classes, product, viewWidth) => {

        return <div className={classes.image}>
                    <a href={product.link} rel="nofollow" target="_blank">
                        <img src={`/assets/images/${product.imageSmall}.jpg`} alt={product.titleCN} />
                        <div className={classes.shadow}>
                            <div className={classes.titleCN}>{product.titleCN}</div>
                            <div className={classes.titleEN}>{product.titleEN}</div>
                        </div>
                    </a>
                </div>
    }

    render() {

        const { classes, product, viewWidth, windowWidth } = this.props
        
        const content = this.createProduct(classes, product, viewWidth, windowWidth)

        return <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <Grid container justify="center">
                    {content}
                </Grid>  
            </Grid>
    }
}

export default compose(
    withContext,
    withStyles(styles)
)(Product)