const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

// 每个模块的id
let ID = 0;

/**
 * 根据入口文件获取一些映射信息
 * @param {string} fileName 
 */
function createAsset(fileName) {
  // 读取入口文件内容
  const content = fs.readFileSync(fileName,'utf-8');

  // 利用@babel/parser将入口文件内容转换为AST抽象语法树
  const ast = parser.parse(content, {
    sourceType:'module'
  });

  /**
   * 在生成ast后需要根据ast找到该依赖关系，方法是通过ast中的ImportDeclaration.source.value
   * 这个值会是一个路径，也就是它所依赖的文件的路径，具体可以通过这个网站分析ast:
   * https://astexplorer.net/
   * 打开后把index.js中的内容粘贴到左侧，右侧即可自动生成ast内容
   */

  // 这个数组用来存放入口文件的依赖关系，因为它可能引入了多个依赖的文件，所以是个数组
  const dependencies = [];

  // 这里利用@babel/traverse解析ast，拿到入口文件所依赖的文件的路径，也就是依赖关系集合，存放在数组dependencies中
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    }
  });

  // 这里利用babel以及它的预设插件集合@babel/preset-env，将es6代码转换成es5代码
  const { code } = babel.transformFromAstSync(ast, null, {
    presets:['@babel/preset-env']
  });

  // 这是每个模块的id，每个模块的id都不一样，自增
  let id = ID ++;

  // 把模块id，文件路径fileName，转换成es5后的代码code，依赖关系集合dependencies，一起返回
  return { id, fileName, code, dependencies };
}

/**
 * 获取所有模块的依赖信息
 * @param {string} entry 
 */
function createGraph(entry){
  // 根据入口文件拿到一些依赖信息
  const mainAsset = createAsset(entry);

  // 利用队列循环(或者递归)找出所有依赖关系
  const queue = [mainAsset];

  for(const asset of queue){
    // 获取入口文件的绝对路径
    const dirname = path.dirname(asset.fileName);

    asset.mapping = {};

    asset.dependencies.forEach(relativePath => {
      // 因为入口文件拿到的文件依赖关系是相对路径，和当前js文件不在同一个目录下，所以要转换成绝对路径
      const absolutePath = path.join(dirname, relativePath);
      // 拿到入口文件中子文件的依赖关系
      const childAsset = createAsset(absolutePath);
      // 存放路径与模块id的映射关系，方便后续查找
      asset.mapping[relativePath] = childAsset.id;
      // 把信息放入队列中，等待遍历，进行队列循环
      queue.push(childAsset);
    });
  }
  return queue;
}

/**
 * 打包输出的函数
 * @param {array} graph 
 */
function bundle(graph){
  let modules = '';

  // 将所有依赖信息组装成一个对象字符串形式，因为要打包输出到文件中，所以只能是字符串形式
  graph.forEach(item => {
    modules +=`
      ${item.id}:[
        function(require, module, exports){${item.code}},
        ${JSON.stringify(item.mapping)}
      ],
    `
  });

  // 这是要输出到文件中的内容，是一个IIFE(声明立即执行函数)，这里重写了require方法，根据模块id逐个调用
  const result = `
    (function(modules) {
      function require(id){
        const [fn, mapping] = modules[id];

        function localRequire(relativePath){
          return require(mapping[relativePath]);
        }

        const module = {
          exports:{}
        }

        fn(localRequire, module, module.exports);

        return module.exports;
      }

      require(0);
    })({${modules}})
  `
  // 将内容写入文件
  fs.writeFileSync(path.join(__dirname, 'bundle.js'), result, 'utf-8');
}

// 从入口文件引入资源，入口文件默认为index.js，构建依赖关系
const graph = createGraph('./src/index.js');

// 打包文件并输出
bundle(graph);





