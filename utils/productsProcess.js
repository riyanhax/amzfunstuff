'use strict'

const fs = require('fs')

const inputfilepath = '../assets/products/gear-gadgets/weapons-armor/1.json'

let rawJson 

try{
    rawJson = require(inputfilepath)
}catch(ex){
    console.log('Error: invalid json')
}

let counter = 1

rawJson.products.forEach((product) => {
    product.id = counter
    counter++
})

let json = JSON.stringify(rawJson)

fs.writeFileSync(__dirname + '/../assets/output.json', json, 'utf8')

