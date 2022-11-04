<template>
  <view class="index">
    <hello-world />
  </view>
</template>

<script>
import HelloWorld from '../../components/HelloWorld.vue'
export default {
  components: {
    HelloWorld
  },
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>
