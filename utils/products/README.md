### data scrap 

## thisiswhyimbroke

# scrap data
* provide a stop date in `scrap.js` file before running the command , this command would scrap newest data from `thisiswhyimbroke.com` to the end date defined, and save the scrapped data into `amazon.json`, `etsy.json`, `kickstarter.json`, and `others.json` based on products' platforms
* command: `make scrap-thisiswhyimbroke`

# get image link
* based on the data retrieved above, this command will get the image link for each product
* command: `make image-thisiswhyimbroke`

# download image
* based on the image link retrieved in last step, this command will download images for each product
* command: `make download-thisiswhyimbroke`

# list categories (this step is only for reference)
* based on data.json file, list all categories and put the result in categories.json

## generic 

# translate
* use `https://codebeautify.org/online-json-editor`, choose `form` in right section, and translate