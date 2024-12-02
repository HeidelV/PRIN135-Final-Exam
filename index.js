l1_balls = document.querySelectorAll(".layer1 .ball");
l2_balls = document.querySelectorAll(".layer2 .ball");
l3_balls = document.querySelectorAll(".layer3 .ball");
size = 0;

for (let index = 0; index < l1_balls.length; index++) {
    negative = Math.round(Math.random()) * 2 - 1
    top_num = Math.floor(Math.random() * 10 + 11);
    left_num = Math.floor(Math.random() * 5 + size * negative) + -5;
    ball = l1_balls[index];
    ball.style.top = top_num + "px";
    ball.style.left = left_num + "px";
    size += 10;
}

size = 0;
for (let index = 0; index < l2_balls.length; index++) {
    negative = Math.round(Math.random()) * 2 - 1
    top_num = Math.floor(Math.random() * 10 + 11) + 5;
    left_num = Math.floor(Math.random() * 70 + size * negative) + -30;
    ball = l2_balls[index];
    ball.style.top = top_num + "px";
    ball.style.left = left_num + "px";
    size += 5;
}

size = 0;
for (let index = 0; index < l3_balls.length; index++) {
    negative = Math.round(Math.random()) * 2 - 1
    top_num = Math.floor(Math.random() * 10 + 11) + 20;
    left_num = Math.floor(Math.random() * 100 + size * negative) + -50;
    ball = l3_balls[index];
    ball.style.top = top_num + "px";
    ball.style.left = left_num + "px";
    size += 5;
}

document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("snowCanvas");
    var ctx = canvas.getContext("2d");
  
    // Set canvas size and resize handler
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  
    // Generate snowflakes
    var snowflakes = [];
    function initSnowflakes() {
      snowflakes = [];
      for (var i = 0; i < 100; i++) {
        snowflakes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * sizeRange.value,
          speed: Math.random() * speedRange.value + 1
        });
      }
    }
    initSnowflakes();
  
    // Update snowflakes when controls are changed
    sizeRange.addEventListener("input", initSnowflakes);
    speedRange.addEventListener("input", initSnowflakes);
  
   // Draw snowflakes
  function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    snowflakes.forEach(function(snowflake) {
      drawSnowflake(snowflake.x, snowflake.y, snowflake.radius);
    });
    moveSnowflakes();
  }
  // Function to draw an individual snowflake
  function drawSnowflake(x, y, radius) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    // Draw a snowflake using lines and arcs
    for (let i = 0; i < 6; i++) {
      ctx.lineTo(0, radius);
      ctx.translate(0, radius);
      ctx.rotate(Math.PI / 3);
      ctx.arc(0, radius / 2, radius / 2, 0, Math.PI);
      ctx.rotate(Math.PI / 3);
      ctx.translate(0, -radius);
    }
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.restore();
  }
    // Move snowflakes
    function moveSnowflakes() {
      for (var i = 0; i < snowflakes.length; i++) {
        var snowflake = snowflakes[i];
        snowflake.y += snowflake.speed;
        if (snowflake.y > canvas.height) {
          snowflake.y = 0;
          snowflake.x = Math.random() * canvas.width;
        }
      }
    }
  
    // Animate snowflakes
    function animate() {
      drawSnowflakes();
      requestAnimationFrame(animate);
    }
  
     var clouds = [];
  
    // Function to add clouds
    function addClouds() {
      for (let i = 0; i < 2; i++) {
        clouds.push({
          x: -200,
          y: Math.random() * canvas.height / 4,
          speed: Math.random() * 2 + 1
        });
      }
    }
  
    // Draw clouds
    function drawClouds() {
      clouds.forEach(function(cloud) {
        // Drawing a simple cloud shape using arcs
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, 40, 0, Math.PI * 2, false);
        ctx.arc(cloud.x + 50, cloud.y - 20, 35, 0, Math.PI * 2, false);
        ctx.arc(cloud.x + 30, cloud.y - 25, 25, 0, Math.PI * 2, false);
        ctx.fillStyle = 'white';
        ctx.fill();
      });
    }
  
    // Move clouds
    function moveClouds() {
      for (let i = clouds.length - 1; i >= 0; i--) {
        clouds[i].x += clouds[i].speed;
        if (clouds[i].x > canvas.width + 200) {
          clouds.splice(i, 1); // remove cloud if it's off the screen
        }
      }
    }
  
    // Canvas click event
    canvas.addEventListener('click', addClouds);
  
    // Animate
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawClouds();
      drawSnowflakes();
      moveClouds();
      moveSnowflakes();
      requestAnimationFrame(animate);
    }
  
    animate();
  });

  