'use strict'

const fs = require('fs')

const filepath = __dirname + '/products.json'

const cat10 = [
    'gear-and-gadgets-gifts',
    'tools',
    'weapons-and-armor',
    'apocalypse-survival',
    'transportation',
    'electronic-gadgets',
    'gifts-for-travelers',
    'gifts-for-photographers',
    'health-and-fitness',
    'musical-instruments',
    'bicycling',
    'alcoholic-gear',
    'camping-outdoors',
    'everyday-carry',
    'wallets',
    'car-accessories',
    'sports-equiptment',
    'road-trip',
    'smart-home',
    'miscellaneous'
]

const cat20 = [
    'gifts-for-geeks',
    'gifts-for-gamers',
    'gifts-for-computer-geeks',
    'internet-humor',
    'star-wars-gifts',
    'legend-of-zelda',
    'doctor-who',
    'hello-kitty',
    'minecraft-gifts',
    'harry-potter-gifts',
    'batman',
    'pokemon',
    'game-of-thrones',
    'star-trek',
    'breaking-bad',
    'portal',
    'lord-of-the-rings',
    'transformers',
    'tetris',
    'skyrim-gifts',
    'thinkgeek',
    '3d-printed-stuff',
    'lego-2',
    'super-mario',
    'space',
    'starcraft'
]

const cat30 = [
    'toy-gifts',
    'action-figures',
    'remote-control-toys',
    'plushies'
]

const cat40 = [
    'wearable-gifts',
    'accessories',
    'clothing',
    'shoes',
    'jewelry',
    'hats-and-ties',
    'costumes',
    'glasses',
    'swimwear'
]

const cat50 = [
    'home-and-office-gifts',
    'lights-and-clocks',
    'office-goodies',
    'furniture',
    'kitchen-and-cooking',
    'bedroom',
    'bathroom',
    'pool-and-water',
    'yard-and-garden',
    'home-decor',
    'books-and-reading',
    'home-security',
    'housewarming-gifts',
    'cleaning',
    'gifts-for-coffee-lovers',
    'office-and-work-gifts'
]

const cat60 = [
    'food-and-drink-gifts',
    'drinks-and-edibles',
    'mugs-and-glasses',
    'eating-utensils',
    'molds-trays',
    'wine-gifts',
    'cooking'
]

const cat70 = [
    'gifts-for-men',
    'man-cave-gifts',
    'alcoholic-gear',
    'smokers',
    'grooming'
]

const cat80 = [
    'gifts-for-women',
    'wine-gifts',
    'romantic-gifts'
]

const cat90 = [
    'gifts-for-boyfriends'
]

const cat100 = [
    'gifts-for-girlfriends'
]

const cat110 = [
    'gifts-for-couples',
    'nsfw-sexual'
]

const cat120 = [
    'gifts-for-dad'
]

const cat130 = [
    'gifts-for-mom'
]

const cat140 = [
    'gifts-for-kids',
    'minecraft-gifts',
    'lego-2',
    'back-to-school'
]

const cat150 = [
    'gifts-for-babies'
]

const cat160 = [
    'college'
]

const cat170 = [
    'gifts-for-pets'
]

const cat180 = [
    'diy'
]

const cat190 = [
    'funny-gifts',
    'novelty-and-gag-gifts',
    'personalized-gifts',
    'prank',
    'experiences',
    'gift-ideas'
]

const cat200 = [
    'wtf',
    'offensive',
    'blasphemy',
    'nsfw-general',
    'nsfw-sexual',
    'nsfw-drugs'
]

const cat210 = [
    'anniversary-gifts'
]

const cat220 = [
    'birthday-gifts'
]

const cat230 = [
    'wedding'
]

const cat240 = [
    'cheap-christmas-gifts'
]

const cat250 = [
    'christmas-gifts',
    'ugly-christmas-sweaters'
]

const cat260 = [
    'halloween-gifts'
]

const cat270 = [
    'valentines',
    'valentines-cards'
]

let categories 
let categoriesSet

let bigMap = {
    'whatsnew':[]
}

// const task = 'check categories'
// const task = 'create folders'
const task = 'distribute products'

const main = () => {

    switch (task) {
        case 'check categories':
            checkCategories()
            break
        case 'create folders':
            createFolders()
            break
        case 'distribute products':
            distributeProducts()
            break
        default:
            break
    }

    
}

/** check products.json and see if any product has no categories or has incorrect categories **/

