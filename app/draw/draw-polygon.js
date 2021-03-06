function DrawLine(Visual, obj, options) {
    // console.log(obj);
    const ctx = Visual.ctx;
    // draw basic line
    ctx.beginPath();
    ctx.save();

    const usePath = obj.path;
    let firstPoint = [];
    usePath.forEach((item, index) => {
        if (index === 0) {
            firstPoint = item;
            ctx.moveTo(item[0], item[1]);
        } else {
            ctx.lineTo(item[0], item[1]);
        }
    });
    ctx.lineTo(firstPoint[0], firstPoint[1]);

    if (obj.options.fill !== false) {
        ctx.fill();
    }
    if (obj.options.border) {
        ctx.stroke();
    }
    ctx.restore();


    if (obj && obj.isActive) {
        ctx.canvas.style.cursor = 'pointer';
        ctx.save();

        //

        const center = [(obj.sys.outBox.xMax + obj.sys.outBox.xMin) / 2, (obj.sys.outBox.yMax + obj.sys.outBox.yMin) / 2];
        // draw base line
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#d6d6d6';
        firstPoint = [];
        // console.log(center);
        usePath.forEach((item, index) => {
            const xOffset = item[0] > center[0] ? 1 : -1;
            const yOffset = item[1] > center[1] ? 1 : -1;
            if (index === 0) {
                // console.log(index, obj.sys.outBox, item, xOffset, yOffset);
            }
            if (index === 0) {
                firstPoint = item;
                ctx.moveTo(item[0] + xOffset, item[1] + yOffset);
            } else {
                ctx.lineTo(item[0] + xOffset, item[1] + yOffset);
            }
        });
        ctx.lineTo(firstPoint[0] + 1, firstPoint[1] + 1);
        ctx.stroke();

        // draw base line
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#333';
        firstPoint = [];
        usePath.forEach((item, index) => {
            if (index === 0) {
                firstPoint = item;
                ctx.moveTo(item[0], item[1]);
            } else {
                ctx.lineTo(item[0], item[1]);
            }
        });
        ctx.lineTo(firstPoint[0], firstPoint[1]);
        ctx.stroke();
        //

        // handle
        ctx.beginPath();
        ctx.strokeStyle = '#d6d6d6';
        usePath.forEach(item => {
            ctx.rect(item[0] - 4, item[1] - 4, 8, 8);
        });
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = '#333';
        usePath.forEach(item => {
            ctx.rect(item[0] - 3, item[1] - 3, 6, 6);
        });
        ctx.stroke();

        let strokeRadius = 14;
        let strokeStyle = 'rgba(255, 0, 0, 1)';
        let fillStyle = '#f00';
        if (options) {
            if (options.strokeRadius) {
                strokeRadius = options.strokeRadius;
            } else if (options.strokeStyle) {
                strokeStyle = options.strokeStyle;
            } else if (options.fillStyle) {
                fillStyle = options.fillStyle;
            }
        }

        if (obj.isActive.type === 'point' && obj.isActive.length < 10) {
            const index = obj.isActive.index;
            const point = usePath[index];
            ctx.beginPath();
            ctx.strokeStyle = strokeStyle;
            ctx.fillStyle = fillStyle;
            ctx.rect(point[0] - (strokeRadius / 2), point[1] - (strokeRadius / 2), strokeRadius, strokeRadius, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();
    }
}

export default DrawLine;