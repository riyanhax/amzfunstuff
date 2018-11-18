'use strict'

const fs = require('fs')

const amazonfilepath = __dirname + '/data/amazon.json'
const etsyfilepath = __dirname + '/data/etsy.json'
const kickstarterfilepath = __dirname + '/data/kickstarter.json'
const othersfilepath = __dirname + '/data/others.json'

const categoriespath = __dirname + '/data/categories.json'

const main = () => {

    // load products from file
    let amazonproducts
    let etsyproducts
    let kickstarterproducts
    let othersproducts 

    try{
        amazonproducts = require(amazonfilepath)
        etsyproducts = require(etsyfilepath)
        kickstarterproducts = require(kickstarterfilepath)
        othersproducts = require(othersfilepath)
    }catch(ex){
        console.log('Error: invalid json')
        process.exit(1)
    }

    let allprodcuts = []
    allprodcuts = amazonproducts.concat(allprodcuts)
    allprodcuts = etsyproducts.concat(allprodcuts)
    allprodcuts = kickstarterproducts.concat(allprodcuts)
    allprodcuts = othersproducts.concat(allprodcuts)

    let categories = []

    // iterate each page to get catefories
    for(let product of allprodcuts){
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