const checkCategories = () => {
    
    initializeCategoriesSet()

    // load products from file
    let products 

    try{
        products = require(filepath)
    }catch(ex){
        console.log('Error: invalid json')
        process.exit(1)
    }

    // iterate each product to check
    for(let product of products){
        if(product.categories.length == 0){
            console.log('this product has no categories')
            console.log('product id: ', product.id)
            console.log('\t')
            continue
        }

        let foundIssue = false
        let wrongCats = []
        for(let category of product.categories){
            if(!categoriesSet.has(category)){
                foundIssue = true
                wrongCats.push(category)
            }
        }
        if(foundIssue){
            console.log('the following categories not included in set')
            console.log('product id: ', product.id)
            console.log('categories: ', wrongCats)
            console.log('\t')
        }
    } 
}

const initializeCategoriesSet = () => {
    categories = cat10
                        .concat(cat20)
                        .concat(cat30)
                        .concat(cat40)
                        .concat(cat50)
                        .concat(cat60)
                        .concat(cat70)
                        .concat(cat80)
                        .concat(cat90)
                        .concat(cat100)
                        .concat(cat110)
                        .concat(cat120)
                        .concat(cat130)
                        .concat(cat140)
                        .concat(cat150)
                        .concat(cat160)
                        .concat(cat170)
                        .concat(cat180)
                        .concat(cat190)
                        .concat(cat200)
                        .concat(cat210)
                        .concat(cat220)
                        .concat(cat230)
                        .concat(cat240)
                        .concat(cat250)
                        .concat(cat260)
                        .concat(cat270)

    console.log('categories array length: ', categories.length)
    console.log('\t')

    categoriesSet = new Set(categories)

    console.log('categories set size: ', categoriesSet.size)
    console.log('\t')
}

/** create folders under cleaned/products based on catXs **/

const createFolders = () => {

    const whatsnewPath = __dirname + `/products/whatsnew`
    fs.mkdirSync(whatsnewPath)

    createFoldersForOneCat(cat10)
    createFoldersForOneCat(cat20)
    createFoldersForOneCat(cat30)
    createFoldersForOneCat(cat40)
    createFoldersForOneCat(cat50)
    createFoldersForOneCat(cat60)
    createFoldersForOneCat(cat70)
    createFoldersForOneCat(cat80)
    createFoldersForOneCat(cat90)
    createFoldersForOneCat(cat100)
    createFoldersForOneCat(cat110)
    createFoldersForOneCat(cat120)
    createFoldersForOneCat(cat130)
    createFoldersForOneCat(cat140)
    createFoldersForOneCat(cat150)
    createFoldersForOneCat(cat160)
    createFoldersForOneCat(cat170)
    createFoldersForOneCat(cat180)
    createFoldersForOneCat(cat190)
    createFoldersForOneCat(cat200)
    createFoldersForOneCat(cat210)
    createFoldersForOneCat(cat220)
    createFoldersForOneCat(cat230)
    createFoldersForOneCat(cat240)
    createFoldersForOneCat(cat250)
    createFoldersForOneCat(cat260)
    createFoldersForOneCat(cat270)
}

const createFoldersForOneCat = (catX) => {
    const rootPath = __dirname + `/products/${catX[0]}`
    fs.mkdirSync(rootPath)

    if(catX.length > 1){
        for(let i = 1; i < catX.length; i++){
            const folderPath = __dirname + `/products/${catX[0]}/${catX[i]}`
            fs.mkdirSync(folderPath)
        }
    }
} 

/** distribute products to corresponding folders **/

const distributeProducts = () => {
    createBigMap()

    // load products from file
    let products 

    try{
        products = require(filepath)
    }catch(ex){
        console.log('Error: invalid json')
        process.exit(1)
    }

    // iterate each product to distribute it
    for(let product of products){

        // add every product into whatsnew
        const product_c = copyProduct(product)
        delete product_c.categories
        product_c.category = 'whatsnew'
        product_c.subcategory = ''
        bigMap['whatsnew'].push(product_c)

        // iterate each category of current product
        for(let category of product.categories){
            distributeProductsForOneCat(category, product, cat10)
            distributeProductsForOneCat(category, product, cat20)
            distributeProductsForOneCat(category, product, cat30)
            distributeProductsForOneCat(category, product, cat40)
            distributeProductsForOneCat(category, product, cat50)
            distributeProductsForOneCat(category, product, cat60)
            distributeProductsForOneCat(category, product, cat70)
            distributeProductsForOneCat(category, product, cat80)
            distributeProductsForOneCat(category, product, cat90)
            distributeProductsForOneCat(category, product, cat100)
            distributeProductsForOneCat(category, product, cat110)
            distributeProductsForOneCat(category, product, cat120)
            distributeProductsForOneCat(category, product, cat130)
            distributeProductsForOneCat(category, product, cat140)
            distributeProductsForOneCat(category, product, cat150)
            distributeProductsForOneCat(category, product, cat160)
            distributeProductsForOneCat(category, product, cat170)
            distributeProductsForOneCat(category, product, cat180)
            distributeProductsForOneCat(category, product, cat190)
            distributeProductsForOneCat(category, product, cat200)
            distributeProductsForOneCat(category, product, cat210)
            distributeProductsForOneCat(category, product, cat220)
            distributeProductsForOneCat(category, product, cat230)
            distributeProductsForOneCat(category, product, cat240)
            distributeProductsForOneCat(category, product, cat250)
            distributeProductsForOneCat(category, product, cat260)
            distributeProductsForOneCat(category, product, cat270)
        }
    }

    // write arrays into files
    for(let key of Object.keys(bigMap)){
        writeToFile(key, bigMap[key])
    }

}

