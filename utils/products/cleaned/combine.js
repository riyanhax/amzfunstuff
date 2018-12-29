'use strict'

const fs = require('fs')

const main = () => {

    // load existing products from file
    const allproductsfilepath = __dirname + '/products.json'
    let allproducts = require(allproductsfilepath)

    console.log('existing products  ',allproducts.length)

    try{
        let count = 1
        let products 

        while(count != 5){
            let filepath = __dirname + `/${count}.json`
            products = require(filepath)
            allproducts = products.concat(allproducts)
            count++
        }
    }catch(ex){
        console.log('Error: invalid json')
        process.exit(1)
    }

    console.log('after combining ',allproducts.length)

    // write to files
    const json = JSON.stringify(allproducts, undefined, 2)
    fs.writeFileSync(allproductsfilepath, json, 'utf8') 
}

main()