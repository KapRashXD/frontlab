<template>
    <div>
        <h2>Profile</h2>
        <nav>
            <router-link to="/profile/info" active-class="active-link">Info</router-link>
            <router-link to="/profile/settings" active-class="active-link">Settings</router-link>
        </nav>
        <div>
            <router-view />
        </div>
    </div>
</template>

<style scoped>
    nav {
        display: flex;
        gap: 20px;
    }

    .active-link {
        font-weight: bold;
        text-decoration: underline;
    }
</style>

<script>
    export default {
        name: 'ProfileView'
    }
</script>