const writeToFile = (key, array) => {
    let writeToPath
    if(key.indexOf('|') != -1){
        writeToPath = __dirname + `/products/${key.split('|')[0]}/${key.split('|')[1]}`
    }else{
        writeToPath = __dirname + `/products/${key}`
    }
    
    const arraybatches = createGroupedArray(array, 100)
    for(let i = 0; i < arraybatches.length; i++){
        // construct content
        const content = {}
        if(i == arraybatches.length - 1){
            content.next = false
        }else{
            content.next = true
        }
        content.products = arraybatches[i]

        const batchWriteToPath = writeToPath+`/${i+1}.json`
        fs.openSync(batchWriteToPath, 'w')
        const batchjson = JSON.stringify(content, undefined, 2)
        fs.writeFileSync(batchWriteToPath, batchjson, 'utf8') 
    }
}

// Split an array into chunks of a given size (http://www.frontcoded.com/splitting-javascript-array-into-chunks.html)
const createGroupedArray = (arr, chunkSize) => {
    let groups = []
    let i 

    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
}

const distributeProductsForOneCat = (category, product, catX) => {
    // compare current category aganist each value in catX
    for(let i = 0; i < catX.length; i++){
        // if category equals to a value in catX, then put the product into corresponding array based on if the value is category or subcategory
        if(category == catX[i]){
            const product_c = copyProduct(product)
            delete product_c.categories
            product_c.category = catX[0]

            if(i == 0){
                product_c.subcategory = ''
                bigMap[catX[0]].push(product_c)
            }else{
                product_c.subcategory = catX[i]
                bigMap[catX[0]+'|'+catX[i]].push(product_c)
            }
        }
    }
}

const copyProduct = (src) => {
    return JSON.parse(JSON.stringify(src));
}

const createBigMap = () => {
    
    bigMap = initializeBigMap(cat10, bigMap)
    bigMap = initializeBigMap(cat20, bigMap)
    bigMap = initializeBigMap(cat30, bigMap)
    bigMap = initializeBigMap(cat40, bigMap)
    bigMap = initializeBigMap(cat50, bigMap)
    bigMap = initializeBigMap(cat60, bigMap)
    bigMap = initializeBigMap(cat70, bigMap)
    bigMap = initializeBigMap(cat80, bigMap)
    bigMap = initializeBigMap(cat90, bigMap)
    bigMap = initializeBigMap(cat100, bigMap)
    bigMap = initializeBigMap(cat110, bigMap)
    bigMap = initializeBigMap(cat120, bigMap)
    bigMap = initializeBigMap(cat130, bigMap)
    bigMap = initializeBigMap(cat140, bigMap)
    bigMap = initializeBigMap(cat150, bigMap)
    bigMap = initializeBigMap(cat160, bigMap)
    bigMap = initializeBigMap(cat170, bigMap)
    bigMap = initializeBigMap(cat180, bigMap)
    bigMap = initializeBigMap(cat190, bigMap)
    bigMap = initializeBigMap(cat200, bigMap)
    bigMap = initializeBigMap(cat210, bigMap)
    bigMap = initializeBigMap(cat220, bigMap)
    bigMap = initializeBigMap(cat230, bigMap)
    bigMap = initializeBigMap(cat240, bigMap)
    bigMap = initializeBigMap(cat250, bigMap)
    bigMap = initializeBigMap(cat260, bigMap)
    bigMap = initializeBigMap(cat270, bigMap)

    console.log('bigMap ',bigMap)
}

const initializeBigMap = (catX, bigMap) => {

    for(let i = 0; i < catX.length; i++){
        if(i == 0){
            bigMap[catX[i]] = []
        }else{
            bigMap[catX[0]+'|'+catX[i]] = []
        }
    }

    return bigMap
}


main()