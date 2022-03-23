<script setup lang="ts">
defineProps({
  backgroundImage: {
    type: String,
    default: "",
    required: true,
  },
});
</script>

<template>
  <div data-le="aspect-ratio-item">
    <slot></slot>
  </div>
</template>

<style scoped>
[data-le="aspect-ratio-item"] {
  background-color: #000;
  background-image: url(v-bind(backgroundImage));
  background-position: center;
  background-size: cover;
  contain: content;
  cursor: pointer;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

[data-le="aspect-ratio-item"]::before {
  content: "";
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);
  background-repeat: repeat-x;
  background-position: top;
  box-sizing: content-box;
  display: block;
  height: 60px;
  padding-bottom: 50px;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: all 0.25s cubic-bezier(0, 0, 0.2, 1);
  width: 100%;
  z-index: 25;
}
</style>
