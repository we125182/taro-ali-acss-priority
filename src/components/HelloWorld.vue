<template>
  <view class="index">
    <text class="text-color">{{ msg }}</text>
  </view>
</template>

<script>
import './index.less'

export default {
  data () {
    return {
      msg: '此处应为红色'
    }
  }
}
</script>
