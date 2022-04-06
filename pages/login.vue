<template>
  <div class="container-app">
      <div class="container-login">
          <div class="form">
              
                <div class="form-field">
                    <label for="username">Username Or Email</label>
                    <input type="text" id="username" required v-model="userInfo.uid">
                </div>
                <div class="form-field">
                    <label for="password">Password</label>
                    <input type="password" id="password" required v-model="userInfo.password">
                </div>
                <div class="submit-field">
                    <button type="submit" v-on:click='login'>Login</button>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    middleware:'guest',
    data(){
        return{
            userInfo : {
                uid:'testuser5',
                password:'testuser',
            }
        }
    },
    methods:{
        login: async function(){
            try {
                const { data:userData } = await this.$auth.loginWith('local',{
                    data:this.userInfo
                });
                this.$store.state.authUser = userData;
                this.$router.push('/');
            } catch (error) {
                // console.log(error);
                alert('Username or Email or Password was Wrong !!');
            }
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
    .container-login{
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