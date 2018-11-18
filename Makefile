productsProcess:
	node ./utils/productsProcess.js 

uploadSandbox:
	aws s3 sync ./dist s3://amzfunstuff --acl public-read --delete

### products extraction

# thisiswhyimbroke

scrap-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/scrap.js 

divide-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/divide.js 

image-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/image.js 

download-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/download.js 

clean-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/clean.js 

categories-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/categories.js 

