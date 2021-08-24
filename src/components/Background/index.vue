<template>
  <div class="common-background">
    <div class="back-shadow-left back-absolute" />
    <div class="back-shadow-right back-absolute" />
    <slot />
    <div class="back-footer">
      <img src="@/assets/img/background-bottom.png" alt="" srcset="">
    </div>
  </div>
</template>

<style scoped lang="scss">
.common-background {
  position: relative;
  width: 100vw;
  height: 100vh;
  .back-absolute {
    position: absolute;
    top: 0;
    z-index: 4;
    width: 940px;
    height: 30.57vw;
  }
  .back-shadow-left {
    left: 0;
    background-image: linear-gradient(
      90deg,
      rgba(7, 22, 42, 0.8) 0%,
      rgba(10, 22, 42, 0.6) 43.84%,
      rgba(15, 27, 48, 0.5) 79.3%,
      rgba(14, 29, 48, 0) 100%
    );
  }
  .back-shadow-right {
    right: 0;
    background-image: linear-gradient(
      270.65deg,
      rgba(7, 22, 42, 0.8) 0%,
      rgba(10, 22, 42, 0.6) 49.75%,
      rgba(15, 27, 48, 0.5) 79.3%,
      rgba(14, 29, 48, 0) 100%
    );
  }
  // .back-container {
  //   width: 100%;
  //   height: 30.57vw;
  //   position: relative;
  //   z-index: 5;
  //   box-sizing: border-box;
  //   padding: 64px 40px 0;
  //   display: flex;
  //   justify-content: space-between;
  // }
  .back-footer {
    position: absolute;
    left: 0;
    z-index: 4;
    top: calc(30.57vw - 24px);
    // bottom: 500px;
    height: 24px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 8px;
    font-size: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
