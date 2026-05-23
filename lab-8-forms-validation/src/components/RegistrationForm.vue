<template>
    <form @submit.prevent="onSubmit">
        <h2>Реєстрація</h2>
        <label>
            Ім'я:
            <input v-model.trim="form.name" type="text"/>
            <transition name="fade"><div v-if="errors.name" class="error">{{ errors.name }}</div></transition>
        </label>
        <label>
            Електронна пошта:
            <input v-model.trim="form.email" type="email"/>
            <transition name="fade"><div v-if="errors.email" class="error">{{ errors.email }}</div></transition>
        </label>
        <label>
            Пароль:
            <input v-model="form.password" type="password"/>
            <transition name="fade"><div v-if="errors.password" class="error">{{ errors.password }}</div></transition>
        </label>
        <label>
            Підтвердження пароля:
            <input v-model="form.confirmPassword" type="password"/>
            <transition name="fade"><div v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</div></transition>
        </label>
        <label>
            Вік:
            <input v-model.number="form.age" type="number" min="0"/>
            <transition name="fade"><div v-if="errors.age" class="error">{{ errors.age }}</div></transition>
        </label>
        <label>
            Погоджуєтесь з умовами:
            <input v-model="form.agree" type="checkbox"/>
            <transition name="fade"><div v-if="errors.agree" class="error">{{ errors.agree }}</div></transition>
        </label>
        <button type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Відправка...' : 'Зареєструватися' }}</button>
        <transition name="fade">
            <span v-if="successMsg" class="success">{{ successMsg }}</span>
        </transition>
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
    .error{
        color: red;
    }
    .success{
        color: green;
        margin-left: 10px;
    }
    .fade-enter-active, .fade-leave-active{
        transition: opacity 0.3s;
    }
    .fade-enter-from, .fade-leave-to{
        opacity: 0;
    }
    .fade-enter-to, .fade-leave-from{
        opacity: 1;
    }
</style>

<script setup>
    import {reactive, ref, watch} from 'vue';

    const form = reactive({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: null,
        agree: false
    });

    const errors = reactive({});
    const isSubmitting = ref(false);
    const successMsg = ref('');

    function validate(){
        Object.keys(errors).forEach(key => delete errors[key]);

        if(!form.name) errors.name = "Ім'я є обов'язковим.";
        if(!form.email) errors.email = "Email обов'язковий.";
        if(!form.password) errors.password = "Пароль обов'язковий.";
        else if(form.password.length < 6) errors.password = "Пароль має бути не менше 6 символів.";
        if(!form.confirmPassword) errors.confirmPassword = "Підтвердження пароля обов'язкове.";
        else if(form.confirmPassword !== form.password) errors.confirmPassword = "Паролі не співпадають.";
        if(!form.age || form.age < 14) errors.age = "Вік від 14.";
        if(!form.agree) errors.agree = "Погодження з умовами обов'язкове.";
        return Object.keys(errors).length === 0;
    }

    watch(form, () => {
        if(Object.keys(errors).length > 0){
            validate();
        }
    }, { deep: true });

    function onSubmit(){
        if(validate()){
            isSubmitting.value = true;
            setTimeout(() => {
                successMsg.value = "Реєстрація успішна!";

                form.name = '';
                form.email = '';
                form.password = '';
                form.confirmPassword = '';
                form.age = null;
                form.agree = false;

                isSubmitting.value = false;
            }, 2000);
        }
    }
</script>