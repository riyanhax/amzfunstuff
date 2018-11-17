'use strict'

const axios = require('axios') 
const fs = require('fs')
const shortid = require('shortid')

const amazonfilepath = __dirname + '/data/amazon.json'
const etsyfilepath = __dirname + '/data/etsy.json'
const kickstarterfilepath = __dirname + '/data/kickstarter.json'
const othersfilepath = __dirname + '/data/others.json'

// date to stop search (start date of last time)
const dateToStop = '2018-11-04T09:05:00.000Z'

const main = async () => {

    const productsURL = 'https://www.thisiswhyimbroke.com/api/lists/new'
    let counter = 1
    let next = true

    let amazon = []
    let etsy = []
    let kickstarter = []
    let others = []

    while(next){
        const content = await axios.get(`${productsURL}/${counter}`)
        const posts = content.data.posts

        // iterate posts to create product
        for(const post of posts){

            if(post.published == dateToStop){
                next = false
            }

            const product = {
                id: shortid.generate(),
                titleCN: '',
                titleEN: post.title,
                description: '',
                content: post.content,
                price: post.price,
                likes: post.saves,
                categories: JSON.parse(post.categories).filter((category) => { return category != 'thisiswhyimbroke' }),
                link: '',
                uri: `https://www.thisiswhyimbroke.com${post.uri}`,
                source: 'thisiswhyimbroke',
                exId: post.id,
                exLink: post.link
            }

            if(post.link.indexOf('amazon') != -1){
                amazon.push(product)
            }else if(post.link.indexOf('awin1') != -1){
                etsy.push(product)
            }else if(post.link.indexOf('kickstarter') != -1 || post.link.indexOf('kckb') != -1 || post.link.indexOf('indiegogo') != -1){
                kickstarter.push(product)
            }else{
                others.push(product)
            }

        }

        counter++
    }

    // write to files
    const amazonjson = JSON.stringify(amazon, undefined, 2)
    fs.writeFileSync(amazonfilepath, amazonjson, 'utf8')  

    const etsyjson = JSON.stringify(etsy, undefined, 2)
    fs.writeFileSync(etsyfilepath, etsyjson, 'utf8') 

    const kickstarterjson = JSON.stringify(kickstarter, undefined, 2)
    fs.writeFileSync(kickstarterfilepath, kickstarterjson, 'utf8') 

    const othersjson = JSON.stringify(others, undefined, 2)
    fs.writeFileSync(othersfilepath, othersjson, 'utf8') 
}

main()
