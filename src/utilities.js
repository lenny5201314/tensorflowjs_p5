// Define our labelmap
import { io } from "socket.io-client";

const LabelMap = {
    1:{name:"bird", color:"yellow"},
    2:{name:"bird2", color:"yellow"},
    3:{name:"cow", color:"orange"},
    4:{name:"cow2", color:"orange"},
    5:{name:"dog", color:"blue"},
    6:{name:"dog2", color:"blue"},
    7:{name:"elephant", color:"red"},
    8:{name:"elephant2", color:"red"},
    9:{name:"rabbit", color:"blue"},
    10:{name:"rabbit2", color:"blue"},
    11:{name:"reindeer", color:"pink"},
    12:{name:"reindeer2", color:"pink"},

}

const sw = io("http://localhost:3000");

const sendaidata = (data)=>{
    sw.emit("getMessage", data);
    
  }
  //const getaidata=() =>{
    //sw.on('sendtop5', message => {
    //console.log(message)
//})
//}

// Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx)=>{
    for(let i=0; i<=boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            // Extract variables


            const [y,x,height,width] = boxes[i]
            const text = classes[i]
            //console.log(classes[i])
            // Set styling
            ctx.strokeStyle = LabelMap[text]["color"]
            ctx.lineWidth = 10
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'         
            
            // DRAW!!
            ctx.beginPath()
            ctx.fillText(LabelMap[text]["name"] + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10)
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/2);
            ctx.stroke()

            var aidata={
              x_L:x,
              y_T:y,
              x_R:width,
              y_D:height,
              classes:classes[i],
              scores:Math.round(scores[i]*100)/100,
            }

            //console.log(JSON.stringify(aidata))
            sendaidata(aidata)
            //getaidata();
            
        }
    }
}