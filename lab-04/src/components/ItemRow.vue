<template>
    <li :style="{ textDecoration: item.done ? 'line-through' : 'none' }">
        {{ item.text }}
        <button @click="$emit('toggle-item', item.id)">Перемкнути статус</button>
        <button @click="$emit('delete-item', item.id)">Видалити</button>
    </li>
</template>
<script>
    export default{
        name: 'ItemRow',
        props: {
            item: {
                type: Object,
                required: true
            }
        }
    }
</script>
