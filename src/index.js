import React from 'react';
import { render } from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { teal, grey } from '@material-ui/core/colors'
import App from './Components/App'

const theme = createMuiTheme({
    palette: {
      primary: teal,
      secondary: grey,
    },
    typography: {
      fontFamily: 'Tahoma, Arial, Helvetica, "Microsoft YaHei New", "Microsoft Yahei", "微软雅黑", 宋体, SimSun, STXihei, "华文细黑", sans-serif',
    },
  })

  render(
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>,
    document.getElementById('root')
  )