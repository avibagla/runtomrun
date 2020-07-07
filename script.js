/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");

document.addEventListener("DOMContentLoaded", function(event) {
  var cruiseDirection = "waiting";
  var timeout = "";
  var videos = {};

  var gameStart = document.getElementById("game-start-button");
  

  var initializeGame = function() {
    var video_dict = {
      left:
        "https://cdn.glitch.com/438676d6-197f-4188-93aa-71e99e4cf218%2Fleft.mp4?v=1594022781234",
      right:
        "https://cdn.glitch.com/438676d6-197f-4188-93aa-71e99e4cf218%2Fright.mp4?v=1594022732595",
      up:
        "https://cdn.glitch.com/438676d6-197f-4188-93aa-71e99e4cf218%2Fup.mp4?v=1594022748998",
      down:
        "https://cdn.glitch.com/438676d6-197f-4188-93aa-71e99e4cf218%2Fdown.mp4?v=1594022770581",
      waiting:
        "https://cdn.glitch.com/438676d6-197f-4188-93aa-71e99e4cf218%2Fwaiting.mp4?v=1594022579505",
      stopped: "https://cdn.glitch.com/438676d6-197f-4188-93aa-71e99e4cf218%2Fstopped.mp4?v=1594022691389"
    };
    gameStart.classList.add("hidden");

    var gameArea = document.getElementById("game-area");

    // source.setAttribute('src', video_dict["waiting"]);
    // video.appendChild(source);
    // video.play();

    //create all the video elements.
    for (var key in video_dict) {
      var v = document.createElement("video");
      v.setAttribute("src", video_dict[key]);
      v.setAttribute("muted", true);
      v.setAttribute("loop", true);
      v.setAttribute("playsinline", true);
      v.setAttribute("id", key);
      v.classList.add("hidden");
      v.play();
      videos[key] = v;
      gameArea.appendChild(v);
    }

    videos["waiting"].classList.remove("hidden");
    videos["waiting"].classList.add("current_video");
  };
  

  gameStart.addEventListener("click", initializeGame);


  function getKeyAndSwitch(e) {
    var key_code = e.which || e.keycode;
    var newDirection = cruiseDirection;
    switch (key_code) {
      case 37: //left arrow key
      case 65: //a
        newDirection = "left";
        break;
      case 38: //Up arrow key
      case 87: //w
        newDirection = "up";
        break;
      case 39: //right arrow key
      case 68: //d
        newDirection = "right";
        break;
      case 40: //down arrow key
      case 83: //s
        newDirection = "down";
        break;
      default:
        newDirection = cruiseDirection;
        break;
    }

    return newDirection;
  }

  document.addEventListener("keydown", e => {
    //detecting arrow key down and swapping the video based on it. also cancel timeout
    clearTimeout(timeout);
    e.preventDefault();
    var newDirection = getKeyAndSwitch(e);
    if (newDirection !== cruiseDirection) {
      //"its a new direction!"
      // video.pause();
      // source.setAttribute('src', video_dict[newDirection]);
      // video.load();
      // video.play();
      videos[cruiseDirection].classList.add("hidden");
      videos[newDirection].classList.add("current_video");
      videos[newDirection].classList.remove("hidden");
      videos[cruiseDirection].classList.remove("current_video");
      cruiseDirection = newDirection;
    }
  });

  document.addEventListener("keyup", e => {
    videos["stopped"].load();
    //they let go of the keys, and it gets risky
    timeout = setTimeout(function() {
      //starts it over
      videos["stopped"].play();
      videos[cruiseDirection].classList.add("hidden");
      videos[cruiseDirection].classList.remove("current_video");
      videos["stopped"].classList.add("current_video");
      videos["stopped"].classList.remove("hidden");
      cruiseDirection = "stopped";
    }, 1000);
  });
});
