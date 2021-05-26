const net = require("net");

const socket = new net.Socket({});
const LESSON_IDS = [
  "136797",
  "136798",
  "136799",
  "136800",
  "136801",
  "136803",
  "136804",
  "136806",
  "136807",
  "136808",
  "136809",
  "141994",
  "143517",
  "143557",
  "143564",
  "143644",
  "146470",
  "146569",
  "146582",
];

socket.connect({
  host: "127.0.0.1",
  port: 4000,
});

let id = Math.floor(Math.random() * LESSON_IDS.length);
let oldBuffer = null;

socket.on("data", (buffer) => {
  if (oldBuffer) {
    buffer = Buffer.concat([oldBuffer, buffer]);
  }
  let completeLength = 0;

  while ((completeLength = checkComplete(buffer))) {
    const package = buffer.slice(0, completeLength);
    buffer = buffer.slice(completeLength);

    const res = decode(package);
  }
  oldBuffer = buffer;
});

function checkComplete(buffer) {
  if (buffer.length < 6) {
    return 0;
  }
  const length = buffer.readInt32BE(2);
  return 6 + length;
}

function decode(buffer) {
  const header = buffer.slice(0, 6);
  const seq = header.readInt16BE();

  const body = buffer.slice(6);

  return {
    seq,
    data: body.toString(),
  };
}

let seq = 0;
function encode(data) {
  const body = Buffer.alloc(4);
  body.writeInt32BE(LESSON_IDS[data.id]);

  const header = Buffer.alloc(6);
  header.writeInt16BE(seq);
  header.writeInt32BE(body.length, 2);

  const buffer = Buffer.concat([header, body]);

  console.log(`包${seq}传输的课程id为${LESSON_IDS[data.id]}`);
  seq++;
  return buffer;
}

for (let k = 0; k < 100; k++) {
  id = Math.floor(Math.random() * LESSON_IDS.length);
  socket.write(encode({ id }));
}
