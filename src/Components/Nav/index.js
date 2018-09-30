import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import {
  AppBar, Toolbar, IconButton, Grid, Hidden, Drawer, CssBaseline, MenuList, MenuItem
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
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
    },
  },
  nested: {
    paddingLeft: theme.spacing.unit * 2,
  },
  //custom css
  // nav
  hidden: {
    display: 'none',
  },
  nav: {
    fontSize: '1rem',
    fontWeight: '200',
  },
  navSelected: {
    fontSize: '1rem',
    fontWeight: '800',
  },
  subNav: {
    fontSize: '.8rem',
    fontWeight: '200',
  },
  subNavSelected: {
    fontSize: '.8rem',
    fontWeight: '800',
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
  // header
  header: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth
    },
    marginLeft: 10,
  },
  headerItem: {
    display: 'inline-block',
    cursor: 'pointer',
  },
  vertical: {
    height: 20,
    width: .5,
    backgroundColor: 'white',
    opacity: 0.5,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '900',
  }
})

class Nav extends Component {

  state = {
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  // custom method - nav to specified link (either open new window or redirect in same window)
  navToLink = (link, newWindow) => {
    if(newWindow){
      window.open(link)
    }else{
      window.location.replace(link)
    }
  }

  // custom method - used to create nav and subnav in the drawer
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

    // custom code - used to construct header
    const logo = <div onClick={() => this.navToLink('/', false)}><Icon className={classNames(classes.headerItem, 'fas fa-hamsa')} style={{fontSize:30}}/></div>
    const vertical = <div className={classNames(classes.headerItem, classes.vertical)}></div>
    const title = <div className={classNames(classes.headerItem, classes.title)} onClick={() => this.navToLink('/', false)}>奇葩好物</div>

    const pinterest = <div onClick={() => this.navToLink('https://www.pinterest.com', true)}><Icon className={classNames(classes.headerItem, 'fab fa-pinterest')} style={{fontSize:15, marginLeft:2}} /></div>
    const twitter = <div onClick={() => this.navToLink('https://www.twitter.com', true)}><Icon className={classNames(classes.headerItem, 'fab fa-twitter')} style={{fontSize:15, marginLeft:2}} /></div>
    const facebook = <div onClick={() => this.navToLink('https://www.facebook.com', true)}><Icon className={classNames(classes.headerItem, 'fab fa-facebook')} style={{fontSize:15, marginLeft:2}} /></div>
    const wechat = <div onClick={() => this.navToLink('/', true)}><Icon className={classNames(classes.headerItem, 'fab fa-weixin')} style={{fontSize:15, marginLeft:2}} /></div>

    const header = <div className={classes.header}>
                      <Grid container>   
                        <Grid item xs={8}>
                          <Grid container alignItems="center">  
                            {logo}{vertical}{title}
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <Grid container justify="flex-end" alignItems="center" style={{height:'100%'}}>  
                            {pinterest}{twitter}{facebook}{wechat}
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
    
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
            {header}
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