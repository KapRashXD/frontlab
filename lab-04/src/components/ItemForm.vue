<template>
  <form @submit.prevent="onSubmit">
    <input v-model="input" placeholder="Нова задача"/>
    <button type="submit">Додати</button>
    <span v-if="error" style="color: red">{{ error }}</span>
  </form>
</template>

<script>
    export default{
        name: 'ItemForm',
        data(){
            return{
                input: '',
                error: ''
            }
        },
        methods: {
            onSubmit() {
                if (!this.input.trim()) {
                    this.error = 'Поле не може бути порожнім';
                    return;
                }
                if (this.input.length < 2){
                    this.error = 'Задача повинна містити принаймні 2 символи';
                    return;
                }
                this.error = '';
                this.$emit('add-item', this.input);
                this.input = '';
            }
        }
    }
</script>
