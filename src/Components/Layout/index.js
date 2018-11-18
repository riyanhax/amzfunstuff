import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import {
  AppBar, Toolbar, IconButton, Hidden, Drawer, CssBaseline, MenuList
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import Nav from '../Nav'
import Header from '../Header'
import FootTip from '../FootTip'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    borderRight: 0,
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
    },
  },
  nested: {
    paddingLeft: theme.spacing.unit * 2,
  },
})

class Layout extends Component {

  render() {
      
    const { classes, children, mobileOpen } = this.props

    const drawer = (
      <div>
        <Hidden smDown>
          <div className={classes.toolbar} />
        </Hidden>
        <MenuList>
          <Nav/>
        </MenuList>
      </div>
    )

    return <Fragment>
      <CssBaseline/>

      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <Menu />
            </IconButton>
            <Header />
          </Toolbar>
        </AppBar>
        <Hidden mdDown>
          <FootTip />
        </Hidden>  
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={this.props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </Fragment>
  }
}

export default compose(
  withContext,
  withRouter,
  withStyles(styles)
)(Layout)