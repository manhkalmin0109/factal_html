window.addEventListener('load',function () {
    const canvas =document.getElementById('canvas1');
    const ctx=canvas.getContext('2d');
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    // canvas settings
    ctx.fillStyle='black';
    ctx.strokeStyle='yellow'
    // ctx.lineWidth=5;
    ctx.lineCap='round'

    //effect settings

    let size=((canvas.width)/2)<((canvas.height)/2)?canvas.width/2*0.4
    :canvas.height/2*0.4;
    const maxlevel=4;
    const branches=2;
    let sides=5;
    let scale=0.5;
    let spread=0.1;
    let lineWidth=Math.random()*10*5;
let color='hsl('+Math.random()*360+',100%,70%)'
// controls
    const randomizeButton=document.getElementById('randomizeButton');
    const slider_spread=document.getElementById('spread');
    const lable_spread=document.querySelector('[for="spread"]')
    slider_spread.addEventListener('change',function (e){
        spread=e.target.value;
        drawFractal()
    })
function drawBranch(level){
       if(level>=maxlevel) return;
       ctx.beginPath();
       ctx.moveTo(0,0)
       ctx.lineTo(size,0)
       ctx.stroke()
       for (let i=0;i<branches;i++){
           ctx.save()//1
           ctx.translate((size-(size/branches)*i),0)
           ctx.rotate(spread)
           ctx.scale(scale,scale)

           ctx.save()//2
           ctx.rotate(spread)
           drawBranch(level+1)
           ctx.restore();//2

           ctx.save()//3
           ctx.rotate(-spread)
           drawBranch(level+1)
           ctx.restore()//3

           ctx.restore();//1
       }
   }
   function drawFractal(){
       ctx.clearRect(0,0,canvas.width,canvas.height)
       ctx.save()
       ctx.translate(canvas.width/2,canvas.height/2)
       ctx.strokeStyle=color
       ctx.lineWidth=lineWidth
       // ctx.scale(1,1)
       // ctx.rotate(0);
       for (let i=0;i<sides;i++){
           ctx.rotate((Math.PI*2)/sides)
           drawBranch(0)
       }
       ctx.restore()
   }
   drawFractal()

    function randomizeFactal(){
         sides=Math.floor(Math.random()*7+2);
         scale=Math.random()*0.2+0.4;
         spread=Math.random()*2.9+0.1;
         color='hsl('+Math.random()*360+',100%,70%)'
         lineWidth=Math.floor(Math.random()*10+5);

    }
    randomizeButton.addEventListener('click',function ()
    {
       randomizeFactal()
        drawFractal()
    });
})
