let socket = io('ws://localhost:3000');
let target;
let x;
let y;
function setup() {
  createCanvas(windowWidth, windowHeight);
  
}


function draw() {
  line(123,32,54,50);
  
  socket.on("connect", () => {
    // either with send()
    socket.send("Hello!");
  
    // or with emit() and custom event names
    socket.emit("getMessage", "Hello!");
  
  // handle the event sent with socket.send()
  socket.on("senddata", data => {
    console.log(data);
    target = data
    //x1=target["x_L"]
    //console.log(target["x_L"]);
    x= map((float(target.x_R)+float(target.x_L))/2, 0, 1, 0, windowWidth);
    y= map((float(target.y_D)+float(target.y_T))/2, 0, 1, 0, windowHeight);
    console.log("x: "+int(x)+"y: " +int(y));
  });
})
ellipse(261, 195, 55, 55);
ellipse(int(x),int(y),50,50);
}
