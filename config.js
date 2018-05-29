'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/MakeYourMove'//'mongodb://mongodb://rodrigo:Test@ds229290.mlab.com:29290/make-your-move';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/MakeYourMoveTest';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
