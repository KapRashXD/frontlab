<template>
  <ul>
    <ItemRow 
    v-for="item in items" 
    :key="item.id" 
    :item="item"/>
  </ul>
</template>

<script>
  import ItemRow from './ItemRow.vue'

  export default{
    name: 'ItemList',
    components: {
      ItemRow
    },
    props: {
      items: {
        type: Array,
        required: true
      }
    }
  }
</script>
