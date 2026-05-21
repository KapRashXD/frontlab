<template>
    <li>
        {{ item.text }} <span v-if="item.done">(done)</span>
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
