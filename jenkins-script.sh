sudo pm2 delete GridFS-Drive
cd frontend/
npm install
npm run build
cd ..
cd backend/
npm install
sudo pm2 start ./bin/www --name "GridFS-Drive"
cd ..
