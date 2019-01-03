productsProcess:
	node ./utils/productsProcess.js 

### deployment 

uploadSandbox:
	aws s3 sync ./dist s3://amzfunstuff --acl public-read --delete

deployProduction:
	aws s3 sync ./dist s3://wuyongzhiqu --acl public-read --delete

invalidateCF:
	aws cloudfront create-invalidation --distribution-id EP0XA8CMBAAN --paths "/*"

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

check-thisiswhyimbroke:
	node ./utils/products/cleaned/check.js 

affiliate-thisiswhyimbroke:
	node ./utils/products/cleaned/affiliate.js 

categories-thisiswhyimbroke:
	node ./utils/products/thisiswhyimbroke/categories.js 

