Vue.config.devtools = true;
new Vue({
  el:'.box',
  data:{
    list:[],
    isCheck:false,
    queueLength:50,
    itemQueue:[]
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
          this.itemQueue = res.slice(0, this.queueLength);
          this.getDomInfo();
        })
    },
    selectAll(){
      const { tree } = this;
      if (this.isCheck){
        const data = this.itemQueue.map(item => item.id);
        tree.setCheckedKeys(data, true);
      }else{
        tree.setCheckedKeys([]);
      }
    },
    getDomInfo(){
      const tree = this.$refs.tree;
      this.tree = tree;
      this.$el.addEventListener('scroll', this.setVirtualTreeItem);
      tree.$nextTick(() => {
        const treeItemHeight = document.getElementsByClassName('el-tree-node')[0].clientHeight;
        this.treeItemHeight = treeItemHeight;
      })
    },
    setVirtualTreeItem(){
      const { $el: { clientHeight, scrollTop, scrollHeight }, treeItemHeight, list, queueLength } = this;
      if (clientHeight + scrollTop === scrollHeight){
        const currentBottomItem = this.itemQueue[this.itemQueue.length - 1];
        if (currentBottomItem.id === list[list.length - 1].id) return;
        const preListLength = Number.parseInt(scrollTop / treeItemHeight);
        const currentIndex = list.findIndex(item => item.id === currentBottomItem.id);
        const nextList = list.slice(currentIndex + 1, currentIndex + preListLength + 1);
        this.itemQueue.push(...nextList);
        this.$nextTick(() => {
          this.itemQueue.splice(0, nextList.length);
          this.selectAll();
        });
      }
      if (scrollTop === 0) {
        const currentTopItem = this.itemQueue[0];
        if (currentTopItem.id === list[0].id) return;
        // 强制更改scrollTop
        this.$el.scrollTop = 1;
        const preListLength = Number.parseInt((scrollHeight - clientHeight) / treeItemHeight);
        const currentIndex = list.findIndex(item => item.id === currentTopItem.id);
        const nextList = list.slice(currentIndex - preListLength - 1 < 0 ? 0 : currentIndex - preListLength - 1, currentIndex - 1);
        this.itemQueue.unshift(...nextList);
        this.$nextTick(() => {
          this.itemQueue.splice(queueLength, nextList.length + preListLength);
          this.selectAll();
        });
      }
    }
  }
})


