<template>
    <div class="container-app">
      <div class="container-registration">
          <div class="form">
              <form v-on:submit.prevent action="" method="post">
                <div class="form-field">
                    <label for="username">Username</label>
                    <input type="text" id="username" required v-model="userInfo.username">
                </div>
                <div class="form-field">
                    <label for="email">Email</label>
                    <input type="text" id="email" required v-model="userInfo.email">
                </div>
                <div class="form-field">
                    <label for="password">Password</label>
                    <input type="password" id="password" required v-model="userInfo.password" placeholder="*Min 8 Character">
                </div>
                <div class="submit-field">
                    <button v-on:click="register">Register</button>
                </div>
            </form>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    middleware:'guest',
    data(){
        return {
            userInfo:{
                username:'',
                email:'',
                password:'',
            }
        }
    },
    methods:{
        register: async function(){
            try {
                await this.$axios.post('/register',this.userInfo);     
                this.$router.push('/login');
            } catch (error) {
                alert('Username or Email or Password was Wrong !!');
            }
           
        //    const loginInfo = {
        //        uid: this.userInfo.username,
        //        password:this.userInfo.password,
        //    }
        //    await this.$auth.loginWith('local',{
        //        data:loginInfo
        //    });
            
        }
    }
}
</script>
    
<style scoped>
    .container-app{
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
    }
    .container-registration{
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
    
    .form label{
        display: block;
    }
    .form .form-field{
        margin: 15px;
    }
</style>