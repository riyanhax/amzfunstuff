productsProcess:
	node ./utils/productsProcess.js 

uploadSandbox:
	aws s3 sync ./dist s3://amzfunstuff --acl public-read --delete

### products extraction

# thisiswhyimbroke

scrap-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/scrap.js 

image-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/image.js 

download-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/download.js 