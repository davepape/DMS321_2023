// Create a slideshow using setInterval
// When the "start" button is hit, the function "update" runs every 3 seconds,
// changing the displayed image.  The "stop" button removes the interval,
// to stop the slides advancing.

let $ = document.querySelector.bind(document);

let interval;
let pics = [ "sasha.jpg", "American_bison.jpg", "cat.jpg" ]
let picnum = 0;

function update()
    {
    picnum = (picnum+1) % pics.length;
    let img = $('#slideImage');
    img.src = pics[picnum];
    }

function start()
    {
    if (!interval)
        interval = setInterval(update, 3000);
    }

function stop()
    {
    clearInterval(interval);
    interval = null;
    }

window.onload = function ()
    {
    $('#startbutton').addEventListener('click', start);
    $('#stopbutton').addEventListener('click', stop);
    let img = $("#slideImage");
    img.src = pics[0];
    }
