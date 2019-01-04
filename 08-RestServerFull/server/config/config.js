// =======================
//  Puerto
// =======================
process.env.PORT = process.env.PORT || 3000;

// =======================
//  JWT
// =======================

process.env.JWTExpire = process.env.JWTExpire || '7d';
process.env.JWTSeed = process.env.JWTSeed ||'seed-development';