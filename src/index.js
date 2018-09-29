import React from 'react';
import { render } from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { teal, blueGrey } from '@material-ui/core/colors'
import App from './Components/App'

const theme = createMuiTheme({
    palette: {
      primary: teal,
      secondary: blueGrey,
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