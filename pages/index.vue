<!--
<template>
  <div class="container">
    <div>
        <h1>user is : {{$store.state.authUser.username}}</h1>
        <!-- <h1 v-if="$store.state.authUser">User name: {{ $store.state.user.username }}</h1> -->
        <!-- <Button type="info" @click="login">Login</Button>
        <Button type="info" @click="getUser">Get user</Button> -->
        <!-- <div >
          <h3>User Info</h3>
          <p>{{ $auth.loggedIn }}</p>
        </div> -->
        <!--
    </div>
  </div>
</template>
-->
<!--
<script>
import Logo from '~/components/Logo.vue'
export default {
  methods : {
     async login(){

        const res = await this.callApi('get', 'login')
        if(res.status==200){
           console.log(res.data)
        }
     },
     async getUser(){
        const res = await this.callApi('post', 'post', {})
        console.log(res.data)
     }
  },

  // async created(){
  //     const res = await this.callApi('get', 'myuser')
  //     console.log(res)
  // },
  components: {
    Logo
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  /* min-height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
-->
<template>
  <div class="home">
    <div class="container-level">
      <div class="level-option">
        <h3>Levels</h3>
        <ul>
          <li><nuxt-link to="/level/easy">Easy</nuxt-link></li>
          <li><nuxt-link to="/level/medium">Medium</nuxt-link></li>
          <li><nuxt-link to="/level/hard">Hard</nuxt-link></li>
      </ul>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  middleware:'authenticate',
}
</script>
<style scoped>
.home{
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}
.container-level{
    display: flex;
    width: 40%;
    height: 70%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin:auto;
    flex-flow: column;
    text-align: center;
    border:1px solid #e7eae0;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.9), 0 6px 6px rgba(0, 0, 0, 0.19) ;
}
.level-option{
  margin-top: 30%;
}
.ul{
    display: flex;
    width:50%;
    margin:0%;
    padding: 0;
    flex-flow: column;
    justify-content: center;
}
ul li{
    list-style: none;
    line-height: 2;
    border: 1px solid #cdd2d2;
    margin-bottom: 20px;
    border-radius: 15px;
    cursor: pointer;
}
li:hover{
    background-color: #e7eae0;
}
</style>