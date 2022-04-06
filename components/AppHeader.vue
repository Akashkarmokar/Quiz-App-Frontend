<template>
    <header class="header">
        <h1 class="title">QuizApp</h1>
        <!-- <h1>{{ $store.state.authUser }}</h1> -->
        <ul>
            <li v-if="$store.state.authUser"><nuxt-link to="/">Home</nuxt-link></li>
            <li v-if="$store.state.authUser"><nuxt-link to="/profile">Profile</nuxt-link></li>
            <li v-if="$store.state.authUser"><button v-on:click='logout' id="logout-btn">Logout</button></li>    
            <li v-if="!$store.state.authUser"><nuxt-link to="/login">Login</nuxt-link></li>
            <li v-if="!$store.state.authUser"><nuxt-link to="/registration">Registration</nuxt-link></li>
        </ul>
        <!-- {{ $store.state.authUsr }} -->
    </header>
</template>

<script>
export default {
    name:'AppHeader',
    methods:{
        async logout(){
            await this.$axios.get('/logout');
            // this.$auth.logout();
            // this.$store.state.user = 'no user';
            this.$store.state.authUser = false;
            this.$router.push('/login')
        }
    }
}
</script>


<style scoped>
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px dotted #ccc;
    }
    .header .title{
        font-size: 3rem;
        color:#526488;
    }

    .header ul {
        display: flex;
    }

    .header a{
        display: inline-block;
        background: #35495e;
        color: #fff;
        padding: 0.3rem 1rem;
        margin-right: 0.5rem;
    }
    li{
        list-style: none;
    }
    #logout-btn{
        background-color:#526488;
        color: white;
        height: 100%;
        margin-right: 5px;
    }
</style>