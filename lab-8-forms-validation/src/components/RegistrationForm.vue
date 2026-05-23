<template>
    <form @submit.prevent="onSubmit">
        <h2>Реєстрація</h2>
        <label>
            Ім'я:
            <input v-model.trim="form.name" type="text" required/>
        </label>
        <label>
            Електронна пошта:
            <input v-model.trim="form.email" type="email" required/>
        </label>
        <label>
            Пароль:
            <input v-model="form.password" type="password" required/>
        </label>
        <label>
            Підтвердження пароля:
            <input v-model="form.confirmPassword" type="password" required/>
        </label>
        <label>
            Вік:
            <input v-model.number="form.age" type="number" min="0" required/>
        </label>
        <label>
            Погоджуєтесь з умовами:
            <input v-model="form.agree" type="checkbox" required/>
        </label>
        <button type="submit">Зареєструватися</button>
    </form>
</template>

<style scoped>
    form{
        max-width: 400px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    label{
        display: block;
        margin-bottom: 10px;
    }
    input:not([type="checkbox"]){
        width: 100%;
        padding: 8px;
        margin-top: 5px;
        box-sizing: border-box;
    }
    button{
        padding: 10px 20px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    button:hover{
        background-color: #0056b3;
    }
</style>

<script setup>
    import {reactive} from 'vue';

    const form = reactive({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: null,
        agree: false
    });

    function onSubmit(){
        console.log('Дані форми:', form);
    }
</script>