<template>
  <div class="dashboard-container">
    <card />
    <sale />
    <observe></observe>
  </div>
</template>

<script>
import card from '@/views/dashboard/card/index.vue'
import sale from './sale/index.vue'
import observe from '@/views/dashboard/observe/index.vue'
export default {
  name: 'Dashboard',
  components: {
    card,
    sale,
    observe
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 0px;
  }
}
</style>
