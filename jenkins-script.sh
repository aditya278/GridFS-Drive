pm2 stop GridFS-Drive
cd frontend/
npm install
npm run build
cd ..
cd backend/
npm install
cd ..
pm2 restart GridFS-Drive
