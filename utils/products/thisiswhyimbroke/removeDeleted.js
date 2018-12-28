'use strict'

const fs = require('fs')

const filepath = __dirname + '/etl/2.json'

const main = () => {

    // load products from file
    let products 

    try{
        products = require(filepath)
    }catch(ex){
        console.log('Error: invalid json')
        process.exit(1)
    }

    // iterate each product to remove delted
    products = products.filter((product) => {
        return product.titleCN != 'deleted'
    })

    // write to files
    const json = JSON.stringify(products, undefined, 2)
    fs.writeFileSync(filepath, json, 'utf8') 
}

main()