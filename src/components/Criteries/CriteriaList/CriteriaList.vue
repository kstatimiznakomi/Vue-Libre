<template>
  <div class="flex justify-between items-center mb-3">
    <div class="flex gap-2 flex-wrap justify-stretch">
      <CriteriaItem :key="criteria" v-for="criteria of criteries" :criteria="criteria"/>
    </div>
    <RemoveAllFiltersButton v-if="criteries.length >= 1"/>
  </div>
</template>

<script setup lang="ts">
import CriteriaItem from "../CriteriaItem/CriteriaItem.vue";
import {ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {SearchOptions} from "./search.options";
import RemoveAllFiltersButton from "../RemoveAllFiltersButton.vue";

const route = useRoute();
const criteries = ref([]);

watchEffect(() => {
  getList();
}, route.fullPath)

function getList() {
  criteries.value = [];
  const urlParams = new URLSearchParams(route.fullPath.split('?')[1]);
  for (var i of urlParams.keys()) {
    var searchItem = Object.entries(SearchOptions).find((item) => i === item[0]);
    if (searchItem !== undefined) criteries.value.push(searchItem);
  }
}

</script>
