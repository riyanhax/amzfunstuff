import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import {
  AppBar, Toolbar, IconButton, Typography, Hidden, Drawer, CssBaseline, MenuList, MenuItem
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Menu } from '@material-ui/icons'
import { compose } from 'recompose'

import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';

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
    paddingLeft: theme.spacing.unit * 2,
  },
  hidden: {
    display: 'none',
  },
  nav: {
    fontSize: '1rem',
    fontWeight: '200'
  },
  navSelected: {
    fontSize: '1rem',
    fontWeight: '800'
  },
  subNav: {
    fontSize: '.8rem',
    fontWeight: '200'
  },
  subNavSelected: {
    fontSize: '.8rem',
    fontWeight: '800'
  },
  menuItem: {
    color: theme.palette.secondary.main,
    '& $icon': {
      color: theme.palette.secondary.main,
    },
  },
  menuItemSelected: {
    color: theme.palette.primary.main,
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
})

class Nav extends Component {

  state = {
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  createMenus = (categories, subcategories, pathname, classes) => {
    const menus = []

    for(const id of Object.keys(categories)){
      // iterate nav items

      const navTo = categories[id].link
      const navName = categories[id].name
      const icon = <Icon className={classNames(classes.icon, categories[id].icon)} style={{fontSize:25}} />

      const selected = (navTo === pathname || navTo === `/${pathname.split('/')[1]}`)
      const menuItemClass = selected ? classes.menuItemSelected : classes.menuItem
      const navClass = selected ? classes.navSelected : classes.nav

      const navItem = navTo === '/' ? 
                      <MenuItem to={navTo} key={id} component={Link} selected={selected} className={menuItemClass} onClick={this.handleDrawerToggle}>
                        <ListItemIcon className={classes.icon}>
                          {icon}
                        </ListItemIcon>
                        <span className={navClass}>{navName}</span>
                      </MenuItem>
                      :
                      <MenuItem to={navTo} key={id} component={Link} selected={selected} className={menuItemClass}>
                        <ListItemIcon className={classes.icon}>
                          {icon}
                        </ListItemIcon>
                        <span className={navClass}>{navName}</span>
                      </MenuItem>
      menus.push(navItem);
      
      const subs = subcategories[id];
      if(subs){
        const submenus = [];
        
        for(const sub of subs){
           // if sub items exists, iterate sub nav items

          const subId = sub.id;
          const subNavTo = sub.link;
          const subNavname = sub.name;
          const icon = <Icon className={classNames(classes.icon, sub.icon)} style={{fontSize:20}} />

          const visible = (navTo === pathname || navTo === `/${pathname.split('/')[1]}`)
          const selected = subNavTo === pathname
          const menuItemClass = visible ? selected ? classNames(classes.menuItemSelected, classes.nested) : classNames(classes.menuItem, classes.nested) : classes.hidden
          const subNavClass = selected ? classes.subNavSelected : classes.subNav

          const subNavItem = <MenuItem to={subNavTo} key={subId} className={menuItemClass} component={Link} selected={subNavTo === pathname} onClick={this.handleDrawerToggle}>
                                <ListItemIcon className={classes.icon}>
                                  {icon}
                                </ListItemIcon>
                                <span className={subNavClass}>{subNavname}</span>
                             </MenuItem>
          submenus.push(subNavItem);
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