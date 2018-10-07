import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import {
    Grid, Paper
} from '@material-ui/core'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'
import axios from "axios"


const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: 10,
    },
    image: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.secondary.light,
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
    }
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
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={product.id}>
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