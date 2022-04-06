<template>
  <div class="containar">
    <div class="choice-containar">
      <h3 id="level">Level: {{ this.$route.params.levelName | to-upperCase-first-letter }}</h3>
      <h3>Total Points: {{totalCorrect}} </h3>
      <table>
        <tr>
          <th>Question</th>
          <th>Choosed Option</th>
          <th>Ans</th>
        </tr>
        <tr v-for="(element, index) in choice" :key="index">
          <td>{{ element.questionName }}</td>
          <td>{{ element.choosedOption }}</td>
          <td>{{ element.is_ans }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  middleware:['authenticate','levelChecker'],
  data() {
    return {
      choice: [],
      totalCorrect:0,
    };
  },
  async created() {
    const url = "user/choice/level/";

    try {
      let { data } = await this.$axios.post(url,{
        userId:this.$store.state.authUser.id,
        levelName:this.$route.params.levelName
      });
      data = data.data;
      // console.log(data);
      data.forEach((element) => {
        const questionObject = {};
        questionObject.questionName = element.question.title;
        questionObject.choosedOption = element.option.title;
        questionObject.is_ans = element.option.is_ans == 1 ? "Correct" : "Wrong";
        this.choice.push(questionObject);
        if(element.option.is_ans==1){
          this.totalCorrect++;
        }
      });
      // console.log(this.choice);
    } catch (error) {}
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
.choice-containar {
  display: flex;
  width: 40%;
  height: 80%;
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
#level {
  margin-top: 10px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-top: 5px;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>