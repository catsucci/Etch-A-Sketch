const dom_range_picker = document.querySelector('.canvas-size-picker');
const dom_range_title = document.querySelector('.canvas-size-title');
dom_canvas = document.querySelector('.canvas');

dom_range_picker.addEventListener('input', function() {
    dom_range_title.textContent = `${this.value} by ${this.value}`;
    console.log(this.value);
    UpdateCanvas(this.value);
});

let UpdateCanvas = (value) => {
    let dom_canvas = document.querySelector('.canvas');
    ClearCanvas();
    const pixelClass = GetPixelClass(value);
    for (let i = 0; i < value * value; i++) {
        let pixel = document.createElement('div');
        pixel.className = `${pixelClass}`;
        console.log(dom_canvas);
        dom_canvas.appendChild(pixel);
    }
}

let GetPixelClass = (value) => {
    switch (value) {
        case '8':
            return 'eightByEight';
        case '16':
            return 'sixteenBySixteen';
        case '24':
            return 'twentyfourByTwentyfour';
        case '32':
            return 'thirtytwoByThirtytwo';
        default:
            return 'null';
    }
}

let ClearCanvas = () => {
    let dom_canvas = document.querySelector('.canvas');
    dom_canvas.innerHTML = '';
}
