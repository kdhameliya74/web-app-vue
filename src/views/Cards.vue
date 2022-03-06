<template>
  <div class="card-view">
    <modal v-if="showModal" @close-modal="showModal = false" @update-card="fetchAndUpdateCard"/>
    <div class="card-view__top d-flex d-justify-between d-align-end">
      <div>
        <div class="card-view__top--text">Available balance</div>
        <div
          class="card-view__top--balance fw-700 d-flex d-align-center d-justify-between"
        >
          <span class="card-view__top--sign">S$</span>
          <span class="card-view__top--amount">3,000</span>
        </div>
      </div>
      <Button @click="showModal = true">
        <template #icon>
          <img src="@/assets/icons/common/add.png" alt="plus" />
        </template>
        <template #title>
          <span> New card </span>
        </template>
      </Button>
    </div>
    <div class="card-view__bottom">
      <tabs :tabList="tablist">
        <template v-slot:card-view-tab-1>
          <div class="row card-tab__wrapper">
            <div class="col-md-6 col-xs-12">
              <div class="card-tab--button">
                <Button @click="showCardNumber">
                  <template #icon>
                    <img
                      src="@/assets/icons/common/remove_red_eye.png"
                      alt="eye"
                    />
                  </template>
                  <template #title>
                    <span> Show card number </span>
                  </template>
                </Button>
              </div>
              <div class="swiper__wrapper">
                <swiper
                  ref="mySwiper"
                  :slides-per-view="1"
                  :modules="modules"
                  :space-between="50"
                  :pagination="{
                    el: '.custom-pagination',
                    clickable: true,
                    type: 'bullets',
                  }"
                  @slideChange="onSlideChange"
                >
                  <swiper-slide v-for="(card, i) in cards" :key="i">
                    <Card :card-detail="card" :show-number="cardShow && currentCard === i"/>
                  </swiper-slide>
                  <div class="custom-pagination"></div>
                </swiper>
              </div>
              <Block :is-freeze="isCurrentCardFreeze" @freeze-card="freezeCurrentCard" @cancel-card="cancelCurrentCard" />
            </div>
            <div class="col-md-6 col-xs-12">
              <card-dropdown>
                <template #icon>
                  <img src="@/assets/icons/common/group.png" alt="group"/>
                </template>
              </card-dropdown>
              <card-dropdown style="margin-top:15px;" :title="'Recent transactions'">
                <template #icon>
                  <img src="@/assets/icons/common/transaction.png" alt="transaction"/>
                </template>
              </card-dropdown>
            </div>
          </div>
        </template>
        <template v-slot:card-view-tab-2> Content 2 </template>
      </tabs>
    </div>
  </div>
</template>
<script>
import Button from "@/components/form/Button";
import Tabs from "@/components/Tabs";
import Card from "@/components/Card";
import Cards from "@/api/cards.json";
import Modal from '@/components/form/Modal'
import Block from "@/components/Block";
import CardDropdown from "@/components/CardDropdown";
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
import { Pagination } from "swiper";
import "swiper/modules/pagination/pagination.scss";
import "swiper/swiper.scss";
export default {
  name: "Cards",
  components: {
    Button,
    Tabs,
    Card,
    Swiper,
    SwiperSlide,
    Modal,
    Block,
    CardDropdown
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  data() {
    return {
      tablist: ["My debit cards", "All company cards"],
      cards: [],
      cardShow: false,
      currentCard: 0,
      showModal: false,
      isCurrentCardFreeze: false
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper
    }
  },
  async created() {
    const haveData = this.getCardLocalStorage()
    if(haveData === null || haveData.length === 0) {
      this.setCardToLocalStorage(Cards)
    } else {
      this.cards = haveData
      this.isCurrentCardFreeze = this.cards[0].isFreeze // by default current card index is 0 
    }
  },
  methods: {
    showCardNumber() {
      this.cardShow = !this.cardShow // Show is enable
    },
    onSlideChange (s) {
      this.cardShow = false // false on card slide change
      this.currentCard = s.activeIndex // To show only visible card number
      this.isCurrentCardFreeze = this.cards[this.currentCard].isFreeze
    },
    fetchAndUpdateCard (modal = false) {
      this.showModal = modal
      this.cards = this.getCardLocalStorage()
    },
    setCardToLocalStorage (data) {
      this.cards = data;
      if(window) {
        localStorage.setItem('cards-detail', JSON.stringify(data))
      }
    },
    getCardLocalStorage () {
      const storedCards = localStorage.getItem("cards-detail")
      return storedCards ? JSON.parse(storedCards) : null 
    },
    freezeCurrentCard () {
      this.isCurrentCardFreeze = !this.cards[this.currentCard].isFreeze
      this.cards[this.currentCard].isFreeze = this.isCurrentCardFreeze
      this.setCardToLocalStorage(this.cards)
    },
    cancelCurrentCard () {
      this.cards.splice(this.currentCard, 1) // No need to find index because current card shows index
      this.setCardToLocalStorage(this.cards)
    }
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/color";
.card-view {
  padding: 60px;
  &__top {
    &--text {
      color: $black;
      font-size: 14px;
      margin-bottom: 10px;
    }
    &--amount {
      font-size: 26px;
    }
    &--sign {
      background: $parrot-green;
      padding: 4px 12px;
      color: $white;
      border-radius: 4px;
      font-size: 13px;
    }
  }
  &__bottom {
    margin-top: 40px;
  }
}
.card-tab {
  &__wrapper {
    // display: flex;
    // flex-wrap: wrap;
    padding: 30px 40px 30px 40px;
    border-radius: 8px;
    border: 1px solid $slight-white;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
    -webkit-box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
    -moz-box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
  }
  &--button {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
<style lang="scss">
@import "~@/styles/color";
.card-tab {
  &__wrapper {
    .button {
      cursor: pointer;
      background-color: transparent;
      color: $parrot-green;
    }
  }
}
.custom-pagination {
  text-align: center;
  padding: 10px;
}
.swiper-pagination {
  &-bullet {
    background-color: $parrot-green;
    &-active {
      width: 16px;
      opacity: 1;
      background-color: $parrot-green;
    }
  }
}
</style>
