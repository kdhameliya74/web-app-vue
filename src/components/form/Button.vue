<template>
    <button class="button d-flex d-align-center fw-700">
        <span class="button__img"> <slot name="icon"></slot> </span>
        <span class="button__title"><slot name="title"></slot></span>
    </button>
</template>

<style lang="scss">
@import '~@/styles/color';  
.button {
    background-color: $navy-blue;
    color: $white;
    border: none;
    padding: 9px 12px;
    border-radius: 4px;
    line-height: 0;
    &__img {
        img {
            width: 16px;
            height: 16px;
            margin-right: 6px;
        }
    }
    &__title {
        font-size: 13px;
    }

}
</style>