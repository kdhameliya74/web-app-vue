<template>
  <div class="dropdown__wrapper">
    <div class="dropdown__title">
      <div class="d-flex d-align-center dropdown__select" @click="openDropdown">
        <slot name="icon" />
        <span>{{ title }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          :class="{'transform' : isOpen}"
        >
          <g style="opacity: 0.15" transform="translate(-0.001)">
            <g transform="translate(0.001)">
              <path
                fill="#325baf"
                d="M10,0A10,10,0,1,0,20,10,10,10,0,0,0,10,0Zm4.512,8.776-3.736,3.736a.914.914,0,0,1-.125.158.951.951,0,0,1-1.479-.158L5.42,8.76A.933.933,0,1,1,6.74,7.44l3.235,3.234,3.217-3.218a.934.934,0,0,1,1.321,1.32Z"
                transform="translate(-0.001)"
              />
            </g>
          </g>
        </svg>
      </div>
      <div class="dropdown__main" :class="{'open' : isOpen}">
        <ul class="dropdown__menu">
          <li class="dropdown__menu--item">
            <div class="dropdown__menu--item_content d-flex">
              <div class="circle blue">
                <img
                  src="@/assets/icons/common/file-storage.png"
                  alt="file storage"
                />
              </div>
              <div class="dropdown__menu--item_detail">
                <div>
                  <span class="name">Hamleys</span>
                  <span class="amount plus">+S$ 150</span>
                </div>
                <p class="date">20 May 2020</p>
                <p class="refund">
                  <span class="refund--img">
                    <img src="@/assets/icons/common/business-and-finance.png" />
                  </span>
                  Refund on debit card
                </p>
              </div>
            </div>
          </li>
          <li class="dropdown__menu--item">
            <div class="dropdown__menu--item_content d-flex">
              <div class="circle green">
                <img
                  src="@/assets/icons/common/flight.png"
                  alt="file storage"
                />
              </div>
              <div class="dropdown__menu--item_detail">
                <div>
                  <span class="name">Hamleys</span>
                  <span class="amount">-S$ 150</span>
                </div>
                <p class="date">20 May 2020</p>
                <p class="refund">
                  <span class="refund--img">
                    <img src="@/assets/icons/common/business-and-finance.png" />
                  </span>
                  Charged to debit card
                </p>
              </div>
            </div>
          </li>
          <li class="dropdown__menu--item">
            <div class="dropdown__menu--item_content d-flex">
              <div class="circle red">
                <img
                  src="@/assets/icons/common/megaphon.png"
                  alt="file storage"
                />
              </div>
              <div class="dropdown__menu--item_detail">
                <div>
                  <span class="name">Hamleys</span>
                  <span class="amount">-S$ 150</span>
                </div>
                <p class="date">20 May 2020</p>
                <p class="refund">
                  <span class="refund--img">
                    <img src="@/assets/icons/common/business-and-finance.png" />
                  </span>
                  Charged to debit card
                </p>
              </div>
            </div>
          </li>
        </ul>
        <div class="all-card-link">View all card transactions</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardDropdown",
  props: {
    title: {
      type: String,
      default: "Card details",
    },
  },
  data() {
      return {
          isOpen: false
      }
  },
  methods: {
      openDropdown () {
          this.isOpen = !this.isOpen
      }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/color";
.dropdown {
  &__wrapper {
    border-radius: 8px;
    box-shadow: 0 0 8px #0000000a;
    transition: all 0.5s ease;
    position: relative;
    color: $dark-blue;
  }
  &__title {
      background-color: $light-blue;
  }
  &__select {
    cursor: pointer;
    padding: 24px;
    border-radius: 8px;
    border: 1px solid $light-gray;

    svg:last-of-type {
      margin-left: auto;
    }
  }
  &__main {
    background-color: $white;
    width: 100%;
    left: 0;
    display: none;
    border-top: transparent !important;
    border: 1px solid #f0f0f0;
    overflow: hidden;
    z-index: 9;
  }
  &__menu {
    padding: 24px;
    list-style: none;
    &--item {
      padding-top: 12px;
      padding-bottom: 16px;
      border-bottom: 1px solid $light-gray;
      &_content {
        .circle {
          width: 48px;
          height: 48px;
          margin-right: 12px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 16px;
            height: 16px;
          }
        }
      }
      &_detail {
        flex: 1;
        div {
          display: block;
        }
        span.name {
          font-weight: 600;
          color: $black;
          font-size: 13px;
        }
        .amount {
          float: right;
          font-weight: 700;
        }
        .plus {
          color: $parrot-green;
        }
        .date {
          color: #aaaaaa;
          font-size: 13px;
        }
        .refund {
          margin-top: 12px;
          font-size: 12px;
          color: #325baf;
          &--img {
            background: blue;
            width: 24px;
            border-radius: 50%;
            height: 20px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            img {
              width: 10px;
            }
          }
        }
      }
    }
  }
}
.blue {
  background-color: #009dff1a;
}
.green {
  background-color: #00d6b51a;
}
.red {
  background-color: #f251951a;
}
.all-card-link {
  padding: 16px;
  background: #ddffec;
  text-align: center;
  color: $parrot-green;
  border-radius: 8px;
  font-weight: 600;
}
.open {
    display: block;
}
.transform {
    transform: rotate(180deg);
}
</style>
<style lang="scss">
.dropdown {
  &__select {
    img {
      width: 24px;
      margin-right: 12px;
    }
  }
}
</style>
