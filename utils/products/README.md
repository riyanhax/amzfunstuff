# thisiswhyimbroke

## data scrap usage:

### prerequisites

* create a folder named after current date under both `data` and `archive` folders 

* modify `currentDate` value in both `scrap.js` and `divide.js`

### run commands 

* run `make scrap-thisiswhyimbroke`

* run `make divide-thisiswhyimbroke`

### finish

* move `amazon.json`, `etsy.json`, `kickstarter.json`, and `others.json` from `data/currentDate` folder to `archieve/currentDate` folder

## commands:

### scrap data

* provide a stop date in `scrap.js` file before running the command , this command would scrap newest data from `thisiswhyimbroke.com` to the end date defined, and save the scrapped data into `amazon.json`, `etsy.json`, `kickstarter.json`, and `others.json` based on products' platforms

* command: `make scrap-thisiswhyimbroke`

### divide data

* divide data in `amazon.json`, `etsy.json`, `kickstarter.json`, and `others.json` into corresponding folders with smaller batches (100 products per batch) for later process

* command: `make divide-thisiswhyimbroke`



## data process usage:

### prerequisites

* copy ready-to-process json files from `data/currentDate/amazon` folder to `etl` folder

* create corresponding subfolder under `etl/images/` folder named after json file name

* change parameter in `countProducts.js`, `countImages.js`, `image.js`, `download.js`(2 parameters), `clean.js`

### run commands

* run `make countProducts-thisiswhyimbroke` to see initial products number

* run `make removeDeleted-thisiswhyimbroke` to remove deleted products

* run `make countProducts-thisiswhyimbroke` to see products number after removing deleted

* run `make image-thisiswhyimbroke` to get image link

* run `make download-thisiswhyimbroke` to download images 

* run `make countImages-thisiswhyimbroke` to see if the downloaded images match products

* run `make clean-thisiswhyimbroke` to clean json file

### finish

* move image subfolders from `etl/images` to `cleaned` folder

* move processed json files to `cleaned` folder

## commands:

### get image link

* based on the file path provided in the file, this command will get the image link for each product

* command: `make image-thisiswhyimbroke`

### download image

* based on the file path provided in the file, this command will download images for each product based on the image link retrieve from last step

* command: `make download-thisiswhyimbroke`

### remove deleted

* based on the file path provided in the file, this command will remove "deleted" products (whose "titleCN" being marked as "deleted")

* command: `make clean-thisiswhyimbroke`

### count products

* based on the file path provided in the file, this command will count products

* command: `make clean-thisiswhyimbroke`

### count images

* based on the folder path provided in the file, this command will count images

* command: `make clean-thisiswhyimbroke`

### clean product

* based on the file path provided in the file, this command will clean product (removing unnecessary attributes)

* command: `make clean-thisiswhyimbroke`





## combine cleaned data usage:

### prerequisite

* modify parameter for `move-thisiswhyimbroke` command in `Make` file

* modify parameter in `combine.js`, `countProducts.js`, `countImages.js`, `sanitize.js`

### run commands

* run `make move-thisiswhyimbroke` to move images from subfolders to the main `images` folder

* manually copy all images from `cleaned/images` folder to `assets/images/products` folder

* create a new `products.json` file with empty array, run `make combine-thisiswhyimbroke` to combine new products `x.json` data into main `products.json` file

* change filename of `products.json` in order to indicate the batch and type (check http or https)

* (**change task in checker.js to check categories**) run `make check-thisiswhyimbroke` to check if product has titleCN, descrption, categories or if any category is not in the existing set

* run `make sanitize-thisiswhyimbroke` to sanitize categories (based on some categories, add certain category)

* (**change task in affiliate.js to add/remove affiliate id**) run `make affiliate-thisiswhyimbroke` to add/remove affiliate id into product link (for deployment/development)

* for etsy, need to manually add affiliate id

* replace quotes in all files

* (**change task in checker.js to create folders**) run `make check-thisiswhyimbroke` to create folder structures under `cleaned/products` based on the categories defined in `check.js` (*if any categories changes, please upadte `categories.json` & `subcategories.json` files under `src/menus` folder, `categories.md` file under `utils/thisiswhyimbroke/data` folder, and `check.js` file*)

* (**add new file into file array, and change task in cheker.js to distribute products**) run `make check-thisiswhyimbroke` to distribute products into corresponding folders


### finish

* delete separate json files 

* run `make  finalMoveProducts-thisiswhyimbroke` to delete the old folder structure under `assets/products` folder and move the newly created folder structure (with affiliate id) into it

* run `npm buildAll` to update dist folder 

* run `make deployProduction` to deploy to production

* run `make invalidateCF` to invalidate CloudFround

* (**change task to remove affiliate id**) run `make affiliate-thisiswhyimbroke` to remove affiliate id into product link

* run `make  finalMoveProducts-thisiswhyimbroke` to delete the old folder structure under `assets/products` folder and move the newly created folder structure (without affiliate id) into it

## commands:

### move images into main folder

* based on the file path specified in the Makefile, this command will move images from separate folder into the main folder

* command: `make move-thisiswhyimbroke`

### combine products into the main file

* based on the file number specified in `combine.js`, this command will combine products from each individual json files into the main `product.json` file

* command: `make combine-thisiswhyimbroke`

### check products, create folder structure, and distribute products

* based on the task value specified in `check.js`, this command will 1. check each product in `products.json` file and see if any product is missing `titleCN`, `description`, `categories`, or if any category not in predefined set; 2. create folder structure under `products` folder based on predefined categories; 3. distribute products into corresponding folders based on categories

* command: `make check-thisiswhyimbroke`

### final move images from cleaned/assets folder into assets/images folder

* this command will move the new images from `cleaned/images` folder into `assets/images` folder

* command: `make finalMoveImages-thisiswhyimbroke`

### final move products from cleaned/products folder into assets/products folder

* this command will first delete folder structures under `assets/products` folder and then move the newly created folder structure from `cleaned/products` folder into `assets/products` folder

* command: `make finalMoveProducts-thisiswhyimbroke`



## generic 

# list categories (this step is only for reference)

* based on data.json file, list all categories and put the result in categories.json

* command: `categories-thisiswhyimbroke`

## translation progress

* amazon - 1,2,3,4,5,6,7
* etsy - 1,2
