import React, { Component } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { Provider } from '../context'

class App extends Component {

  state = {
    exercise: {}
  }

  getContext = () => ({
    ...this.state,
  })

  render() {
    return (
      <Provider value={this.getContext()}>
        <CssBaseline />
        <BrowserRouter>
          
          <div>
            <ul>
              <li>
                <Link to='/'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/writers'>
                  Writers
                </Link>
              </li>
            </ul>

            <Route exact path='/' render={() => <div>Home</div>} />
            <Route path='/writers' render={() => <div>Writers</div>} />
     
          </div>
        </BrowserRouter>
      </Provider>
    )
  }

}

export default App;
