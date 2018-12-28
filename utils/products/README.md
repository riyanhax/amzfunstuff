### data scrap 

## thisiswhyimbroke

# scrap data
* provide a stop date in `scrap.js` file before running the command , this command would scrap newest data from `thisiswhyimbroke.com` to the end date defined, and save the scrapped data into `amazon.json`, `etsy.json`, `kickstarter.json`, and `others.json` based on products' platforms
* command: `make scrap-thisiswhyimbroke`

# divide data
* divide data in `amazon.json`, `etsy.json`, `kickstarter.json`, and `others.json` into corresponding folders with smaller batches (100 products per batch) for later process
* command: `make divide-thisiswhyimbroke`

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

# list categories (this step is only for reference)
* based on data.json file, list all categories and put the result in categories.json
* command: `categories-thisiswhyimbroke`

## generic 

# translate
* use `https://codebeautify.org/online-json-editor`, choose `form` in right section, and translate
* remove picture metadata
    * `brew update` & `brew install imagemagick`
    * [possible solution](https://superuser.com/questions/335489/how-to-strip-exif-info-from-files-in-osx-with-batch-or-command-line)