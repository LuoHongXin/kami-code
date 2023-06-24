<script setup>
window.addEventListener("load", () => {
  const icon = document.getElementById("icon");
  const content = document.getElementById("content");
  icon.addEventListener("click", () => {
    if (icon.innerText === "结束录音") {
      icon.innerText = "开始录音";
      recognition.stop();
    } else {
      icon.innerText = "结束录音";
      content.focus()
      recognition.start();
    }
  });
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "zh-CN"

  recognition.addEventListener("result", (event) => {
    let result = "";
    for (let index = 0; index <= event.resultIndex; index++) {
      result += event.results[index][0].transcript;

    }
    content.value = result;
  })
  recognition.onerror = function (event) {
    console.log('Error occurred in recognition: ' + event.error);
  }
})

</script>

<template>
  <textarea id="content" cols="30" rows="10"></textarea>
  <button id="icon">开始录音</button>
</template>

<style scoped>
</style>
