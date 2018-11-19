import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
    Grid, CircularProgress
} from '@material-ui/core'
import Article from '../Article'
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
})

  
class Articles extends Component {

    state = {
        viewWidth: window.innerWidth >= 960 ? window.innerWidth - 240 : window.innerWidth,
        articles: [],
        index: null,
        liked: null,
        type: null,
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize)
        window.addEventListener('scroll', this.handleScroll)

        this.loadLiked()

        const { location: { pathname } } = this.props

        if(pathname != null & pathname == '/myfavs'){
            if(this.props.type == 'blogs'){
                this.loadArticles('blogs')
            }else{
                this.loadArticles('guides')
            }
            this.setState({ type:'myfavs' }) 
        }else{
            if(pathname != null & pathname == '/blogs'){
                this.loadArticles('blogs')
            }else{
                this.loadArticles('guides')
            }
            this.setState({ type:'independent' }) 
        } 
    }

    componentWillReceiveProps(props) {
        const { type } = this.props
        if (props.type != type) {
            this.loadArticles(props.type)
        }
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.handleResize)
        window.removeEventListener('scroll', this.handleScroll)
    }

    // load liked set
    loadLiked = () => {
        const liked = new Set(JSON.parse(localStorage.getItem(`amzfunstuff-articles-liked`)))
        this.setState({ liked })
    }

    // add like into liked
    addLiked = (articleId) => {
        const liked = this.state.liked
        liked.add(articleId)
        this.setState({ liked })
        localStorage.setItem('amzfunstuff-articles-liked', JSON.stringify(Array.from(liked)))
    }

    // remove like from liked
    removeLike = (articleId) => {
        const liked = this.state.liked
        liked.delete(articleId)
        this.setState({ liked })
        localStorage.setItem('amzfunstuff-articles-liked', JSON.stringify(Array.from(liked)))
    }

    // load blogs (load once for all) 
    loadArticles = async (type) => {
        // load blogs/guides 
        let articlesURL = null
        if(type == 'blogs'){
            articlesURL = `/articles/blogs`
        }else{
            articlesURL = `/articles/guides`
        } 

        let next = true
        let counter = 1
        let articles = []
        while(next){
            const content = await axios.get(`${articlesURL}/${counter}.json`)
            articles = content.data.articles.concat(articles)
            counter++
            next = content.data.next
        }
        const index = 24
        this.setState({ articles, index })
    }

    // handle scroll - load more by modifying index
    handleScroll = () => {
        // if(innerHeight + scrollY >= document.body.offsetHeight - 50) - this worked added 100% height to html and body tags, and the new solution was to use document.getElementById('root').offsetHeight (with 'root' being a container that actually occupied 100% of the page height)

        const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)

        if(innerHeight + scrollTop >= document.getElementById('root').offsetHeight - 50){
            const index = this.state.index + 12 > this.state.articles.length ? this.state.articles.length : this.state.index + 12
            this.setState({ index })
        }
    }

    // handle resize - pass viewWidth to each Article sub-component for better responsive design
    handleResize = () => {
        this.setState({ viewWidth: window.innerWidth >= 960 ? window.innerWidth - 240 : window.innerWidth })
    }

    render() { 
        const { classes } = this.props
        const { type, articles, index, viewWidth, liked } = this.state

        //create banner sub-component
        const banner =  (type == null || type == 'myfavs') ? null : 
                        <a href="www.amazon.com" rel="nofollow" target="_blank">
                            <img className={classes.banner} src={`/articles/covers/banner.png`}/>
                        </a>
                        
        // create content sub-component
        let content = null
        if(articles.length == 0){
            content = <Grid container justify="center" alignItems="center" style={{ height: window.innerHeight * .6 }} ><CircularProgress size={100} /></Grid>
        }else{
            const filteredArticles = (type == null || type != 'myfavs') ? articles : articles.filter((article) => {
                if(liked == null){
                    return false
                }else{
                    if(liked.has(article.id)){
                        return true
                    }else{
                        return false
                    }
                }
            })
            const finalIndex = index > filteredArticles.length ? filteredArticles.length : index
            const finalArticle = filteredArticles.slice(0, finalIndex)

            content = <Grid container justify="center">
                        {finalArticle.map(article => (
                            <Article key={article.id} article={article} windowWidth={window.innerWidth} viewWidth={viewWidth} liked={liked} addLiked={this.addLiked} removeLiked={this.removeLike}/>
                        ))}
                    </Grid>
        }

        // console.log('window.innerWidth ', window.innerWidth)
        // console.log('viewWidth ', viewWidth)

        return <div className={classes.root}>
                    {banner}
                    {content}
                    <Footer/>
                </div>
    }
}

export default compose(
    withRouter,
    withStyles(styles)
)(Articles)