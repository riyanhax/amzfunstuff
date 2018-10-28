import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from '../context'
import NotFound from './Errors'
import Layout from './Layout'
import Products from './Products'
import ProductDetail from './ProductDetail'
import Articles from './Articles'
import categories from '../menus/categories'
import subcategories from '../menus/subcategories'

class App extends Component {

  state = {
    categories,
    subcategories,
    mobileOpen: false,
  }

  getContext = () => ({
    ...this.state,
    navToLink: this.navToLink,
    handleDrawerToggle: this.handleDrawerToggle,
  })

  // toggle drawer
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  // nav to specified link (either open new window or redirect in same window)
  navToLink = (link, newWindow) => {
    if(newWindow){
        window.open(link)
    }else{
        window.location.replace(link)
    }
  }

  // create routes based on categories and subcategories
  createRoutes = (categories, subcategories) => {
    const routes = []
    const reload = () => window.location.reload()

    for(const id of Object.keys(categories)){
      if(categories[id].name == 'divider'){
          continue
      }
      if(categories[id].link == '/blogs'){
        routes.push(<Route exact key={id} path={categories[id].link} component={Articles} />)
      }else{
        routes.push(<Route exact key={id} path={categories[id].link} component={Products} />)

        const subs = subcategories[id];
        if(subs){
          for(const sub of subs){
            routes.push(<Route exact key={sub.id} path={sub.link} component={Products} />)
          }
        }
      }
    }

    routes.push(<Route key={'detail'} path="/products/*" component={ProductDetail} />)
    routes.push(<Route key={'assets'} path="assets/*" onEnter={reload} />)
    routes.push(<Route key={'articles'} path="articles/*" onEnter={reload} />)
    routes.push(<Route key={'404'} component={NotFound} />)

    return <Switch>{routes}</Switch>
  }

  render() {

    const { categories, subcategories } = this.state

    return (
      <Provider value={this.getContext()}>
        <BrowserRouter>
          <Layout>
            {this.createRoutes(categories, subcategories)}
          </Layout>
        </BrowserRouter>
      </Provider>
    )
  }

}

export default App;
