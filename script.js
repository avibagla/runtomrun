/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");

document.addEventListener("DOMContentLoaded", function(event) {
  var cruiseDirection = "waiting";
  var timeout = "";
  var gamePadTimeout = "";
  var videos = {};
  var gameStarted = false;

  var gameStart = document.getElementById("game-start-button");
  var bottomText = document.getElementById("bottom-text");


  var initializeGame = function() {
    gameStarted=true;
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
    document.getElementById("mobile-gamepad").classList.remove("hidden");
    videos["waiting"].classList.add("current_video");
    bottomText.innerHTML = "Tom is <b><i>ready to run<i/></b>";
  };
  

  gameStart.addEventListener("click", initializeGame);


  function getKeyAndSwitch(e) {
    var key_code = e.which || e.keycode;
    var newDirection = cruiseDirection;
    console.log(e.which);

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
    console.log(newDirection);


    return newDirection;

  }
  var gameUpdate = function(newDirection){
    //detecting arrow key down and swapping the video based on it. also cancel timeout
    if (newDirection !== cruiseDirection) {
      //"its a new direction!"
      // video.pause();
      // source.setAttribute('src', video_dict[newDirection]);
      // video.load();
      // video.play();
      ["up", "left", "right", "down"].forEach(element => {
        document.getElementsByClassName("press-" + element)[0].classList.remove("active-button");

      });
      videos[cruiseDirection].classList.add("hidden");
      videos[newDirection].classList.add("current_video");
      videos[newDirection].classList.remove("hidden");
      videos[cruiseDirection].classList.remove("current_video");
      cruiseDirection = newDirection;
      var newText = "";
      switch (newDirection) {
        case "left": newText = "Tom is running to the <b>left</b>"; break;
        case "right": newText = "Tom is running to the <b>right</b>"; break;
        case "up": newText = "Tom is running <b>away</b>"; break;
        case "down": newText = "Tom is running <b>towards you</b>"; break;
        default: break;
      }

      var currButton = document.getElementsByClassName("press-" + newDirection)[0].classList.add("active-button");

      bottomText.innerHTML = newText;

    }
  }

  document.addEventListener("keydown", e => {
    clearTimeout(timeout);
    e.preventDefault();
    var newDirection = getKeyAndSwitch(e);
    gameUpdate(newDirection);
  });

  var pausedGame = function(){
    videos["stopped"].load();
    //they let go of the keys, and it gets risky
    // timeout = setTimeout(function () {
    //   //starts it over
    //   ["up", "left", "right", "down"].forEach(element => {
    //     document.getElementsByClassName("press-" + element)[0].classList.remove("active-button");

    //   });
    //   videos["stopped"].play();
    //   videos[cruiseDirection].classList.add("hidden");
    //   videos[cruiseDirection].classList.remove("current_video");
    //   videos["stopped"].classList.add("current_video");
    //   videos["stopped"].classList.remove("hidden");
    //   bottomText.innerHTML = "Tom is <b><i>dancing<i/></b>";
    //   cruiseDirection = "stopped";
    // }, 1500);
  }

  function isMobileTablet() {
    var check = false;
    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }

  document.addEventListener("keyup", pausedGame);
  document.getElementById("mobile-gamepad").addEventListener("mouseup", pausedGame);
  document.getElementById("mobile-gamepad").addEventListener("touchend", pausedGame);
  document.getElementById("mobile-gamepad").addEventListener("touchcancel", pausedGame);


  if(isMobileTablet()){
    document.getElementById("mobile-1").addEventListener("touchstart", e => {
      clearTimeout(timeout);
      e.preventDefault();
      gameUpdate("up");
    });

    document.getElementById("mobile-2").addEventListener("touchstart", e => {
      clearTimeout(timeout);
      e.preventDefault();
      gameUpdate("left");
    });



    document.getElementById("mobile-3").addEventListener("touchstart", e => {
      clearTimeout(timeout);
      e.preventDefault();
      gameUpdate("right");
    });


    document.getElementById("mobile-4").addEventListener("touchstart", e => {
      clearTimeout(timeout);
      e.preventDefault();
      gameUpdate("down");
    });


  }
  else{
    document.getElementById("mobile-1").addEventListener("mousedown", e => {
      clearTimeout(timeout);
      e.preventDefault();
      gameUpdate("up");
      
    });

    document.getElementById("mobile-2").addEventListener("mousedown", e => {
      clearTimeout(timeout);
      e.preventDefault();
      gameUpdate("left");
    });

    document.getElementById("mobile-3").addEventListener("mousedown", e => {
      clearTimeout(timeout);
      e.preventDefault();
      gameUpdate("right");
    });


    document.getElementById("mobile-4").addEventListener("mousedown", e => {
      clearTimeout(timeout);
      e.preventDefault();
      gameUpdate("down");
    });

  }



  var gamepadUpdate = function (direction) {
    clearTimeout(gamePadTimeout);
    gameUpdate(direction);
    gamePadTimeout = setTimeout(() => {
      pausedGame();
    }, 500);

    
  }

  gameControl.on('connect', gamepad => {
    console.log('A new gamepad was connected!');
    // document.getElementById("game-start-button").click();
    console.log(gamepad);

    // if(!gameStarted){return}

    gamepad.on('right0', () => {gamepadUpdate("right");});
    gamepad.on('right1', () => {gamepadUpdate("right");});

    gamepad.on('left0', () => { gamepadUpdate("left"); });
    gamepad.on('left1', () => { gamepadUpdate("left"); });

    gamepad.on('up0', () => { gamepadUpdate("up"); });
    gamepad.on('up1', () => { gamepadUpdate("up"); });

    gamepad.on('down0', () => { gamepadUpdate("down"); });
    gamepad.on('down1', () => { gamepadUpdate("down"); });



    gamepad.on('button12', () => { gamepadUpdate("up"); });
    gamepad.on('button13', () => { gamepadUpdate("down"); });
    gamepad.on('button14', () => { gamepadUpdate("left"); });
    gamepad.on('button15', () => { gamepadUpdate("right"); });

    gamepad.on('button3', () => { gamepadUpdate("up"); });
    gamepad.on('button0', () => { gamepadUpdate("down"); });
    gamepad.on('button2', () => { gamepadUpdate("left"); });
    gamepad.on('button1', () => { gamepadUpdate("right"); });




  });

  // window.addEventListener("gamepadconnected", (e) => {
  //   console.log(
  //     "Gamepad connected at index %d: %s. %d buttons, %d axes.",
  //     e.gamepad.index,
  //     e.gamepad.id,
  //     e.gamepad.buttons.length,
  //     e.gamepad.axes.length,
  //   );

  //   // console.log(gp);

  //   setInterval(() => {
  //     var gp = e.gamepad
  //     for (let index = 0; index < gp.buttons.length; index++) {
        
  //       if (gp.buttons[index].value) {
  //         console.log("Button %d pressed", index);
  //       }

  //     }

  //     // isPressed = gp.buttons[0].pressed;
  //     // document.getElementById("button").innerHTML = isPressed;
  //   }, 100)
  // });


    // console.log(e.gamepad);
  });



