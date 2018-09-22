import React from 'react';
import { render } from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import App from './Components/App'

const theme = createMuiTheme({
    palette: {
      primary: red
    },
    spacing: {
      unit: 10
    }
  })

  render(
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>,
    document.getElementById('root')
  )