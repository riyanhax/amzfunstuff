'use strict'

const fs = require('fs')

const inputfilepath = '../assets/products/whatsnew/6.json'

let rawJson 

try{
    rawJson = require(inputfilepath)
}catch(ex){
    console.log('Error: invalid json')
}

let counter = 1

rawJson.products.forEach((product) => {
    product.imageLarge = product.imageLarge.replace(/300x250/g, '640x534')
    product.category = 'gear-gadgets'
    product.subcategory = 'weapons-armor'
})

let json = JSON.stringify(rawJson)

fs.writeFileSync(__dirname + '/../assets/output.json', json, 'utf8')

