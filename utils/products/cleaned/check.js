'use strict'

const fs = require('fs')

const filepath = __dirname + '/products.json'

const main = () => {

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
            console.log(product.id)
        }
    } 
}

main()