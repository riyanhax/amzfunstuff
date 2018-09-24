import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from '../context'
import NotFound from './Errors'
import Layout from './Layout'

class App extends Component {

  state = {
    writers: [
      {
        "id":"a",
        "name":"first"
      },
      {
        "id":"b",
        "name":"second"
      },
      {
        "id":"c",
        "name":"third"
      }
    ]
  }

  getContext = () => ({
    ...this.state,
  })

  render() {

    const { writers } = this.state

    return (
      <Provider value={this.getContext()}>
        <BrowserRouter>
          <Layout writers={writers}>
              <Switch>
                <Route exact path='/' render={() => <div>Home</div>} />
                <Route path='/writers' render={() => <div>Writers</div>} />
                <Route component={NotFound} />
              </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    )
  }

}

export default App;
