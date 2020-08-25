<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!-- <a href="https://pro.loacg.com/docs/getting-started" target="_blank">
        <span class="action">
          <a-icon type="question-circle-o"></a-icon>
        </span>
      </a> -->
      <!-- <notice-icon class="action" /> -->
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar size="small" icon="user" />
          <span style="margin-left:10px;">{{ op().UserName }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="1">
            <a href="javascript:;" @click="handleLogout()">
              <a-icon type="lock" />
              <span>切换登录</span>
            </a>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout()">
              <a-icon type="logout" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>

import TokenCache from '@/utils/cache/TokenCache'
export default {
  name: 'UserMenu',
  components: {
  },
  methods: {
    op() {
      return {
        UserName:'前端圈圈'
      }
    },
    handleLogout() {
      const that = this
      this.$confirm({
        title: '提示',
        content: '真的要退出登录吗 ?',
        onOk() {
          TokenCache.deleteToken()
          location.reload()
        }
      })
    },
  }
}
</script>
