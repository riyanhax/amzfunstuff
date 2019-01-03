'use strict'

const fs = require('fs')

const inputfilepath = __dirname + '/products/cleaned/products.json'

let products 

try{
    products = require(inputfilepath)
}catch(ex){
    console.log('Error: invalid json')
}

products.forEach((product) => {
    product.link = product.link + '?tag=wuyongzhiqu-20'
})

let json = JSON.stringify(products, undefined, 2)

fs.writeFileSync(inputfilepath, json, 'utf8')

