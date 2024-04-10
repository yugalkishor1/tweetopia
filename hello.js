twitter-clone-backend/
├── src/
│   ├── app.js
│   ├── config/
│   │   ├── database.js
│   │   ├── environment.js
│   │   ├── socket.js
│   │   └── s3.js # New file for AWS S3 configuration
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   ├── userController.js
│   │   ├── commentController.js
│   │   ├── likeController.js
│   │   └── followController.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── error.js
│   │   └── fileUpload.js # New file for file upload middleware
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Comment.js
│   │   ├── Like.js
│   │   └── Follow.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   ├── userRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── likeRoutes.js
│   │   └── followRoutes.js
│   └── utils/
│       ├── fileUpload.js # New file for file upload utility
│       ├── notificationHandler.js
│       └── tokenHandler.js
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md










