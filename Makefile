productsProcess:
	node ./utils/productsProcess.js 

uploadSandbox:
	aws s3 sync ./dist s3://amzfunstuff --acl public-read --delete

### products extraction

# thisiswhyimbroke

countProducts-thisiswhyimbroke:
	node ./utils/products/countProducts.js 

countImages-thisiswhyimbroke:
	node ./utils/products/countImages.js

scrap-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/scrap.js 

divide-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/divide.js 

image-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/image.js 

download-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/download.js 

removeDeleted-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/removeDeleted.js 

clean-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/clean.js 

move-thisiswhyimbroke:
	mv ./utils/products/cleaned/4/* ./utils/products/cleaned/images

combine-thisiswhyimbroke:
	node ./utils/products/cleaned/combine.js 

categories-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/categories.js 

