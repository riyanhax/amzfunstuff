'use strict'

const fs = require('fs')

const currentDate = '2019-04-14'
const amazonfilepath = __dirname + `/data/${currentDate}/amazon.json`
const etsyfilepath = __dirname + `/data/${currentDate}/etsy.json`
const kickstarterfilepath = __dirname + `/data/${currentDate}/kickstarter.json`
const othersfilepath = __dirname + `/data/${currentDate}/others.json`

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

    // split amazon products into batches (100 products each batch)
    const amazonbatches = createGroupedArray(amazonproducts, 100)
    let amazonbatchpath
    let amazoncounter = 1
    for(let batch of amazonbatches){
        amazonbatchpath = __dirname + `/data/${currentDate}/amazon/${amazoncounter}.json`
        fs.openSync(amazonbatchpath, 'w')
        const batchjson = JSON.stringify(batch, undefined, 2)
        fs.writeFileSync(amazonbatchpath, batchjson, 'utf8') 
        amazoncounter++
    }

    // split etsy products into batches (100 products each batch)
    const etsybatches = createGroupedArray(etsyproducts, 100)
    let etsybatchpath
    let etsycounter = 1
    for(let batch of etsybatches){
        etsybatchpath = __dirname + `/data/${currentDate}/etsy/${etsycounter}.json`
        fs.openSync(etsybatchpath, 'w')
        const batchjson = JSON.stringify(batch, undefined, 2)
        fs.writeFileSync(etsybatchpath, batchjson, 'utf8') 
        etsycounter++
    }

    // split products into batches (100 products each batch)
    const kickstarterbatches = createGroupedArray(kickstarterproducts, 100)
    let kickstarterbatchpath
    let kickstartercounter = 1
    for(let batch of kickstarterbatches){
        kickstarterbatchpath = __dirname + `/data/${currentDate}/kickstarter/${kickstartercounter}.json`
        fs.openSync(kickstarterbatchpath, 'w')
        const batchjson = JSON.stringify(batch, undefined, 2)
        fs.writeFileSync(kickstarterbatchpath, batchjson, 'utf8') 
        kickstartercounter++
    }

    // split others products into batches (100 products each batch)
    const othersbatches = createGroupedArray(othersproducts, 100)
    let othersbatchpath
    let otherscounter = 1
    for(let batch of othersbatches){
        othersbatchpath = __dirname + `/data/${currentDate}/others/${otherscounter}.json`
        fs.openSync(othersbatchpath, 'w')
        const batchjson = JSON.stringify(batch, undefined, 2)
        fs.writeFileSync(othersbatchpath, batchjson, 'utf8') 
        otherscounter++
    }
}

// Split an array into chunks of a given size (http://www.frontcoded.com/splitting-javascript-array-into-chunks.html)
const createGroupedArray = (arr, chunkSize) => {
    let groups = []
    let i 

    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
}

main()