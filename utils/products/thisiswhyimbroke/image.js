'use strict'

const puppeteer = require('puppeteer')
const fs = require('fs')

const filepath = __dirname + '/etl/7.json'

const main = async () => {

    // load products from file
    let products 

    try{
        products = require(filepath)
    }catch(ex){
        console.log('Error: invalid json')
        process.exit(1)
    }

    // initialize puppeteer
    const width = 1000
    const height = 800

    const browser = await puppeteer.launch({
        headless: false,
        args: [
            `--window-size=${width},${height}`
        ],
    })

    const pages = await browser.pages()

    await pages[0].setViewport({
        width,
        height
    })

    // iterate each page to get imagelink
    for(let product of products){

        await pages[0].goto(product.uri, {
            waituntil: "networkidle0"
        })

        await pages[0].waitFor(1000)

        const imagelinks = await pages[0].evaluate(
            () => [...document.querySelectorAll('div.flex-image > a > img')]
            .map(img => img.src)
        )

        product.imagelink = imagelinks[0]
    }

    // close browser
    browser.close()

    // write to file
    const json = JSON.stringify(products, undefined, 2)
    fs.writeFileSync(filepath, json, 'utf8')  
}

main()