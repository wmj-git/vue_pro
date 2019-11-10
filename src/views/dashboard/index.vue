<template>
  <div class="dashboard-container">
    {{ currentRole.name }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      id: 'editorDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles',
      'currentRole'
    ])
  },
  created() {
  }
}
</script>
