<template>
  <div class="tabs">
    <ul class="tabs__list">
      <li
        class="tabs__list__single"
        v-for="(tab, index) in tabList"
        :key="index"
        @click="activeTab = index"
        :class="{ 'tabs__list__single--active': activeTab == index }"
      >
        <label v-text="tab" class="cursor-pointer" />
      </li>
    </ul>
    <template v-for="(tab, index) in tabList">
      <div :key="index" v-if="index === activeTab">
        <slot :name="`card-view-tab-${index + 1}`" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    tabList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 0,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/color";
.tabs {
  &__list {
    list-style: none;
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1em;
    &__single {
      color: $black;
      opacity: 30%;
      padding-right: 2em;
      transition: all 0.3s ease-in-out;
      label {
        border-bottom: transparent;
        display: block;
        padding-bottom: 4px;
      }
      &--active,
      &:hover {
        label {
          border-bottom: 2px solid $sky-blue;
        }
        opacity: 100%;
        font-weight: 600;
      }
    }
  }
}
</style>
