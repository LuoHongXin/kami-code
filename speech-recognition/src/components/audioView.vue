<template>
    <canvas ref="canvas"></canvas>
    <audio :src="audioUrl" controls ref="audio"></audio>
</template>
<script setup>
import audioUrl from '../assets/aa.mp3';

import { getCurrentInstance, onMounted } from 'vue'
const instance = getCurrentInstance();
onMounted(() => {
    const audioEle = instance.ctx.$refs.audio;
    const cvs = instance.ctx.$refs.canvas;
    const ctx = cvs.getContext("2d");
    console.log(audioEle, cvs);
    initCvs()
    function initCvs() {
        // `devicePixelRatio` 是一个 JavaScript 属性，用于获取设备的物理像素比例。可以用于在处理图像或其他需要考虑设备屏幕分辨率的情况下，确保正确的显示和渲染。
        cvs.width = window.innerWidth * devicePixelRatio;
        cvs.height = (window.innerHeight / 2) * devicePixelRatio;
    }
    let isInit = false;
    let dataArray, analyser
    audioEle.onplay = function () {
        if (isInit) return;
        // 初始化
        const audCtx = new AudioContext(); // 创建音频上下文
        const source = audCtx.createMediaElementSource(audioEle); // 创建音频源节点
        analyser = audCtx.createAnalyser(); // 创建分析节点
        analyser.fftSize = 512; // 默认值为2048，要求为2的n次幂
        // 创建字节数组，用于接收分析器节点的分析数据
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        source.connect(analyser); // 音频节点和分析节点连接
        analyser.connect(audCtx.destination); // 分析节点和输出设备连接
        isInit = true;
    }
    function draw() {
        requestAnimationFrame(draw);
        const { width, height } = cvs;
        // 清空画布
        ctx.clearRect(0, 0, width, height);
        if (!isInit) return;
        // 让分析器节点分析出数据到dataArray数组中
        analyser.getByteFrequencyData(dataArray);
        const len = dataArray.length / 2;
        const barWidth = width / len / 2; // 音柱的宽度
        ctx.fillStyle = "blue"
        for (let i = 0; i < len; i++) {
            const data = dataArray[i];
            const barHeight = data / 255 * height; // 音柱的高度
            const x1 = i * barWidth + width / 2; // x轴定位
            const x2 = width / 2 - (i + 1) * barWidth; // x轴定位
            const y = height - barHeight;// y轴定位
            ctx.fillRect(x1, y, barWidth - 2, barHeight);
            ctx.fillRect(x2, y, barWidth - 2, barHeight);
        }
    }
    draw()
})

</script>