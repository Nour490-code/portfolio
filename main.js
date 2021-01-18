//Type Writing Effect

const TypeEffect = function (textElement,sentences,wait = 3000) {
    this.textElement = textElement;
    this.sentences = sentences;
    this.text = '';
    this.sentenceIndex = 0;
    this.wait = parseInt(wait,10);
    this.type();
    this.isDeleting = false;
}

TypeEffect.prototype.type = function (){
    const current = this.sentenceIndex % this.sentences.length;
    const fullSentences = this.sentences[current];
    this.isDeleting ? this.text = fullSentences.substring(0, this.text.length - 1 )  : this.text = fullSentences.substring(0, this.text.length + 1 ) ;
    this.textElement.innerHTML = `<span class="txt">${this.text}</span>`;
    let typeSpeed = 200;
    if(this.isDeleting){
        typeSpeed /=2;
    }

    if(!this.isDeleting && this.text === fullSentences){
       typeSpeed = this.wait;
       this.isDeleting = true;
    }else if (this.isDeleting && this.text === ''){
        this.isDeleting = false;
        this.sentenceIndex++;
        typeSpeed = 500; 
    }

    setTimeout(() => this.type() , typeSpeed)
}

document.addEventListener('DOMContentLoaded',run);

function run (){
    const element = document.querySelector('.text');
    const sentences = JSON.parse(element.getAttribute('data-slogan'));
    const waitTime = element.getAttribute('data-wait');
    new TypeEffect(element,sentences,waitTime);
}
//Hamburger Menu
const menuBtn = document.querySelector('.menu-btn');
const menuNav = document.querySelector('.nav-menu');
const menuItem = document.querySelectorAll('.nav-menu li a');

//toggle
menuBtn.addEventListener('click', () =>{
    toggle();
});
menuItem.forEach(item => {
    item.addEventListener('click',() => {
        if(menuBtn.classList.contains('open')){
            toggle();
        }
    });
});

function toggle (){
    menuBtn.classList.toggle("open");
    menuNav.classList.toggle("open");
    document.documentElement.classList.toggle('ovreflow-y');
}

//Smooth Scroll
const scroll = new SmoothScroll('a[href*="#"]',{
    speed: 800
});

//Validation 
const inputs = document.querySelectorAll('.input');

const form = document.getElementById('form');

form.addEventListener('submit',function(e){
    const err = document.getElementById('err');
     inputs.forEach(input =>{
         if (input.value === '') {
             err.innerHTML = 'Please Enter The Information Before Submiting';
             err.style.color = '#BB2124';
         }else{
             err.remove();
         }
     })
});
