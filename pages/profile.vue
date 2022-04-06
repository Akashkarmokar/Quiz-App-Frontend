<template>
  <div class="containar">
    <div class="profile-containar">
      <div class="profile-info">
        <h3>Id : {{ $store.state.authUser.id }}</h3>
        <h3>Username : {{ $store.state.authUser.username }}</h3>
        <h3>Email: {{ $store.state.authUser.email }}</h3>
      </div>

      <div class="score-info">
        <h2>Score</h2>
        <ul id="score">
          <li>
            <nuxt-link to="/points/easy"> Easy: {{ points.easy * 10 }}% </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/points/medium">
              Medium: {{ points.medium * 10  }}%
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/points/hard"> Hard: {{ points.hard * 10 }}% </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware:'authenticate',
  data() {
    return {
      points: {
        easy: 0,
        medium: 0,
        hard: 0,
      },
    };
  },
  async created() {
    //Get User's easy levels Data
    try {
      let { data: easyData } = await this.$axios.post("user/results/level",{
        userId:this.$store.state.authUser.id,
        levelName:'easy'
      });
      this.points.easy = easyData.data;  
    } catch (error) {
      console.log(error.response.status);
    }

    

    // Get User's Medium Levels Data
    try {
      let { data: mediumData } = await this.$axios.post("user/results/level",{
        userId:this.$store.state.authUser.id,
        levelName:'medium',
      });
      this.points.medium = mediumData.data;
    } catch (error) {
      console.log(error.response.data)
    }
    

    //Get User's Hard Levels Data
    try {
      let { data: hardData } = await this.$axios.post("user/results/level",{
        userId:this.$store.state.authUser.id,
        levelName:'hard',
      });
      this.points.hard = hardData.data;
    } catch (error) {
      console.log(error.response.data);
    }
    
  },
};
</script>

<style scoped>
.containar {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}

.profile-containar {
  display: flex;
  width: 40%;
  height: 70%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  flex-flow: column;
  text-align: center;
  border: 1px solid #e7eae0;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.9), 0 6px 6px rgba(0, 0, 0, 0.19);
}

.ul{
    display: flex;
    width:50%;
    margin: 0;
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
.profile-info {
  /* text-align: left; */
  margin-top: 20%;
}
.score-info{
  margin-top: 10%;
}
</style>