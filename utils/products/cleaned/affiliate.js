const fs = require('fs')

const files = ['products-1-amz.json', 'products-2-amz.json']

const task = 'attach affiliate id'
// const task = 'remove affiliate id'

const main = () => {

    switch (task) {
        case 'attach affiliate id':
            attachAffiliateId()
            break
        case 'remove affiliate id':
            removeAffiliateId()
            break
        default:
            break
    }

    
}

const attachAffiliateId = () => {

    // load products from file
    let products 
    let batch
    
    try{
        for(let file of files){
            let filepath = __dirname + '/' + file
            batch = require(filepath)
            products = batch.concat(products)
        }
    }catch(ex){
        console.log('Error: invalid json')
        process.exit(1)
    }

    // iterate each product to add affiliate id
    for(let product of products){
        if(product.link.indexOf('?') == -1){
            product.link = product.link + '?tag=wuyongzhiqu-20'
        }
    } 

    // write to files
    const json = JSON.stringify(products, undefined, 2)
    fs.writeFileSync(filepath, json, 'utf8') 
}

const removeAffiliateId = () => {
    
    // load products from file
    let products 
    let batch

    try{
        for(let file of files){
            let filepath = __dirname + '/' + file
            batch = require(filepath)
            products = batch.concat(products)
        }
    }catch(ex){
        console.log('Error: invalid json')
        process.exit(1)
    }

    // iterate each product to remove affiliate id
    for(let product of products){
        if(product.link.indexOf('?') != -1){
            product.link = product.link.split('?')[0]
        }
    } 

    // write to files
    const json = JSON.stringify(products, undefined, 2)
    fs.writeFileSync(filepath, json, 'utf8')

}

main()