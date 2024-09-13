import { useEffect, useState, useRef } from 'react';
const WheelComponent = ({
    segments,
    winningSegment,
    onFinished,
    primaryColor = 'black',
    contrastColor = 'white',
    buttonText = 'Spin',
    isOnlyOnce = true,
    size = window.innerWidth,
    upDuration = 100,
    downDuration = 1000,
    fontFamily = 'proxima-nova',
    // fontSize = '1.2em',
    outlineWidth = 5,
    disablePointerEvents
}) => {
    const randomString = () => {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
        const length = 8;
        let str = '';
        for (let i = 0; i < length; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    };

    const canvasId = useRef(`canvas-${randomString()}`);
    const wheelId = useRef(`wheel-${randomString()}`);
    const dimension = (size + 20) * 2;
    let currentSegment = '';
    let isStarted = false;
    const [isFinished, setFinished] = useState(false);
    let timerHandle = 0;
    const timerDelay = segments.length;
    let angleCurrent = 0;
    let angleDelta = 0;
    let canvasContext = null;
    let maxSpeed = Math.PI / segments.length;
    const upTime = segments.length * upDuration;
    const downTime = segments.length * downDuration;
    let spinStart = 0;
    let frames = 0;
    const centerX = size + 20;
    const centerY = size + 20;

    useEffect(() => {
        wheelInit();
        setTimeout(() => {
            window.scrollTo(0, 1);
        }, 0);
    }, []);

    const wheelInit = () => {
        initCanvas();
        wheelDraw();
    };

    const initCanvas = () => {
        let canvas = document.getElementById(canvasId.current);

        if (navigator.userAgent.indexOf('MSIE') !== -1) {
            canvas = document.createElement('canvas');
            canvas.setAttribute('width', `${dimension}`);
            canvas.setAttribute('height', `${dimension}`);
            canvas.setAttribute('id', canvasId.current);
            document.getElementById(wheelId.current)?.appendChild(canvas);
        }

        canvas?.addEventListener('click', spin, false);
        canvasContext = canvas?.getContext('2d');
    };

    const spin = () => {
        isStarted = true;
        if (timerHandle === 0) {
            spinStart = new Date().getTime();
            maxSpeed = Math.PI / segments.length;
            frames = 0;
            timerHandle = window.setInterval(onTimerTick, timerDelay);
        }
    };

    const onTimerTick = () => {
        frames++;
        draw();
        const duration = new Date().getTime() - spinStart;
        let progress = 0;
        let finished = false;

        if (duration < upTime) {
            progress = duration / upTime;
            angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
        } else {
            if (winningSegment) {
                if (currentSegment === winningSegment && frames > segments.length) {
                    progress = duration / upTime;
                    angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
                    progress = 1;
                } else {
                    progress = duration / downTime;
                    angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
                }
            } else {
                progress = duration / downTime;
                angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
            }

            if (progress >= 1) finished = true;
        }

        angleCurrent += angleDelta;
        while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
        if (finished) {
            setFinished(true);
            onFinished(currentSegment);
            clearInterval(timerHandle);
            timerHandle = 0;
            angleDelta = 0;
        }
    };

    const wheelDraw = () => {
        clear();
        drawWheel();
        drawNeedle();
    };

    const draw = () => {
        clear();
        drawWheel();
        drawNeedle();
    };

    const drawSegment = (key, lastAngle, angle) => {
        if (!canvasContext) {
            return false;
        }

        const ctx = canvasContext;
        const value = segments[key];
        // let fillColor = 'linear-gradient(red, yellow)';
        // // Set colors based on even or odd segment
        // if (key % 2 === 0) {
        //     // Even segment
        //     fillColor = 'linear-gradient(red, yellow)'; // Example color for even segments
        // } else {
        //     // Odd segment
        //     fillColor = '#F0CF50'; // Example color for odd segments
        // }


        // Create a gradient
        // Create a gradient for each segment
        const gradient = ctx.createLinearGradient(centerX, centerY - size, centerX, centerY + size);
        const gradialgradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size);

        if (key % 2 === 0) {
            gradient.addColorStop(0, '#D41000');
        } else {
            gradialgradient.addColorStop(0, '#FFF3A6');
            gradialgradient.addColorStop(0.8092, '#EBC539');
            gradialgradient.addColorStop(1, '#B57E10');
        }

        // const segmentRadius = size + 30;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, size, lastAngle, angle, false);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        // ctx.fillStyle = segColors[key % segColors.length];
        ctx.fillStyle = key % 2 == 0 ? gradient : gradialgradient;
        ctx.fill();

        // ctx.stroke();
        ctx.save();

        ctx.translate(centerX, centerY);
        ctx.rotate((lastAngle + angle) / 2);

        // ctx.fillStyle = contrastColor;
        ctx.fillStyle = key % 2 == 0 ? "gold" : "black";

        // ctx.font = `700 ${fontSize} ${fontFamily}`;
        ctx.font = `700 1em ${fontFamily}`;
        ctx.fillText(value.substring(0, 21), size / 2 + 20, 0);
        ctx.restore();
    };

    const drawWheel = () => {
        if (!canvasContext) {
            return false;
        }

        const ctx = canvasContext;
        let lastAngle = angleCurrent;
        const len = segments.length;
        const PI2 = Math.PI * 2;
        ctx.lineWidth = 1;
        ctx.strokeStyle = primaryColor;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = '1.2em ' + fontFamily;

        for (let i = 1; i <= len; i++) {
            const angle = PI2 * (i / len) + angleCurrent;
            drawSegment(i - 1, lastAngle, angle);
            lastAngle = angle;
        }

        // Draw a center circle
        // Create linear gradient for even and odd segments
        const linearGradient = ctx.createLinearGradient(centerX - size, centerY - size, centerX + size, centerY + size);

        linearGradient.addColorStop(0.107, '#C8992E');   // 10.7%
        linearGradient.addColorStop(0.227, '#B57E10');   // 22.7%
        linearGradient.addColorStop(0.4494, '#F9DF7B');  // 44.94%
        linearGradient.addColorStop(0.5777, '#FFF3A6');  // 57.77%
        linearGradient.addColorStop(0.6857, '#F9DF7B');  // 68.57%
        linearGradient.addColorStop(0.8445, '#B57E10');  // 84.45%
        linearGradient.addColorStop(0.8534, '#B98416');  // 85.34%
        linearGradient.addColorStop(0.9037, '#CDA035');  // 90.37%


        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, 0, PI2, false);
        ctx.closePath();
        ctx.fillStyle = linearGradient;
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#e5bf54";


        ctx.fill();
        ctx.font = '700 1.2em ' + fontFamily;
        ctx.fillStyle = "#7A0900";
        ctx.textAlign = 'center';
        ctx.fillText(buttonText, centerX, centerY + 3);
        ctx.stroke();

        // Draw outer circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, size, 0, PI2, false);
        ctx.closePath();
        ctx.lineWidth = outlineWidth;
        ctx.strokeStyle = "#D41000";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerX, centerY, size + 5, 0, PI2 + 5, false);
        ctx.closePath();
        ctx.lineWidth = outlineWidth;
        ctx.strokeStyle = "#C8992E";
        ctx.stroke();
    };

    const drawNeedle = () => {
        if (!canvasContext) {
            return false;
        }

        const ctx = canvasContext;
        ctx.lineWidth = 1;
        ctx.strokeStyle = contrastColor;
        ctx.fillStyle = contrastColor;
        ctx.beginPath();
        ctx.moveTo(centerX + 20, centerY - 50);
        ctx.lineTo(centerX - 20, centerY - 50);
        ctx.lineTo(centerX, centerY - 50);
        ctx.closePath();
        ctx.fill();

        const change = angleCurrent + Math.PI / 2;
        let i = segments.length - Math.floor((change / (Math.PI * 2)) * segments.length) - 1;
        if (i < 0) i = i + segments.length;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = primaryColor;
        ctx.font = '700 1.5em ' + fontFamily;
        currentSegment = segments[i];
        isStarted && ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
    };

    const clear = () => {
        if (!canvasContext) {
            return false;
        }

        const ctx = canvasContext;
        ctx.clearRect(0, 0, dimension, dimension);
    };

    return (
        <div id={wheelId.current}>
            <canvas
                id={canvasId.current}
                width={dimension}
                height={dimension}
                style={{
                    pointerEvents: isFinished && isOnlyOnce || !disablePointerEvents ? 'none' : 'auto'
                }}
            />
        </div>
    );
};

export default WheelComponent;
