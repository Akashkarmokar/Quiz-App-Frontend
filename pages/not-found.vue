<template>
  <div class="home">
    <div class="container-level">
      <div class="not-found">
        <h1>404</h1>
        <h3>Not-Found</h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    
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
.not-found{
  margin-top: 30%;
}

</style>