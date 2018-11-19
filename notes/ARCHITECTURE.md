# ARCHITECTURE NOTES

# Components 

## App.js
* this is the fundamental component, and it contains the following 3 components:
    * added `Provider` component
        * `context.js` exported `withContext`
        * `getContext` method in `App.js` dictates what would be included in this central context
        * in order to access data stored in the central context via `this.props`, components need to import `withContext`
    * added `BrowserRouter` component
        * routes defined in config files under menu folder - `categories.json` and `subcategories.json` (except the following ones)
        * `/blogs` and `/guides` were handled by `Articles` component
        * `/about` was handled by `About` component
        * `/products/*` was handled by `ProductDetail` component (the url contains product id, which would be used in code to load the correct product)
        * `assets/*` and `articles/*` were handled by `reload()` method, which returns the resource based on the actual url (the resource can be an image under `assets` folder, or a html page under `articles` folder)
        * `404` was handled by `NotFound` component
    * added `Layout` component

## props
* if component composed `withContext`, then it can access central context data/methods via `this.props`
* if component composed `withRouter`, then it can access `location` via `this.props`
* if component composed `withStyles(styles)`, then it can access `classes` (defined at the top of each component) via `this.props`

## Layout.js
* this component implemented the `Responsive Drawer` (refer `TECH.md`)

## Nav.js
* this component build navigation bar based on `categories.json` and `subcategories.json` under `menus` folder
 
## Products.js
* this component can be used as
    * `independent` type: it will load products based on url (can be `whatsnew` or some category/subcategory)
    * `related` type: it will be used as related products in detailed product page, and will load products based on the passed in category/subcategory
    * `myfavs` type: it will be used in `/myfavs` page and display only liked products (based on localstorage) 
* banner subcomponent will only display on `whatsnew` 
* header subcomponent (title and description for category and subcategory, defined in `info.json` file) will only display on `non-whatsnew non-myfavs` 
* panel subcomponent will only display on `non-whatsnew non-myfavs` 
* content subcomponent will display on all situations
    * if products array not loaded yet, then display loading symbol
    * load products:
        * if pathname is either `/` or `/myfavs`, then need to load all products
        * otherwise, it only need to subset products based on category/subcategory
    * filter method:
        * if not `myfavs` type, then it will filter products basd on max/min prices set via price slider in panel (if panel was available on page and price slider was modified by user)
        * if `myfavs` type, then it will filter products based on whether the product is liked or not (via localstorage)
    * sort method:
        * if not used as `related` or `myfavs`, then products would be sorted based on the option selected (default value is 1, which is doing nothing
        * if used as `related` or `myfavs`, then products won't be sorted at all (using the default)
        * if used as `related`, products would be shuffled after loading so user would see different relatedproducts in detail product page each time
* this component also registered `resize` and `scroll` event - `resize` would help responsive UI, and `scroll` would help for dynamic data loading
* localStorage was used to store `likes` for each product 

## Product.js
* this compnent simply render product, the biggest task it does is to maintain a responsive UI based on `viewWidth` and `windowWidth` props passed from `Products.js` parent component 

## Articles.js & Article.js
* these 2 components were similar to `Products.js` and `Product.js`
* there are 2 types of Article - `myfavs` or `independent`, based on url
    * for `myfavs`, based on this.props.type, load blogs or guides; also, introduce `componentWillReceiveProps()` to deal with props change
    * for `independent`, based on url, load blogs or guides
* blogs and guides lists were stored under `articles/blogs or guides/x.json`