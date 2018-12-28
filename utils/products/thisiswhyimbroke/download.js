'use strict'

const axios = require('axios') 
const fs = require('fs')

const filepath = __dirname + '/etl/4.json'

const main = async () => {

    // load products from file
    let products 

    try{
        products = require(filepath)
    }catch(ex){
        console.log('Error: invalid json')
        process.exit(1)
    }

    // iterate each page to download image
    for(let product of products){
        await download(product.id, product.imagelink)
    } 
}

// download image (based on this tutorial: https://futurestud.io/tutorials/download-files-images-with-axios-in-node-js)
const download = async (id, imagelink) => {

    const imagepath = __dirname + `/etl/images/4/${id}.jpg`
        
    const response = await axios({
        method: 'GET',
        url: imagelink,
        responseType: 'stream'
    })

    response.data.pipe(fs.createWriteStream(imagepath))

    return new Promise((resolve, reject) => {

        response.data.on('end', () => {
            resolve()
        })

        response.data.on('error', err => {
            reject(err)
        })
    }) 
}

main()