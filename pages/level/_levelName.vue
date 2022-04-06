<template>
  <div>
    <div class="container-app">
      <div class="container-quiz">
        <div class="quiz-header">Level: {{ levelName | to-upperCase-first-letter}}   </div>
        <div
          v-show="!showScore"
          class="quiz-main"
          v-for="(questionItem, index) in getQuestions.slice(
            recentIndex,
            uptoIndex
          )"
          :key="index"
        >
          <div class="box-question">
            <h2>Question: {{ recentIndex + 1 }}/{{ getQuestions.length }}</h2>

            <p>{{ questionItem.title }}</p>
          </div>
          <div class="box-suggestions">
            <ul>
              <li
                v-for="(optionItem, index) in questionItem.options"
                :key="index"
                v-on:click="selectResponse(optionItem,$event)"
              >
                {{ optionItem.title }}
              </li>
            </ul>
          </div>
          <div v-if="select">
            <h3>Selected: {{ selectedItem }}</h3>
          </div>
        </div>
        <div class="box-score" v-if="showScore">
          <h2>Your Score is</h2>
          <h2>{{ score }}/{{ getQuestions.length }}</h2>
        </div>
        <div class="quiz-footer">
          <div class="box-button" v-show="!showScore">
            <button v-on:click="select ? nextQuestion() : null">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware:['authenticate','levelChecker'],
  data() {
    return {
      levelName: this.$route.params.levelName,
      recentIndex:0,
      uptoIndex:1,
      select:false,
      selectedItem:'',
      showScore: false,
      quiz: {
        // easy: [
        //   {
        //     id: 1,
        //     level_id: 9,
        //     title:
        //       "Which of the following blood vessels carries deoxygenated blood?",
        //     options: [
        //       {
        //         id: 1,
        //         question_id: 1,
        //         title: "Pulmonary Vein",
        //       },
        //       {
        //         id: 4,
        //         question_id: 1,
        //         title: "Aorta",
        //       },
        //       {
        //         id: 6,
        //         question_id: 1,
        //         title: "Coronary Artery",
        //       },
        //       {
        //         id: 8,
        //         question_id: 1,
        //         title: "Pulmonary Artery",
        //       },
        //     ],
        //   },
        //   {
        //     id: 4,
        //     level_id: 9,
        //     title:
        //       "Which Canadian reggae musician had a 1993 hit with the song &#039;Informer&#039;?",
        //     options: [
        //       {
        //         id: 12,
        //         question_id: 4,
        //         title: "Rain",
        //       },
        //       {
        //         id: 13,
        //         question_id: 4,
        //         title: "Hail",
        //       },
        //       {
        //         id: 15,
        //         question_id: 4,
        //         title: "Sleet",
        //       },
        //       {
        //         id: 17,
        //         question_id: 4,
        //         title: "Snow",
        //       },
        //     ],
        //   },
        // ],
        easy:[],
        medium: [],
        hard: [],
      },
      DataTOSever:[],
    };
  },
  computed: {
    getQuestions: function () {
      return this.quiz[this.levelName];
    },
  },
  methods:{
      selectResponse(optionItem,event){
            // console.log(event.target.innerHTML.trim());
            // if(this.select === false){
            //   event.target.className = 'selected';
            // }
            // event.target.className = 'selected';
            this.select= true;
            this.selectedItem = event.target.innerHTML.trim();
            /**
             * Store User Choosed Option 
             */
            const userChoice = {
                userId: this.$store.state.authUser.id,
                levelId:this.quiz[this.levelName][0].level_id,
                questionId: optionItem.question_id,
                optionId: optionItem.id,
            }
            // console.log(this.$store.state.authUser.id);
            // console.log(userChoice);
            this.DataTOSever.push(userChoice);
        },
        check: function(optionItem,event){
            // console.log(event);
            return 'selected';
        },
        nextQuestion: async function() {
          this.recentIndex++;
          this.uptoIndex++;
          this.select = false;
          if(this.recentIndex == this.quiz[this.levelName].length){
                

                // Send User Data to server
                try {
                    const data = await this.$axios.post('level/'+this.levelName+'/questions',{
                        data:this.DataTOSever
                    });    
                    // console.log(data);
                } catch (error) {
                    console.log('User Selected data not upload to the server !!');
                } 
                
                
                
                
                const userFinalResult = await this.$axios.get('user/'+this.$store.state.authUser.id+'/results/level/'+this.levelName);
                // console.log(userFinalResult);
                this.score = userFinalResult.data.data;
                this.showScore = true;
            }
      },
  },
  filters:{
    to_upperCase(value){
      return value.toUpperCase();
    }
  },
  async created(){
        const levelName = this.$route.params.levelName;
        // console.log(this.$store.state.quiz[levelName])
        let isPlayed ;
        try {
          const {data} = await this.$axios.post('/user/choice/level',{
            userId:this.$store.state.authUser.id,
            levelName:levelName,
          })
          // console.log(data.data.length);
          isPlayed = data.data.length>0 ? true : false;
          if(isPlayed){
            alert("You are played this level !!")
            this.$router.push('/points/'+levelName);
          }
        } catch (error) {
          console.log(error)
        }
        const url = 'level/'+levelName+'/questions';
        if(this.quiz[levelName].length==0){
            try {
                const res = await this.$axios.get(url);
                // console.log(this.$store.state.quiz[levelName]);
                this.quiz[levelName] = res.data.questions;
                // console.log(this.$store.state.quiz[levelName]);
            } catch (error) {
                // console.log(error)
                console.log("Something is wrong with API CALL !!")
            }   
        }
        // console.log('Created Function Called !!')
    }
};
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
  margin: auto;
  letter-spacing: 2px;
}
.container-app {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}

