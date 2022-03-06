<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modal" @click.stop>
        <h6>New card detail</h6>
        <p v-if="hasError" class="error">No Field should be empty.</p>
        <div class="modal__field col-md">
          <input
            class="modal__field--effect"
            type="text"
            v-model="holderName"
            placeholder="Card holder name"
          />
          <span class="focus-border"></span>
        </div>
        <div class="col-md modal__field">
          <input
            class="modal__field--effect"
            type="text"
            v-model="cardNumber"
            placeholder="Card number"
            readonly
          />
          <span class="focus-border"></span>
        </div>
        <div class="col-md modal__field">
          <input
            class="modal__field--effect"
            type="text"
            v-model="expiryDate"
            placeholder="expiry date"
            readonly
          />
          <span class="focus-border"></span>
        </div>
        <button @click="vaidateCardInfo">Save card</button>
      </div>
      <div class="close" @click="$emit('close-modal')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="30"
          height="30"
          viewBox="0 0 30 30"
        >
          <path
            d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"
          ></path>
        </svg>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Modal",
  data() {
    return {
      cardNumber: "",
      expiryDate: "",
      holderName: "",
      hasError: false,
    };
  },
  mounted() {
    this.cardNumber = this.cardNumberGen();
    this.expiryDate = this.expiryDateGen();
  },
  methods: {
    cardNumberGen() {
      return Math.random().toFixed(16).split(".")[1];
    },
    expiryDateGen() {
      const currentYear = new Date().getFullYear() + 10;
      const start = new Date(currentYear, 0, 1);
      const end = new Date();
      const generateDate = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
      const [month, year] = [
        (generateDate.getMonth() + 1).toString(),
        generateDate.getFullYear().toString().substr(-2),
      ];
      return `${month.length === 1 ? "0" + month : month}/${year}`;
    },
    vaidateCardInfo() {
      if (!this.cardNumber || !this.holderName || !this.expiryDate) {
        this.hasError = true;
        return;
      }
      this.hasError = false;
      const storedCard = localStorage.getItem("cards-detail") || null;
      if (storedCard) {
        let cards = JSON.parse(storedCard);
        cards.push({
          card_holder: this.holderName,
          number: this.cardNumber,
          expiry: this.expiryDate,
          isFreeze: false
        });
        localStorage.setItem("cards-detail", JSON.stringify(cards))
        this.$emit('update-card', false)
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/color";
.modal-overlay {
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}
.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
  &__field {
    margin-bottom: 20px;
    position: relative;
    input {
      color: #333;
      width: 100%;
      box-sizing: border-box;
      letter-spacing: 1px;
      &:focus {
        outline: none;
      }
    }
    &--effect {
      border: 0;
      padding: 7px 0;
      border-bottom: 1px solid #ccc;
    }
  }
}
.focus-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #3399ff;
  transition: 0.4s;
}
.modal__field--effect:focus ~ .focus-border {
  width: 100%;
  transition: 0.4s;
}
.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
  svg {
    fill: $parrot-green;
  }
}
.check {
  width: 150px;
}
h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}
p {
  /* font-weight: 500; */
  font-size: 16px;
  margin: 20px 0;
}
button {
  background-color: $parrot-green;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
  border: none;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
.error {
  color: red;
  font-weight: 600;
}
</style>
