import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from '../context'
import NotFound from './Errors'
import Layout from './Layout'
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
    handleDrawerToggle: this.handleDrawerToggle
    // onHandleScroll: this.handleScroll
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

  render() {

    const { categories, subcategories } = this.state

    return (
      <Provider value={this.getContext()}>
        <BrowserRouter>
          <Layout categories={categories} subcategories={subcategories}>
              <Switch>
                <Route exact path='/' render={() => <div>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home</div>} />
                <Route exact path='/gear-gadgets' render={() => <div>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>} />
                <Route exact path='/geeky-stuff' render={() => <div>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>} />
                <Route exact path='/toy-games' render={() => <div>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>} />
                <Route component={NotFound} />
              </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    )
  }

}

export default App;
