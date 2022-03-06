<template>
  <div class="card w-100" :class="{'is-freeze': cardDetail.isFreeze}">
    <logo fill-color="#fff" />
    <div class="card__owner">{{cardDetail.card_holder}}</div>
    <div class="card__number" v-if="!showNumber">
      <template v-for="i in 12" :key="i">
        <span class="card__number-dot" />
      </template>
      <span>{{cardDetail.number.substr(-4)}}</span>
    </div>
    <div class="card__number" v-else>{{cardDetail.number}}</div>
    <div class="d-flex">
      <div class="card__expiry-date">Thru:<span>{{cardDetail.expiry}}</span></div>
      <div class="card__cvv">cvv: <span>***</span></div>
    </div>
    <div class="card__visa-img">
      <img src="@/assets/icons/common/visa.png" alt="visa" />
    </div>
  </div>
</template>
<script>
import Logo from "@/components/Logo";
export default {
  name: "Card",
  components: {
    Logo,
  },
  props: {
    cardDetail: {
      type: Object,
      required: true,
      default: () => {}
    },
    showNumber: {
      type:Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/color";
.is-freeze {
  opacity: 50%;
}
.card {
  position: relative;
  background-color: $parrot-green;
  color: $white;
  border-radius: 8px;
  padding: 27px;
  font-weight: 700;
  &__owner {
    font-size: 24px;
    text-align: left;
    letter-spacing: 1px;
    margin-bottom: 32px;
  }
  &__number {
    text-align: left;
    font-size: 14px;
    letter-spacing: 3.4px;
    margin-bottom: 15px;
    &-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: $white;
      display: inline-block;
      margin-right: 7px;
      &:nth-child(4n) {
        margin-right: 27px;
      }
    }
  }

  &__expiry-date,
  &__cvv {
    font-size: 14px;
    text-align: center;
    padding-right: 32px;
  }
  &__cvv {
    span {
      font-weight: 700;
      letter-spacing: 2.4px;
    }
  }
  &__visa-img {
    text-align: end;
    img {
      width: 67px;
    }
  }
}
</style>
<style lang="scss">
.card {
  .logo {
    text-align: end;
    svg {
      width: 83px !important;
    }
  }
}
</style>
