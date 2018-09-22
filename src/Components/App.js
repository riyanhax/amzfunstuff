import React, { Component } from 'react'
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
        <div>hello!!!~~~</div>
        
      </Provider>
    )
  }

}

export default App;