.container-quiz {
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
.quiz-header {
  display: flex;
  width: 100%;
  height: 20%;
  border-bottom: 1px solid #e7eae0;
  justify-content: center;
  align-items: center;
  background-color: #e7eae0;
  border-radius: 10px 10px 0px 10px;
}

.quiz-main {
  display: flex;
  width: 100%;
  height: 70%;
  flex-flow: column;
  align-items: center;

  margin: auto;
}

.quiz-footer {
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: center;
  border-top: 1px solid #e7eae0;
  background-color: #e7eae0;
  border-radius: 0px 0px 10px 10px;
}
.box-question {
  margin-top: 20px;
  text-align: center;
}

.box-question p {
  margin: 10px;
}
.box-suggestions {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: auto;
}
.ul {
  display: flex;
  width: 80%;
  margin: 0;
  padding: 0;
  flex-flow: column;
}
ul li {
  list-style: none;
  line-height: 2;
  border: 1px solid #cdd2d2;
  margin-bottom: 20px;
  border-radius: 15px;
  cursor: pointer;
}
li:hover {
  background-color: #e7eae0;
}

.box-button {
  display: flex;
  width: 100%;
  height: 100%;
}
.box-button button {
  width: 35%;
  height: 80%;
  outline: none;
  border: 0;
  color: white;
  font-size: 18px;
  cursor: pointer;
  border-radius: 15px;
  margin: auto;
  background-color: #a09f9ff5;
}

/* li.correct {
  border: 1px solid rgb(74, 219, 74);
  background-color: rgb(74, 219, 74);
  color: white;
  font-weight: 600;
}

li.incorrect {
  border: 1px solid rgb(240, 117, 110);
  background-color: rgb(240, 117, 100);
  color: white;
  font-weight: 600;
} */
li.selected {
  border: 1px solid rgb(74, 219, 74);
  background-color: rgb(74, 219, 74);
  color: white;
  font-weight: 600;
  transition-duration: 500ms;
  transition-property: 'background-color';
}

</style>