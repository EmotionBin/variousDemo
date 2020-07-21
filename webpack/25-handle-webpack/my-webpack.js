const fs = require('fs');
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

// 从入口文件引入资源，入口文件默认为index.js
const asset = createAsset('./src/index.js');

