'use strict'

const axios = require('axios') 
const fs = require('fs')

const filepath = __dirname + '/data.json'

// date to stop search (start date of last time)
const dateToStop = '2018-11-11T09:02:00.000Z'

const main = async () => {

    const productsURL = 'https://www.thisiswhyimbroke.com/api/lists/new'
    let counter = 1
    let next = true
    let products = []

    while(next){
        const content = await axios.get(`${productsURL}/${counter}`)
        const posts = content.data.posts

        // iterate posts to create product
        for(const post of posts){

            if(post.published == dateToStop){
                next = false
            }

            if(post.link.indexOf('amazon') == -1){
                continue
            }

            let product = {
                id: post.link.split('dp/')[1].split('/')[0],
                titleCN: '',
                titleEN: post.title,
                description: '',
                content: post.content,
                price: post.price,
                likes: post.saves,
                categories: post.categories,
                link: '',
                uri: `https://www.thisiswhyimbroke.com${post.uri}`,
                source: 'thisiswhyimbroke',
                exId: post.id
            }
            products.push(product)
        }

        counter++
    }

    // write to file
    const json = JSON.stringify(products, undefined, 2)
    fs.writeFileSync(filepath, json, 'utf8')  
}

main()
