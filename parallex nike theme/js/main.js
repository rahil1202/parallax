
let sections = document.querySelectorAll("section");
let sectionHeight = sections[0].offsetHeight;
let headerHeight = document.querySelector("header").offsetHeight;
let dots = document.querySelectorAll('.dot');

let scroll = document.querySelector('.scroll');

///////  FOR PARALLAX AND NAV-DOTS


let num = (window.scrollY - headerHeight) /sectionHeight;
num = Math.round(num);
num = Math.abs(num);
dots[num].style.background = "green";

document.querySelector('.nav-dots').addEventListener('click',function(event){
    if(event.target.classList.value == "dot"){
        clearDots();
        event.target.style.background = "green";
        let z = extractNumber(event.target.id);
        if(z == 0 ){
            window.scrollTo(0,0);
        } else {
            window.scrollTo(0,sections[z].offsetTop);
        }
    } 
    if(event.target.classList.value == "dot-container"){
        clearDots();
        event.target.children[0].style.background = "green";
        let z = extractNumber(event.target.children[0].id);
        if(z == 0 ){
            window.scrollTo(0,0);
        } else {
            window.scrollTo(0,sections[z].offsetTop);
        }
    }
});

function clearDots(){
    dots.forEach(function(dot){
        dot.style.background = "rgb(175, 175, 214)";
    });
}
function extractNumber(x){
    let number;
    if(x[4] != undefined){
        number = x[3]*10 + x[4]*1;
    } else{
        number = x[3]*1;
    }
    return number-1;
}


document.addEventListener("scroll", function(){
    scroll.innerHTML = window.scrollY;
    let num = (window.scrollY - headerHeight) /sectionHeight;
    num = Math.round(num);
    num = Math.abs(num);

    if(num != 11){
        clearDots();
        dots[num].style.background = "green";
    }

    if(num >= 0){
        parallax(num);
        if(num-1 >= 0){
            parallax(num-1);
        }
    }
})

let parallax = (index)=>{
    if(index == 11){
        return;
    }
    let scrollValue;
    if(index == 0){
        scrollValue = window.scrollY - sections[index].offsetTop + headerHeight;
    } else {
        scrollValue = window.scrollY - sections[index].offsetTop + window.innerHeight;
    }


    let bg_parallaxValue = scrollValue/7;
    let fg_parallaxValue = scrollValue/2.6;
    
    let child = sections[index].children;
    let grandChild = child[0].children;
    grandChild[0].style.top = "-"+bg_parallaxValue+"px";

    if(index == 1 || index == 5 || index == 9){
        grandChild[1].style.bottom = fg_parallaxValue+"px";

    }
}

//*********** parallax ends */

/////////////// FOR VIDEO PLAYER

document.querySelector('#play').addEventListener('click',function(){
    document.querySelector('.overlay').style.display = "block";
    document.querySelector('video').play();
})

document.querySelector('.close-icon').addEventListener('click',function(){
    document.querySelector('.overlay').style.display = "none";
    document.querySelector('video').pause();
    document.querySelector('video').currentTime = 0;
})

// ***************** video player ends 

/////////  FOR SLIDERS

let slides = document.querySelectorAll('.slides');
let more = document.querySelector('.more');
count = 0;
more.addEventListener('click', function(){
    if(count == slides.length-1){
        slides[count].style.display = "none";
        slides[count].style.top = "350px";
        slides.forEach(function(slide){
            slide.style.display="block";
        })
        slides[0].style.top = "0";
        count = 0;
    } else {
        if(count == slides.length-2){
            slides[0].style.top = "-350px";
            slides[0].style.display = "block"
        }
        slides[count].style.display = "none";
        slides[count].style.top = "350px";
        slides[count+1].style.display = "block";
        slides[count+1].style.top = "0";
        count++;
    }
})

let slides2 = document.querySelectorAll('.slides2');
let more2 = document.querySelector('.more2');
count2 = 0;
more2.addEventListener('click', function(){
    if(count2 == slides2.length-1){
        slides2[count2].style.display = "none";
        slides2[count2].style.top = "350px";
        slides2.forEach(function(slide){
            slide.style.display="block";
        })
        slides2[0].style.top = "0";
        count2 = 0;
    } else {
        if(count2 == slides2.length-2){
            slides2[0].style.top = "-350px";
            slides2[0].style.display = "block"
        }
        slides2[count2].style.display = "none";
        slides2[count2].style.top = "350px";
        slides2[count2+1].style.display = "block";
        slides2[count2+1].style.top = "0";
        count2++;
    }
})

