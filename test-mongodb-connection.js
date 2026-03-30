import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: 'server/.env' });

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Testing MongoDB Connection...');
console.log('Connection String:', MONGODB_URI.replace(/:[^:@]+@/, ':****@')); // Hide password

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ SUCCESS! Connected to MongoDB');
    console.log('Database:', mongoose.connection.db.databaseName);
    process.exit(0);
  })
  .catch(err => {
    console.log('❌ FAILED! Cannot connect to MongoDB');
    console.log('Error:', err.message);
    console.log('\nPossible reasons:');
    console.log('1. Username or password is incorrect');
    console.log('2. User does not exist in Database Access');
    console.log('3. IP not whitelisted in Network Access');
    console.log('4. Database name is incorrect');
    console.log('\nPlease check MongoDB Atlas:');
    console.log('- Database Access: Check user exists and has correct password');
    console.log('- Network Access: Add 0.0.0.0/0 to whitelist');
    process.exit(1);
  });
