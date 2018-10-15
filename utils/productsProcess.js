'use strict'

const fs = require('fs')

const inputfilepath = __dirname + '/../assets/products/gear-gadgets/weapons-armor/1.json'

let rawJson 

try{
    rawJson = require(inputfilepath)
}catch(ex){
    console.log('Error: invalid json')
}

rawJson.products.forEach((product) => {
    product.likes = product.price + 10
})

let json = JSON.stringify(rawJson, undefined, 2)

fs.writeFileSync(inputfilepath, json, 'utf8')

