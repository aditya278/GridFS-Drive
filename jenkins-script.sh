sudo pm2 stop all
cd frontend/
npm install
npm run build
cd ..
cd backend/
npm install
cd ..
sudo pm2 restart all
