import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import {
    MenuList, MenuItem, ListItemIcon, Icon, Divider
} from '@material-ui/core'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../context'

const styles = theme => ({
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
})

  
class Nav extends Component {

    // used to create nav and subnav in the drawer
    createMenus = (categories, subcategories, pathname, classes) => {
        const menus = []

        for(const id of Object.keys(categories)){
            // iterate nav items
            const navName = categories[id].name
            if(navName == 'divider'){
                menus.push(<Divider key={id}/>);
                continue
            }

            const navTo = categories[id].link
            const icon = <Icon className={classNames(classes.icon, categories[id].icon)} style={{fontSize:25}} />

            const selected = (navTo === pathname || navTo === `/${pathname.split('/')[1]}`)
            const menuItemClass = selected ? classes.menuItemSelected : classes.menuItem
            const navClass = selected ? classes.navSelected : classes.nav

            const navItem = navTo === '/' ? 
                            <MenuItem to={navTo} key={id} component={Link} selected={selected} className={menuItemClass} onClick={this.props.handleDrawerToggle}>
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

                const subNavItem = <MenuItem to={subNavTo} key={subId} className={menuItemClass} component={Link} selected={subNavTo === pathname} onClick={this.props.handleDrawerToggle}>
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
        const { classes, location: { pathname }, categories, subcategories } = this.props

        return this.createMenus(categories, subcategories, pathname, classes)
    }
}

export default compose(
    withContext,
    withRouter,
    withStyles(styles)
)(Nav)