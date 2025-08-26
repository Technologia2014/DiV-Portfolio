import {
  animate,
  stagger,
  scroll,
} from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

//Circle mouse movement
// Select the circle element
const circleElement = document.querySelector('.circle');

// Create objects to track mouse position and custom cursor position
const mouse = { x: 0, y: 0 }; // Track current mouse position
const previousMouse = { x: 0, y: 0 } // Store the previous mouse position
const circle = { x: 0, y: 0 }; // Track the circle position

// Initialize variables to track scaling and rotation
let currentScale = 0; // Track current scale value
let currentAngle = 0; // Track current angle value

// Update mouse position on the 'mousemove' event
window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
const speed = 0.17;

// Start animation
const tick = () => {
  // MOVE
  // Calculate circle movement based on mouse position and smoothing
  circle.x += (mouse.x - circle.x) * speed;
  circle.y += (mouse.y - circle.y) * speed;
  // Create a transformation string for cursor translation
  const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

  // SQUEEZE
  // 1. Calculate the change in mouse position (deltaMouse)
  const deltaMouseX = mouse.x - previousMouse.x;
  const deltaMouseY = mouse.y - previousMouse.y;
  // Update previous mouse position for the next frame
  previousMouse.x = mouse.x;
  previousMouse.y = mouse.y;
  // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
  const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150); 
  // 3. Convert mouse velocity to a value in the range [0, 0.5]
  const scaleValue = (mouseVelocity / 150) * 0.5;
  // 4. Smoothly update the current scale
  currentScale += (scaleValue - currentScale) * speed;
  // 5. Create a transformation string for scaling
  const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

  // ROTATE
  // 1. Calculate the angle using the atan2 function
  const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
  // 2. Check for a threshold to reduce shakiness at low mouse velocity
  if (mouseVelocity > 20) {
    currentAngle = angle;
  }
  // 3. Create a transformation string for rotation
  const rotateTransform = `rotate(${currentAngle}deg)`;

  // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
  circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

  // Request the next frame to continue the animation
  window.requestAnimationFrame(tick);
}

// Start the animation loop
tick();


//languages motion
animate(".language", { opacity: 1, y: [50, 0] }, { delay: stagger(0.4) });


//Profile picture motion
// animate(
//         ".profile-pic",
//         { rotate: 90 },
//         { type: "spring", repeat: Infinity, repeatDelay: 0.2 }
//     )
animate(".profile-pic", { rotate: 360 }, { duration: 1 })


//Services
// press(".container-services", (element) => {
//         animate(element, { scale: 0.8 }, { type: "spring", stiffness: 1000 })

//         return () =>
//             animate(element, { scale: 1 }, { type: "spring", stiffness: 500 })
//     })


const items = document.querySelectorAll(".img-container");

// Animate gallery horizontally during vertical scroll
scroll(
  animate(".img-group", {
    transform: ["none", `translateX(-${items.length - 1}00vw)`],
  }),
  { target: document.querySelector(".img-group-container") }
);

// Progress bar representing gallery scroll
scroll(animate(".progress", { scaleX: [0, 1] }), {
  target: document.querySelector(".img-group-container"),
});

document.querySelectorAll(".img-container").forEach((li) => {
        const header = li.querySelector("h3")
        scroll(animate(header, { x: [-400, 300] }, { ease: "linear" }), {
            target: header,
        })
    })
