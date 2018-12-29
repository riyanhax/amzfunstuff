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

const main = () => {

    const categories = cat10
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

    const categoriesSet = new Set(categories)

    console.log('categories set size: ', categoriesSet.size)
    console.log('\t')

    // load products from file
    let products 

    try{
        products = require(filepath)
    }catch(ex){
        console.log('Error: invalid json')
        process.exit(1)
    }

    // iterate each product to clean
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

main()