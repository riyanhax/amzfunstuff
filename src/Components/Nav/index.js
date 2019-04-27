import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import {
    MenuItem, ListItemIcon, Icon, Divider
} from '@material-ui/core'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'

const styles = theme => ({
    hidden: {
        display: 'none',
    },
    nav: {
        fontSize: '.9rem',
        fontWeight: '200',
    },
    navSelected: {
        fontSize: '.9rem',
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
})

  
class Nav extends Component {

    // used to create nav and subnav in the drawer
    createMenus = (categories, pathname, classes) => {
        const menus = []

        for(const id of Object.keys(categories)){
            // iterate nav items
            if(categories[id].link == 'divider'){
                menus.push(<Divider key={id}/>);
                continue
            }
            if(categories[id].show != true){
                continue
            }
            const navName = categories[id].name
            const navTo = categories[id].link
            const icon = <Icon className={classNames(classes.icon, categories[id].icon)} style={{fontSize:25}} />

            const selected = (navTo === pathname || navTo === `/${pathname.split('/')[1]}`)
            const menuItemClass = selected ? classes.menuItemSelected : classes.menuItem
            const navClass = selected ? classes.navSelected : classes.nav

            const navItem = navTo == '/' || navTo == '/blogs' || navTo == '/guides' || navTo == '/about' || navTo == '/myfavs' ? 
                            <MenuItem to={navTo} key={id} component={Link} selected={selected} className={menuItemClass} onClick={this.props.handleDrawerToggle}>
                                <ListItemIcon className={classes.icon}>
                                {icon}
                                </ListItemIcon>
                                <span className={navClass}>{navName}</span>
                            </MenuItem>
                            :
                            <MenuItem to={navTo} key={id} component={Link} selected={selected} className={menuItemClass} onClick={this.props.handleDrawerToggle}>
                                <ListItemIcon className={classes.icon}>
                                {icon}
                                </ListItemIcon>
                                <span className={navClass}>{navName}</span>
                            </MenuItem>
            menus.push(navItem);
        }

        return menus;
    }

    render() {
        const { classes, location: { pathname }, categories } = this.props

        return this.createMenus(categories, pathname, classes)
    }
}

export default compose(
    withContext,
    withRouter,
    withStyles(styles)
)(Nav)