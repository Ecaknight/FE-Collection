// console.log(global);
// node -p "process.versions" 
// {
//   node: '12.14.1',
//   v8: '7.7.299.13-node.16',
//   uv: '1.33.1',
//   zlib: '1.2.11',
//   brotli: '1.0.7',
//   ares: '1.15.0',
//   modules: '72',
//   nghttp2: '1.40.0',
//   napi: '5',
//   llhttp: '2.0.1',
//   http_parser: '2.8.0',
//   openssl: '1.1.1d',
//   cldr: '35.1',
//   icu: '64.2',
//   tz: '2019c',
//   unicode: '12.1'
// }

process.versions // 版本环境信息
process.env // 具体的环境信息
process.release // node的版本和包地址
// stdin 输入流 stdout 输出流 stderr错误流
process.stdin.setEncoding('utf8')
process.stdin.on('readable', function () {
  var input = process.stdin.read()
  if (input !== null) {
    process.stdout.write(input)
    var command = input.trim()
    if (command === 'exit') {
      process.exit(0)
    }
  }
})
