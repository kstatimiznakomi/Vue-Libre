<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
    <h1 class="text-6xl font-bold text-red-500">404</h1>
    <p class="text-2xl mt-4 text-gray-700">Страница не найдена</p>
    <p class="text-gray-500 mt-2">Возможно, вы ошиблись адресом, или страница была удалена.</p>
    <RouterLink
        to="/"
        class="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-all"
    >
      Вернуться на главную
    </RouterLink>
  </div>
</template>