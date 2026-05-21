<template>
  <ul>
    <ItemRow 
    v-for="item in items" 
    :key="item.id" 
    :item="item"
    @delete-item="$emit('delete-item', $event)"
    @toggle-item="$emit('toggle-item', $event)"/>
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
