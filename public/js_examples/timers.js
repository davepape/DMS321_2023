// Use setTimeout and createElement to modify a page over time
//
// (This could be done more efficiently with arrays and/or closures,
// but I wanted to keep it very simple.)

let $ = document.querySelector.bind(document);

let timer;

function update1()
    {
    let n = document.createElement('img');
    n.src = 'leonidas.jpg';
    $('#content').appendChild(n);
    }

function update2()
    {
    let n = document.createElement('p');
    n.textContent = 'THIS';
    $('#content').appendChild(n);
    }

function update3()
    {
    let n = document.createElement('p');
    n.textContent = 'IS';
    $('#content').appendChild(n);
    }

function update4()
    {
    let n = document.createElement('p');
    n.textContent = 'SPARTAAAA!';
    $('#content').appendChild(n);
    }

function start()
    {
    if (!timer)
        {
        timer = setTimeout(update1, 500);
        setTimeout(update2, 1000);
        setTimeout(update3, 2000);
        setTimeout(update4, 3500);
        }
    }

window.onload = function ()
    {
    $('#startbutton').addEventListener('click', start);
    }
