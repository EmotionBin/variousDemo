Vue.config.devtools = true;
new Vue({
  el:'.box',
  data:{
    list:[],
    isCheck:false,
    queueLength:50,
    itemQueue:[],
    inputWord:'',
    timer:-1
  },
  created(){
    this.getList();
  },
  mounted(){
    
  },
  beforeDestroy() {
    this.$el.removeEventListener('scroll', this.setVirtualTreeItem);
  },
  methods:{
    getList(){
      fetch(`/getList`)
        .then(res => res.json())
        .then(res => {
          this.list = res;
          // 保存一份备份数据搜索用
          this.cacheData = this.list;
          this.itemQueue = res.slice(0, this.queueLength);
          this.getDomInfo();
        })
    },
    selectAll(){
      const { tree } = this;
      if (this.isCheck){
        // tree.$el.style['visibility'] = 'hidden';
        const data = this.itemQueue.map(item => item.id);
        tree.setCheckedKeys(data, true);
        setTimeout(() => {
          // tree.$el.style['visibility'] = 'visible';
        }, 0);
        
      }else{
        tree.setCheckedKeys([]);
      }
    },
    getDomInfo(){
      const { $el, $refs: { tree }, list, queueLength } = this;
      this.tree = tree;
      $el.addEventListener('scroll', this.setVirtualTreeItem);
      tree.$nextTick(() => {
        const treeItemHeight = document.getElementsByClassName('el-tree-node')[0].clientHeight;
        this.treeItemHeight = treeItemHeight;
        // 拿到每个item高度之后追加paddingbottom
        this.initVirtualTableItem();
      })
    },
    setVirtualTreeItem(){
      // 当数据量小的时候不使用虚拟化技术
      if (this.itemQueue.length < this.queueLength) return;
      const { $el: { clientHeight, scrollTop, scrollHeight }, treeItemHeight, list, queueLength, tree:{ $el:{ style } } } = this;
      const paddingBottom = Number.parseInt(style['paddingBottom']) || 0;
      const paddingTop = Number.parseInt(style['paddingTop']) || 0;
      // 当前可视区域内最后一条数据触底时加载
      if (scrollTop + clientHeight >= treeItemHeight * queueLength + paddingTop){
        const currentBottomItem = this.itemQueue[this.itemQueue.length - 1];
        if (currentBottomItem.id === list[list.length - 1].id) return;
        const preListLength = Number.parseInt((scrollTop - paddingTop) / treeItemHeight);
        const currentIndex = list.findIndex(item => item.id === currentBottomItem.id);
        const nextList = list.slice(currentIndex + 1, currentIndex + preListLength + 1);
        this.itemQueue.push(...nextList);
        this.itemQueue.splice(0, nextList.length);
        const paddingValue = nextList.length * treeItemHeight;
        // 修改padding
        style['paddingBottom'] = `${paddingBottom - paddingValue}px`;
        style['paddingTop'] = `${paddingTop + paddingValue}px`;
        this.$nextTick(() => {
          this.selectAll();
        });
      }
      // 当前可视区域内第一条数据触顶时加载
      if (scrollTop <= paddingTop){
        const currentTopItem = this.itemQueue[0];
        if (currentTopItem.id === list[0].id) return;
        const preListLength = Number.parseInt((scrollHeight - paddingBottom - scrollTop - clientHeight) / treeItemHeight);
        const currentIndex = list.findIndex(item => item.id === currentTopItem.id);
        const nextList = list.slice(currentIndex - preListLength < 0 ? 0 : currentIndex - preListLength, currentIndex);
        this.itemQueue.unshift(...nextList);
        this.itemQueue.splice(queueLength, queueLength + nextList.length);
        const paddingValue = nextList.length * treeItemHeight;
        // 修改padding
        style['paddingBottom'] = `${paddingBottom + paddingValue}px`;
        style['paddingTop'] = `${paddingTop - paddingValue}px`;
        this.$nextTick(() => {
          this.selectAll();
        });
      }
    },
    // 初始化表格 计算padding 
    initVirtualTableItem() {
      const { tree: { $el: { style } }, list, queueLength, treeItemHeight, $el } = this;
      const paddingBottomValue = (list.length - queueLength) * treeItemHeight;
      style['paddingBottom'] = `${paddingBottomValue < 0 ? 0 : paddingBottomValue}px`;
      style['paddingTop'] = 0;
      $el.scrollTop = 0;
    },
    changeInput(){
      const { inputWord, cacheData, queueLength } = this;
      // 防抖
      if (inputWord) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => this.search(), 500);
      } else {
        this.list = cacheData;
        // 清空搜索内容
        this.itemQueue = this.list.slice(0, queueLength);
        this.initVirtualTableItem();
        this.selectAll();
      }
    },
    search(){
      const { inputWord, cacheData, tree: { $el: { style } } } = this;
      const filterData = cacheData.filter(item => {
        return item.label.indexOf(inputWord) !== -1;
      })
      if (filterData.length > this.queueLength) {
        // 搜索到的数据大于缓冲队列的长度
        this.list = filterData;
        this.itemQueue = this.list.slice(0, this.queueLength);
        this.initVirtualTableItem();
      } else {
        // 搜索到的数据小于缓冲队列的长度
        this.itemQueue = filterData;
        style['paddingTop'] = `0px`;
        style['paddingBottom'] = `0px`;
      }
      this.selectAll();
    }
  }
})


