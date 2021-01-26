export default {
    hooks: {
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
    extra: {
      sentryDSN: process.env.SENTRY_DSN,
    },
  };