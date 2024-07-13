const dom_range_picker = document.querySelector(".canvas-size-picker");
const dom_range_title = document.querySelector(".canvas-size-title");
const dom_canvas = document.querySelector(".canvas");
const dom_color_picker_wrapper = document.querySelector(
  ".color-picker-wrapper"
);
const dom_togglable_buttons = document.querySelectorAll(".togglable-btn");
const dom_gride_toggle = document.querySelector(".gride-toggle");
const dom_eraser = document.querySelector(".eraser");
const dom_clear = document.querySelector(".clear");

const cursorState = {
  tool: "cursor",
  color: "#fff",
  isMouseDown: false,
};

dom_color_picker_wrapper.firstElementChild.addEventListener(
  "input",
  (event) => {
    dom_color_picker_wrapper.style.backgroundColor = event.target.value;
    cursorState.color = event.target.value;
  }
);

dom_range_picker.addEventListener("input", (event) => {
  dom_range_title.textContent = `${event.target.value} by ${event.target.value}`;
  UpdateCanvas(event.target.value);
});

let UpdateCanvas = (value) => {
  // let dom_canvas = document.querySelector(".canvas");
  EmptyCanvas();
  const pixelClass = GetPixelClass(value);
  for (let i = 0; i < value * value; i++) {
    let pixel = document.createElement("div");
    pixel.className = `${pixelClass} pixel`;
    dom_canvas.appendChild(pixel);
  }
  colorpi();
};

let GetPixelClass = (value) => {
  switch (value) {
    case "8":
      return "eightByEight";
    case "16":
      return "sixteenBySixteen";
    case "24":
      return "twentyfourByTwentyfour";
    case "32":
      return "thirtytwoByThirtytwo";
    default:
      return "null";
  }
};

dom_togglable_buttons.forEach((btn) => {
  let btn_className;
  btn.addEventListener("click", (event) => {
    btn_className = event.target.className.split(" ")[0];
    switch (event.target.className.split(" ")[0]) {
      case "color-mode":
        cursorState.tool = "brush";
        cursorState.color = dom_color_picker_wrapper.children[0].value;
        event.target.classList.add("option-button-toggle");
        break;
      case "rainbow-mode":
        cursorState.tool = "rainbow-brush";
        event.target.classList.add("option-button-toggle");
        break;
      case "eraser":
        cursorState.tool = "eraser";
        cursorState.color = '';
        event.target.classList.add("option-button-toggle");
        break;
    }
    dom_togglable_buttons.forEach((btn_) => {
      if (
        !btn.className.includes("gride-toggle") &&
        !btn_.className.includes(btn_className) &&
        btn_.className.includes("option-button-toggle")
      ) {
        btn_.classList.remove("option-button-toggle");
      }
    });
  });
});

dom_eraser.addEventListener("click", () => {
  cursorState.tool = "eraser";
  cursorState.color = "";
});

dom_clear.addEventListener("click", () => {
  ClearCanvas();
});

dom_gride_toggle.addEventListener("click", (event) => {
  event.target.classList.toggle("option-button-toggle");
  Array.from(dom_canvas.children).forEach((div) => {
    div.classList.toggle("borderless");
  });
});

let ClearCanvas = () => {
  // let dom_canvas = document.querySelector(".canvas");
  Array.from(dom_canvas.children).forEach(pixel => {
    pixel.style.backgroundColor = "";
  });
};

let EmptyCanvas = () => {
  dom_canvas.innerHTML = '';
};

let GetRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


let ColorPixel = (pixel) => {
  if (pixel.classList.contains("pixel")) {
    if(cursorState.tool === "rainbow-brush") {
      cursorState.color = GetRandomColor();
    }
    pixel.style.backgroundColor = cursorState.color;
  }
};

let colorpi = () => {
  Array.from(dom_canvas.children).forEach(pixel => {
    pixel.style.backgroundColor = `${cursorState.color}`;
  });
};

dom_canvas.addEventListener('mousedown',(event) => {
  event.preventDefault();
  cursorState.isMouseDown = true;
  ColorPixel(event.target);
});


document.addEventListener('mouseup', () => {
cursorState.isMouseDown = false;
});


dom_canvas.addEventListener('mouseover', (event) => {
if (cursorState.isMouseDown) {
  ColorPixel(event.target);
}
});

document.addEventListener('selectstart', (event) => {
if (cursorState.isMouseDown) {
  event.preventDefault();
}
});