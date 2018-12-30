#### data scrap 

### thisiswhyimbroke

## data scrap usage:

# prerequisites
* create a folder named after current date under both `data` and `archive` folders 
* modify `currentDate` value in both `scrap.js` and `divide.js`

# run commands 
* run `make scrap-thisiswhyimbroke`
* run `make divide-thisiswhyimbroke`

# finish
* move `amazon.json`, `etsy.json`, `kickstarter.json`, and `others.json` from `data/currentDate` folder to `archieve/currentDate` folder

## commands:

# scrap data
* provide a stop date in `scrap.js` file before running the command , this command would scrap newest data from `thisiswhyimbroke.com` to the end date defined, and save the scrapped data into `amazon.json`, `etsy.json`, `kickstarter.json`, and `others.json` based on products' platforms
* command: `make scrap-thisiswhyimbroke`

# divide data
* divide data in `amazon.json`, `etsy.json`, `kickstarter.json`, and `others.json` into corresponding folders with smaller batches (100 products per batch) for later process
* command: `make divide-thisiswhyimbroke`



## data process usage:

# prerequisites
* copy ready-to-process json files from `data/currentDate/amazon` folder to `etl` folder
* create corresponding subfolder under `etl/images/` folder named after json file name
* change parameter in `countProducts.js`, `countImages.js`, `image.js`, `download.js`(2 parameters), `clean.js`

# run commands
* run `make countProducts-thisiswhyimbroke` to see initial products number
* run `make removeDeleted-thisiswhyimbroke` to remove deleted products
* run `make countProducts-thisiswhyimbroke` to see products number after removing deleted
* run `make image-thisiswhyimbroke` to get image link
* run `make download-thisiswhyimbroke` to download images 
* run `make countImages-thisiswhyimbroke` to see if the downloaded images match products
* run `make clean-thisiswhyimbroke` to clean json file

# finish
* move image subfolders from `etl/images` to `cleaned` folder
* move processed json files to `cleaned` folder

## commands:

# get image link
* based on the file path provided in the file, this command will get the image link for each product
* command: `make image-thisiswhyimbroke`

# download image
* based on the file path provided in the file, this command will download images for each product based on the image link retrieve from last step
* command: `make download-thisiswhyimbroke`

# remove deleted
* based on the file path provided in the file, this command will remove "deleted" products (whose "titleCN" being marked as "deleted")
* command: `make clean-thisiswhyimbroke`

# count products
* based on the file path provided in the file, this command will count products
* command: `make clean-thisiswhyimbroke`

# count images
* based on the folder path provided in the file, this command will count images
* command: `make clean-thisiswhyimbroke`

# clean product
* based on the file path provided in the file, this command will clean product (removing unnecessary attributes)
* command: `make clean-thisiswhyimbroke`





## combine cleaned data usage:

# prerequisite
* modify parameter for `move-thisiswhyimbroke` command in `Make` file
* modify parameter in `combine.js`, `countProducts.js`, `countImages.js`

# run commands
* run `make move-thisiswhyimbroke` to move images from subfolders to the main `images` folder
* run `make combine-thisiswhyimbroke` to combine new products `x.json` data into main `products.json` file
* run `make check-thisiswhyimbroke` to check if product has categories or if any category is not in the existing set
* run `make countProducts-thisiswhyimbroke` to see if products number correct
* run `make countImages-thisiswhyimbroke` to see if image number correct

# finish
* delete separate json files 

## generic 

# list categories (this step is only for reference)
* based on data.json file, list all categories and put the result in categories.json
* command: `categories-thisiswhyimbroke`
