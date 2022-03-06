<template>
  <div class="block row between-xs">
    <ul>
      <li @click="$emit('freeze-card')">
          <img src="@/assets/icons/block/freeze.png" alt="freeze" />
          <span>{{ isFreeze ? 'Unfreeze' : 'Freeze' }} card</span>
      </li>
      <li>
          <img src="@/assets/icons/block/limit.png" alt="limit" />
          <span>Set spend limit</span>
      </li>
      <li>
          <img src="@/assets/icons/block/GPay.png" alt="GPay" />
          <span>Add to GPay</span>
      </li>
      <li>
          <img src="@/assets/icons/block/replace.png" alt="replace" />
          <span>Replace card</span>
      </li>
      <li @click="$emit('cancel-card')">
          <img src="@/assets/icons/block/deactivate.png" alt="deactivate" />
          <span>Cancel card</span>
      </li>
    </ul>
</div>
</template>
<script>
export default {
  name: "Block",
  props: {
    isFreeze: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/color";
.block {
  padding: 27px;
  background-color: $light-sky;
  border-radius: 16px;
  ul {
    list-style: none;
    display: flex;
    li {
      align-items: center;
      display: flex;
      cursor: pointer;
      justify-content: center;
      flex-wrap: wrap;
      img {
        width: 32px;
        height: 32px;
      }
      span {
        width: 100%;
        display: block;
        text-align: center;
      }
    }
  }
}
</style>
