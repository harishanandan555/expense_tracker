import SQLite from 'react-native-sqlite-storage';

// Enable SQLite debugging for development (optional)
SQLite.DEBUG(true);

// Open or create a database
const db = SQLite.openDatabase(
  {
    name: 'mydatabase.db', // Database name
    location: 'default',   // Store location (default is 'default')
  },
  () => {
    console.log('Database opened successfully');
  },
  error => {
    console.error('Error opening database:', error);
  }
);

export default db;
