'use strict'

const filepath = __dirname + '/thisiswhyimbroke/etl/2.json'
// const filepath = __dirname + '/cleaned/products.json'

const main = () => {

    // load products from file
    let products 

    try{
        products = require(filepath)
    }catch(ex){
        console.log('Error: invalid json')
        process.exit(1)
    }

    console.log('totle products: ', products.length)
}

main()