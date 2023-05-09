function slide1() {
    document.getElementById("img").src = "/public/images/first_slider_img.png";
}
function slide2() {
    document.getElementById("img").src = "/public/images/second_slider_img.png";
}
function slide3() {
    document.getElementById("img").src = "/public/images/third_slider_img.png";
}
setInterval(slide1, 2000);
setInterval(slide2, 4000);
setInterval(slide3, 6000); 
console.log("it is connected");