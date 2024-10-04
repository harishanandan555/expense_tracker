export default {
    expo: {
      extra: {
        GOOGLE_CLIENT_ID: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
      },
      android: {
        package: 'com.example.myapp',
        versionCode: 1,
        googleServicesFile: './google-services.json', // Make sure you add this if using Firebase
      },
    },
  };