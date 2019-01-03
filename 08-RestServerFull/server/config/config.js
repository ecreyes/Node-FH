// =======================
//  Puerto
// =======================
process.env.PORT = process.env.PORT || 3000;

// =======================
//  JWT
// =======================

process.env.JWTExpire = process.env.JWTExpire || 60 * 60 * 24 * 30;
process.env.JWTSeed = process.env.JWTSeed ||'seed-development';