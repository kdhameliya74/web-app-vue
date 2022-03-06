<template>
  <main class="main d-flex">
      <sidebar />
      <section class="main__section">
        <router-view />
      </section>
  </main>
</template>
<script>
import Sidebar from "@/components/Sidebar";
export default {
  name: "App",
  components: {
    Sidebar,
  },
};
</script>
<style lang="scss">
@import "./styles/main.scss";
.main {
  &__section {
    width: calc(100% - 340px);
  }
}
</style>
