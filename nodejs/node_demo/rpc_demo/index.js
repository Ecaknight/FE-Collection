const fs = require("fs");
const protoBuf = require("protocol-buffers");

const message = protoBuf(fs.readFileSync(`${__dirname}/test.proto`));

const buf1 = message.Course.encode({
  id: 1,
  price: 80.4,
  name: "liu",
});

console.log(buf1);

console.log(message.Course.decode(buf1));

const buf2 = message.Person.encode({
  id: 1,
  sex: "男",
  name: "liu",
});
console.log(buf2);
console.log(message.Person.decode(buf2));
