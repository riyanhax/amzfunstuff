productsProcess:
	node ./utils/productsProcess.js 

uploadSandbox:
	aws s3 sync ./dist s3://amzfunstuff --acl public-read --delete

### products extraction

# thisiswhyimbroke

retrieve-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/retrieve.js 

imagelink-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/imagelink.js 

imagedownload-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/imagedownload.js 