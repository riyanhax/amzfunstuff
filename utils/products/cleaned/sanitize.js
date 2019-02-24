'use strict'

const fs = require('fs')

// 'gear-and-gadgets-gifts'
const cat10 = [
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

// 'gifts-for-geeks'
const cat20 = [
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

// 'toy-gifts' & 'gifts-for-kids'
const cat30 = [
    'action-figures',
    'remote-control-toys',
    'plushies'
]

// 'wearable-gifts'
const cat40 = [
    'accessories',
    'clothing',
    'shoes',
    'jewelry',
    'hats-and-ties',
    'costumes',
    'glasses',
    'swimwear'
]

// 'home-and-office-gifts'
const cat50 = [
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

// 'food-and-drink-gifts'
const cat60 = [
    'drinks-and-edibles',
    'mugs-and-glasses',
    'eating-utensils',
    'molds-trays',
    'wine-gifts',
    'cooking'
]

// 'gifts-for-boyfriends' 
const cat70 = [
    'gifts-for-men',
    'man-cave-gifts',
    'alcoholic-gear',
    'smokers',
    'grooming'
]

// 'gifts-for-girlfriends' 
const cat80 = [
    'gifts-for-women',
    'wine-gifts',
    'romantic-gifts'
]

// const cat90 = [
//     'gifts-for-boyfriends'
// ]

// const cat100 = [
//     'gifts-for-girlfriends'
// ]

// 'gifts-for-boyfriends' & 'gifts-for-girlfriends'
const cat110 = [
    'gifts-for-couples',
    'nsfw-sexual'
]

// const cat120 = [
//     'gifts-for-dad'
// ]

// const cat130 = [
//     'gifts-for-mom'
// ]

// 'gifts-for-kids'
const cat140 = [
    'minecraft-gifts',
    'lego-2',
    'back-to-school',
    'gifts-for-babies'
]

// const cat160 = [
//     'college'
// ]

// const cat170 = [
//     'gifts-for-pets'
// ]

// const cat180 = [
//     'diy'
// ]

// 'wtf'
const cat190 = [
    'funny-gifts',
    'novelty-and-gag-gifts',
    'personalized-gifts',
    'prank',
    'experiences',
    'gift-ideas'
]

// 'wtf'
const cat200 = [
    'offensive',
    'blasphemy',
    'nsfw-general',
    'nsfw-sexual',
    'nsfw-drugs'
]

// 'gifts-for-boyfriends' & 'gifts-for-girlfriends'
const cat210 = [
    'anniversary-gifts'
]

// const cat220 = [
//     'birthday-gifts'
// ]

// const cat230 = [
//     'wedding'
// ]

const main = () => {

    // load existing products from file
    const productsfilepath = __dirname + '/products-2-etsy.json'
    let products = require(productsfilepath)

    console.log('products  ',products.length)

    for(let product of products){
        let catSet = new Set(product.categories)
        for(let cat of cat10){
            if(catSet.has(cat)){
                catSet.add('gear-and-gadgets-gifts')
            }
        }
        for(let cat of cat20){
            if(catSet.has(cat)){
                catSet.add('gifts-for-geeks')
            }
        }
        for(let cat of cat30){
            if(catSet.has(cat)){ 
                catSet.add('toy-gifts')
                catSet.add('gifts-for-kids')
            }
        }
        for(let cat of cat40){
            if(catSet.has(cat)){
                catSet.add('wearable-gifts')
            }
        }
        for(let cat of cat50){
            if(catSet.has(cat)){
                catSet.add('home-and-office-gifts')
            }
        }
        for(let cat of cat60){
            if(catSet.has(cat)){
                catSet.add('food-and-drink-gifts')
            }
        }
        for(let cat of cat70){
            if(catSet.has(cat)){
                catSet.add('gifts-for-boyfriends')
            }
        }
        for(let cat of cat80){
            if(catSet.has(cat)){
                catSet.add('gifts-for-girlfriends')
            }
        }
        for(let cat of cat110){
            if(catSet.has(cat)){ 
                catSet.add('gifts-for-boyfriends')
                catSet.add('gifts-for-girlfriends')
            }
        }
        for(let cat of cat140){
            if(catSet.has(cat)){
                catSet.add('gifts-for-kids')
            }
        }
        for(let cat of cat190){
            if(catSet.has(cat)){
                catSet.add('wtf')
            }
        }
        for(let cat of cat200){
            if(catSet.has(cat)){
                catSet.add('wtf')
            }
        }
        for(let cat of cat210){
            if(catSet.has(cat)){ 
                catSet.add('gifts-for-boyfriends')
                catSet.add('gifts-for-girlfriends')
            }
        }
        product.categories = Array.from(catSet)
    }

    // write to files
    const json = JSON.stringify(products, undefined, 2)
    fs.writeFileSync(productsfilepath, json, 'utf8') 
}

main()