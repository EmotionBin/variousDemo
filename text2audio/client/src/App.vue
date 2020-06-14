<template>
  <div id="app">
    <div class="app-container">
      <div style="margin-bottom: 20px;">
        <el-row>
          <el-col>
            <el-input v-model="audioText" placeholder="请输入需要合成的语音">
              <el-button @click="sendText(audioText)" slot="append" icon="el-icon-upload">点击合成</el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{scope.$index}}
          </template>      
        </el-table-column>
        <el-table-column align="center" label="文字" width="210">
          <template slot-scope="scope">
            {{scope.row.audioText}}
          </template>      
        </el-table-column>
        <el-table-column align="center" label="链接">
          <template slot-scope="scope">
            {{scope.row.audioLink}}
            <el-button type="primary" size="mini" @click="openAudioLink(scope.row.audioLink)">打开</el-button>
          </template>      
        </el-table-column>
        <el-table-column align="center" label="音频">
          <template slot-scope="scope">
            <audio :src="server + scope.row.audioLink" controls></audio>
          </template>      
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data:function () {
    return {
      audioText:'',
      audioLink:'',
      listLoading:false,
      list:[],
      server:'http://127.0.0.1:8888'
    }
  },
  components: {

  },
  methods:{
    //发送文本信息，返回音频信息
    sendText(audioText){
      fetch(`${this.server}/api/audio?text=${audioText}`,{method:'get'})
      .then( res => {
        return res.json();
      })
      .then(res => {
        this.audioLink = res.audioLink;
        this.list.push({audioText, audioLink:this.audioLink})
      })
    },
    //打开音频链接
    openAudioLink(audioLink){
      if(!audioLink) return;
      window.open(`${this.server}${audioLink}`);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