//***********slider ends */


//////////////// FOR LINES

window.addEventListener('resize',configureLines)


function configureLines(){
    let lines = document.querySelectorAll('.line');
    let temp = 0;
    
    let line = (x1,y1,x2,y2)=>{
        let left,top,height,arc,degree;
        left = x1 + ((x2-x1)/2);
        top = y1 + ((y2-y1)/2);
        height = Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
        // console.log(height);
        arc = Math.asin((x2-x1)/height);
        // console.log(arc);
        degree = arc * 180 / Math.PI;
        degree = - degree;
        // console.log(degree);
        
    
        lines[temp].style.height = height+"px";
        lines[temp].style.left = left+"px";
        lines[temp].style.top = top+"px";
        lines[temp].style.transform = "translate(-50%,-50%) rotateZ("+ degree +"deg)";
        temp++;
    
    }
    
    
    let a,b,c,d;
    
    // line 1
    a = document.querySelector('header').children[0].children[0].offsetLeft + 
        document.querySelector('header').children[0].children[0].offsetWidth/2;
    b = document.querySelector('header').children[0].children[0].offsetTop + 
        document.querySelector('header').children[0].children[0].offsetHeight + 20;
    c = document.querySelectorAll('section')[0].children[1].children[1].offsetLeft + 
        document.querySelectorAll('section')[0].children[1].children[1].offsetWidth/2;
    d = document.querySelectorAll('section')[0].children[1].children[1].offsetTop +
        document.querySelectorAll('section')[0].children[1].offsetTop -
        document.querySelectorAll('section')[0].children[1].offsetHeight/2 +
        document.querySelectorAll('section')[0].offsetTop;
    
    line(a,b,c,d);
    
    // line 2
    a = document.querySelectorAll('section')[0].children[1].children[1].offsetLeft + 
        document.querySelectorAll('section')[0].children[1].children[1].offsetWidth/2;
    b = document.querySelectorAll('section')[0].children[1].children[1].offsetTop +
        document.querySelectorAll('section')[0].children[1].children[1].offsetHeight +
        document.querySelectorAll('section')[0].children[1].offsetTop -
        document.querySelectorAll('section')[0].children[1].offsetHeight/2 +
        document.querySelectorAll('section')[0].offsetTop;
    c = document.querySelectorAll('section')[1].children[1].offsetLeft + 100;
    d = document.querySelectorAll('section')[1].children[1].offsetTop +
        document.querySelectorAll('section')[1].offsetTop;
    
    line(a,b,c,d);
    
    // line 3
    a = document.querySelectorAll('section')[1].children[1].offsetLeft + 70;
    b = document.querySelectorAll('section')[1].children[1].offsetTop +
        document.querySelectorAll('section')[1].children[1].offsetHeight +
        document.querySelectorAll('section')[1].offsetTop;
    c = document.querySelectorAll('section')[2].children[1].offsetLeft + 120;
    d = document.querySelectorAll('section')[2].children[1].offsetTop +
        document.querySelectorAll('section')[2].offsetTop;
    
    line(a,b,c,d);
    
    // line 4
    a = document.querySelectorAll('section')[2].children[1].offsetLeft +
        document.querySelectorAll('section')[2].children[1].offsetWidth*1/3;
    b = document.querySelectorAll('section')[2].children[1].offsetTop +
        document.querySelectorAll('section')[2].children[1].offsetHeight +
        document.querySelectorAll('section')[2].offsetTop;
    c = document.querySelectorAll('section')[3].children[0].offsetLeft +
        document.querySelectorAll('section')[3].children[0].offsetWidth*3/7;
    d = document.querySelectorAll('section')[3].children[0].offsetTop +
        document.querySelectorAll('section')[3].offsetTop -20;
    
    line(a,b,c,d);
    
    // line 5
    a = document.querySelectorAll('section')[3].children[1].offsetLeft +
        document.querySelectorAll('section')[3].children[1].offsetWidth*4/11;
    b = document.querySelectorAll('section')[3].children[1].offsetTop +
        document.querySelectorAll('section')[3].children[1].offsetHeight +
        document.querySelectorAll('section')[3].offsetTop;
    c = document.querySelectorAll('section')[4].children[1].offsetLeft +
        document.querySelectorAll('section')[4].children[1].offsetWidth*1/7;
    d = document.querySelectorAll('section')[4].children[1].offsetTop +
        document.querySelectorAll('section')[4].offsetTop;
    
    line(a,b,c,d);
    
    // line 6
    a = document.querySelectorAll('section')[4].children[1].offsetLeft + 70;
    b = document.querySelectorAll('section')[4].children[1].offsetTop +
        document.querySelectorAll('section')[4].children[1].offsetHeight +
        document.querySelectorAll('section')[4].offsetTop;
    c = document.querySelectorAll('section')[5].children[1].offsetLeft + 150;
    d = document.querySelectorAll('section')[5].children[1].offsetTop +
        document.querySelectorAll('section')[5].offsetTop;
    
    line(a,b,c,d);
    
    // line 7
    a = document.querySelectorAll('section')[5].children[1].offsetLeft + 110;
    b = document.querySelectorAll('section')[5].children[1].offsetTop +
        document.querySelectorAll('section')[5].children[1].offsetHeight +
        document.querySelectorAll('section')[5].offsetTop;
    c = document.querySelectorAll('section')[6].children[1].offsetLeft + 50;
    d = document.querySelectorAll('section')[6].children[1].offsetTop +
        document.querySelectorAll('section')[6].offsetTop;
    
    line(a,b,c,d);
    
    // line 8
    a = document.querySelectorAll('section')[6].children[1].offsetLeft + 70;
    b = document.querySelectorAll('section')[6].children[1].offsetTop +
        document.querySelectorAll('section')[6].children[1].offsetHeight +
        document.querySelectorAll('section')[6].offsetTop;
    c = document.querySelectorAll('section')[7].children[0].offsetLeft + 400;
    d = document.querySelectorAll('section')[7].children[0].offsetTop +
        document.querySelectorAll('section')[7].offsetTop - 20;
    
    line(a,b,c,d);
    
    // line 9
    a = document.querySelectorAll('section')[7].children[1].offsetLeft +
        document.querySelectorAll('section')[7].children[1].offsetWidth*4/11;
    b = document.querySelectorAll('section')[7].children[1].offsetTop +
        document.querySelectorAll('section')[7].children[1].offsetHeight +
        document.querySelectorAll('section')[7].offsetTop + 30;
    c = document.querySelectorAll('section')[8].children[1].offsetLeft +
        document.querySelectorAll('section')[8].children[1].offsetWidth*1/10;
    d = document.querySelectorAll('section')[8].children[1].offsetTop +
        document.querySelectorAll('section')[8].offsetTop;
    
    line(a,b,c,d);
    
    // line 10
    a = document.querySelectorAll('section')[8].children[1].offsetLeft + 70;
    b = document.querySelectorAll('section')[8].children[1].offsetTop +
        document.querySelectorAll('section')[8].children[1].offsetHeight +
        document.querySelectorAll('section')[8].offsetTop;
    c = document.querySelectorAll('section')[9].children[1].offsetLeft +
        document.querySelectorAll('section')[9].children[1].offsetWidth*1/10;
    d = document.querySelectorAll('section')[9].children[1].offsetTop +
        document.querySelectorAll('section')[9].offsetTop;
    
    line(a,b,c,d);
    
    // line 11
    a = document.querySelectorAll('section')[9].children[1].offsetLeft + 70;
    b = document.querySelectorAll('section')[9].children[1].offsetTop +
        document.querySelectorAll('section')[9].children[1].offsetHeight +
        document.querySelectorAll('section')[9].offsetTop;
    c = document.querySelectorAll('section')[10].children[1].offsetLeft + 250;
    d = document.querySelectorAll('section')[10].children[1].offsetTop +
        document.querySelectorAll('section')[10].offsetTop;
    
    line(a,b,c,d);
    
    // line 12
    a = document.querySelectorAll('section')[10].children[1].offsetLeft +
        document.querySelectorAll('section')[10].children[1].offsetWidth*1/7;
    b = document.querySelectorAll('section')[10].children[1].offsetTop +
        document.querySelectorAll('section')[10].children[1].offsetHeight +
        document.querySelectorAll('section')[10].offsetTop;
    c = document.querySelectorAll('section')[11].children[0].offsetLeft +
        document.querySelectorAll('section')[11].children[0].offsetWidth*2/5 + 30;
    d = document.querySelectorAll('section')[11].children[0].offsetTop +
        document.querySelectorAll('section')[11].offsetTop - 20;
    
    line(a,b,c,d);

}

configureLines();
