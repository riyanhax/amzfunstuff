import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from '../context'
import NotFound from './Errors'
import Layout from './Layout'
import Products from './Products'
import categories from '../data-menu/categories'
import subcategories from '../data-menu/subcategories'

class App extends Component {

  state = {
    categories,
    subcategories,
    mobileOpen: false,
    // footerHeight:0,
  }

  getContext = () => ({
    ...this.state,
    navToLink: this.navToLink,
    handleDrawerToggle: this.handleDrawerToggle,
  })

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

  createRoutes = (categories, subcategories) => {
    const routes = []

    for(const id of Object.keys(categories)){
      routes.push(<Route exact key={id} path={categories[id].link} component={Products} />);

      const subs = subcategories[id];
      if(subs){
        for(const sub of subs){
          routes.push(<Route exact key={sub.id} path={sub.link} component={Products} />);
        }
      }
    }

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
