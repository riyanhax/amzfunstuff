import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from '../context'
import NotFound from './Errors'
import Nav from './Nav'
import categories from '../data-menu/categories'
import subcategories from '../data-menu/subcategories'

class App extends Component {

  state = {
    categories,
    subcategories
  }

  getContext = () => ({
    ...this.state,
  })

  render() {

    const { categories, subcategories } = this.state

    return (
      <Provider value={this.getContext()}>
        <BrowserRouter>
          <Nav categories={categories} subcategories={subcategories}>
              <Switch>
                <Route exact path='/' render={() => <div>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Home</div>} />
                <Route exact path='/gear-gadgets' render={() => <div>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Gear + Gadgets<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>} />
                <Route exact path='/geeky-stuff' render={() => <div>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Geeky Stuff<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>} />
                <Route exact path='/toy-games' render={() => <div>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>Toy + Games<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>} />
                <Route component={NotFound} />
              </Switch>
          </Nav>
        </BrowserRouter>
      </Provider>
    )
  }

}

export default App;
