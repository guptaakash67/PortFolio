const meunOpen = document.getElementById('menu-open');
const headerLeft = document.querySelector('.header-left');
var hamburgerMenu = document.querySelector(".toggler-menu");

hamburgerMenu.addEventListener('click', toggleOpen);

function toggleOpen(){
    headerLeft.classList.toggle('menu-open');
}

var portfolio = document.getElementById('portfolio');
portfolio.addEventListener('click',lert);

function lert(){
    alert('what do you think what are you looking at?');
}

//Light speed

const canvas = document.querySelector('canvas');
canvas.style.backgroundColor="#10101a";
canvas.width=innerWidth;
canvas.height=innerHeight;

const ctx=canvas.getContext('2d');
ctx.translate(canvas.width/2,canvas.height/2);
let x,y,
    numberOfStars=300,
    speed=1000,
    initialSize=1,
    size=15;
window.addEventListener('resize',function(){
    canvas.width=innerWidth;
    canvas.height=innerHeight;
    ctx.translate(innerWidth/2,innerHeight/2);
});

let color=['#eb4d55','#4a69bb','#ed8240','#ffc55c','#b21f66','#8b2f97','#801336']
window.addEventListener("click",()=>{
    console.log("click");
        for(let i=0;i<numberOfStars;i++){
            stars[i].store_lx_ly();
        }
})


function star(x,y,an,color){
    this.x=x;
    this.y=y;
    this.an=an;
    this.dirx=this.x>0?1:-1;
    this.diry=this.y>0?1:-1;
    this.color=color;
    this.speed=speed;
    this.m=Math.sqrt(Math.pow(this.y,2)+Math.pow(this.x,2));
    this.size=Math.sqrt(this.m)/size;
    this.lm,this.lx,this.ly;
    this.show_trail=false
    this.draw=function (){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2,false);
        ctx.fillStyle=color;
        ctx.fill();

        if(this.show_trail){
            ctx.beginPath();
            ctx.moveTo(this.lx,this.ly);
            ctx.lineTo(this.x,this.y);
            ctx.stroke();
            ctx.strokeStyle=color;
        } 
    }
    this.store_lx_ly=()=>{
        this.lx=this.x;
        this.ly=this.y;
        this.lm=this.m;
        this.show_trail=true;
        this.speed=this.m*0.5;
    }
    this.update=()=>{
        this.m+=this.m/this.speed;
        //this.lm=this.m-(this.m/5);

        this.size=Math.sqrt(this.m)/size;

        this.x = this.dirx * this.m * Math.cos(this.an);
        this.y = this.diry * this.m * Math.sin(this.an);

        // this.lx = this.dirx * this.lm * Math.cos(this.an);
        // this.ly = this.diry * this.lm * Math.sin(this.an);

        if(this.x<=-innerWidth/2 || this.x>=innerWidth/2 || this.y<=-innerHeight/2 || this.y>=innerHeight/2 ){
            if(this.show_trail){
                this.speed=20
                this.lm+=this.lm/this.speed;
                this.lx = this.dirx * this.lm * Math.cos(this.an);
                this.ly = this.diry * this.lm * Math.sin(this.an);
                console.log(this.lm,this.m);
                if(this.lx<=-innerWidth/2 || this.lx>=innerWidth/2 || this.ly<=-innerHeight/2 || this.ly>=innerHeight/2 ){
                    
                    this.show_trail=false;
                    this.speed=speed;
                    this.x=((Math.random()-0.5)*innerWidth*0.7);
                    this.y=((Math.random()-0.5)*innerHeight*0.7);
                    this.an=(Math.random()*Math.PI)-Math.PI/2
                    this.m=Math.sqrt(Math.pow(this.y,2)+Math.pow(this.x,2));
                    this.size=Math.sqrt(this.m)/size;
                    this.dirx=this.x>0?1:-1;
                    this.diry=this.y>0?1:-1;
                }
            }
            else{
                this.x=((Math.random()-0.5)*10);
                this.y=((Math.random()-0.5)*10);
                this.an=(Math.random()*Math.PI)-Math.PI/2
                this.m=Math.sqrt(Math.pow(this.y,2)+Math.pow(this.x,2));
                this.size=Math.sqrt(this.m)/15;
                this.dirx=this.x>0?1:-1;
                this.diry=this.y>0?1:-1;
            }
            
            
            // console.log(this.x,this.y);
        }
        if(Math.abs(this.x)>20 || Math.abs(this.y>20))
            this.draw();
    }
}
let stars=[];
for(let i=0;i<numberOfStars;i++){
    x=((Math.random()-0.5)*innerWidth*0.7);
    y=((Math.random()-0.5)*innerHeight*0.7);
    an=(Math.random()*Math.PI)-Math.PI/2;
    //console.log(x,y);
    stars.push(new star(x,y,an,color[Math.floor(Math.random()*7)]));
}
function animate(){
    ctx.clearRect(-innerWidth/2,innerHeight/2,innerWidth,-innerHeight);
    for(let i=0;i<numberOfStars;i++){
        stars[i].update();
    }
    requestAnimationFrame(animate); 
       
}
animate();



// Preloader

window.addEventListener('load', function(){
    $('#preloader').delay(2050).fadeOut('slow');
    $('body').delay(3850).css({'overflow-x':'hidden'});
    
});



//Contact form

var form = document.getElementById("contact-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
            form.reset()
            status.style.display = 'block';
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
              status.innerHTML = 'Success';
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)


//Count
function visitorCount(){
    fetch('https://api.countapi.xyz/update/Prafful/999/?amount=1')
    .then(res=> res.json())
    .then(res=> {
        console.log(`count ${res.value}`);
    })
}
visitorCount();




// var desc = document.getElementsByClassName('desc');
// var mq = window.matchMedia("(max-width: 450px)");
// if (mq = true){
//     desc.innerHTML = '&lt;Frontend Web Developer/&gt;'
// }

