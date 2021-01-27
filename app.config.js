export default {
    "name": "ListBee",
    "slug": "ListBee",
    "version": "1.0.4",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.hmisonne.ListBee",
      "buildNumber": "1.0.17"
    },
    "web": {
      "favicon": "./assets/icon.png"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.hmisonne.ListBee",
      "versionCode": 32,
      "permissions": []
    },
    "hooks": {
      "postPublish": [
        {
          "file": "sentry-expo/upload-sourcemaps",
          "config": {
            "organization": process.env.SENTRY_ORGANIZATION,
            "project": "listbee",
            "authToken": process.env.SENTRY_AUTH_TOKEN
          }
        }
      ]
    },
  "extra": {
    sentryDSN: process.env.SENTRY_DSN,
  },
  };