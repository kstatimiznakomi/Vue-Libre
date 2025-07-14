<template>
  <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
  >
    <button class="bg-[#e2e2e2] text-black px-4 py-2 rounded-full absolute top-0 right-0">Показать информацию
    </button>
  </Transition>
</template>