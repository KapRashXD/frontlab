<template>
    <form @submit.prevent="add">
        <input v-model="text" placeholder="Нова задача"/>
        <button type="submit">Додати</button>
        <span v-if="error" style="color: red">{{ error }}</span>
    </form>
</template>

<script>
    import {ref} from 'vue'
    import {useTaskStore} from '../stores/taskStore'
    export default{
        name: 'TaskForm',
        setup(){
            const text = ref('');
            const error = ref('');
            const taskStore = useTaskStore();

            function add() {
                if (!text.value.trim()) {
                    error.value = 'Поле не може бути порожнім';
                    return;
                }
                if (text.value.length < 2){
                    error.value = 'Задача повинна містити принаймні 2 символи';
                    return;
                }
                error.value = '';
                taskStore.addTask(text.value);
                text.value = '';
            }

            return { text, error, add }
        }
    }
</script>