'use strict'

const fs = require('fs')

const filepath = __dirname + '/data/amazon/1.json'
// const filepath = __dirname + '/data/etsy/1.json'
// const filepath = __dirname + '/data/kickstarter/1.json'
// const filepath = __dirname + '/data/others/1.json'

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
        delete product.content
        delete product.published
        delete product.uri
        delete product.source
        delete product.exId
        delete product.exLink
        delete product.type
    } 

    // write to files
    const json = JSON.stringify(products, undefined, 2)
    fs.writeFileSync(filepath, json, 'utf8') 
}

main()