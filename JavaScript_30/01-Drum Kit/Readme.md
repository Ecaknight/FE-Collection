## 本章知识点汇总
**自定义标签元素** `<kbd>custom elements</kbd>` 是Web Components 标准非常重要的一个特性，简单的使用方式，<xxx></xxx>即可以被html识别, 更标准使用参考MDN
**data-\*属性**: 数据属性允许我们在标准内于HTML元素中存储额外的信息
  获取数据属性值的方式： DOM.dataset.xxx 即可以直接获取, 也可以使用getAttribute()方法获取

```js
  <article
  id="electriccars"
  data-columns="3"
  data-index-number="12314"
  data-parent="cars">
xxx
</article>

var article = document.querySelector('#electriccars');
article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"
```

**classList**:是一个只读属性，返回一个元素的类属性的实时 DOMTokenList 集合，本身只读，但是可以通过add和remove修改

**audio**： HTML <audio> 元素用于在文档中嵌入音频内容。具体参考：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio

### css知识点
**transition**：提供了一种在更改CSS属性时控制动画速度的方法，all表示所有属性都表现出过渡动画。
**text-transform**: CSS属性指定如何将元素的文本大写
**transform**: 属性允许你旋转，缩放，倾斜或平移给定元素。这是通过修改CSS视觉格式化模型的坐标空间来实现的。