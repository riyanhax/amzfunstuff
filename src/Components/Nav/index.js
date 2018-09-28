import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  AppBar, Toolbar, IconButton, Typography, Hidden, Drawer, CssBaseline, MenuList, MenuItem
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Menu } from '@material-ui/icons'
import { compose } from 'recompose'

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
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  hidden: {
    display: 'none',
  }
})

class Nav extends Component {

  state = {
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    console.log('handleDrawerToggle')
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  createMenus = (categories, subcategories, pathname, classes) => {
    const menus = []

    for(const id of Object.keys(categories)){
      const navTo = categories[id].link
      const navName = categories[id].name
      menus.push(<MenuItem to={navTo} key={id} component={Link} selected={navTo === pathname}>{navName}</MenuItem>);
      
      const subs = subcategories[id];
      if(subs){
        const submenus = [];

        for(const sub of subs){
          const subId = sub.id;
          const subNavTo = sub.link;
          const subNavname = sub.name;
          submenus.push(<MenuItem to={subNavTo} key={subId} className={(navTo === pathname || navTo === `/${pathname.split('/')[1]}`) ? classes.nested : classes.hidden} component={Link} selected={subNavTo === pathname} onClick={this.handleDrawerToggle}>{subNavname}</MenuItem>);
        }

        const listid = `/${id}-subs`
        menus.push(<MenuList key={listid} className={(navTo === pathname || navTo === `/${pathname.split('/')[1]}`) ? classes.nested : classes.hidden}>{submenus}</MenuList>)
      }
    }

    return menus;
  }

  render() {
      
    const { classes, location: { pathname }, children, categories, subcategories } = this.props
    const { mobileOpen } = this.state

    const drawer = (
      <div>
        <Hidden smDown>
          <div className={classes.toolbar} />
        </Hidden>
        <MenuList>
            {this.createMenus(categories, subcategories, pathname, classes)}
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
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <Menu />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Writers Blog
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={this.handleDrawerToggle}
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
  withRouter,
  withStyles(styles)
)(Nav)