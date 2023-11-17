const { sign, decode, verify } = require("jsonwebtoken");

const signToken = (payLoad, secret) => {
  const token = sign(payLoad, secret, {
    algorithm: "HS384",
    expiresIn: "1000d",
  });
  return token;
};

const token = signToken(
  { id: "umastringqualquer", email: "test@test.com" },
  "algumsegredo"
);
console.log(token);

console.log(decode(token, { complete: true }));

console.log(verify(token, "algumsegredo"));
