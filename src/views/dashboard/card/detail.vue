<template>
  <div class="detail">
    <div class="header">
      <span>{{ titles }}</span>
      <svg t="1652510653695" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2052" width="16" height="16">
        <path
          d="M536 480v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V480a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z m-32-128h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z m8 448c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z"
          p-id="2053"
        />
      </svg>
    </div>
    <div class="content">{{count}}</div>
    <div class="chart">
      <slot name="charts"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: ['titles','count']
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  color: #30313391;
}
.content {
  padding: 10px 0;
  font-size: 30px;
}
.chart {
  height: 30px;
}
.footer {
  margin-top: 3px;
  padding: 10px;
  border-top: 1px solid #111;
}
</style>
