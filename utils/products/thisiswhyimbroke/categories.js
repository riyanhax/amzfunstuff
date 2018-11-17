'use strict'

const fs = require('fs')

const filepath = __dirname + '/data/data.json'
const categoriespath = __dirname + '/data/categories.json'

const main = () => {

    // load products from file
    let products 

    try{
        products = require(filepath)
    }catch(ex){
        console.log('Error: invalid json')
        process.exit(1)
    }

    let categories = []

    // iterate each page to get catefories
    for(let product of products){
        categories = product.categories.concat(categories)
    }

    // remove duplicate values, based on this tutorial: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    categories = categories.filter((value, index, self) => {
        return self.indexOf(value) === index
    })

    // write to file
    const json = JSON.stringify(categories, undefined, 2)
    fs.writeFileSync(categoriespath, json, 'utf8')  
}

main()