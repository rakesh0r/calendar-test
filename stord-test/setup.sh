# chmod +x ./setup.sh
docker-compose -f mongo.yml up -d
echo "Installing frontend deps"
cd front-end
npm i
npm run build
echo "Installing backend deps"
cd ../back-end 
npm i
npm start
echo "navigate to http://localhost:3000"

