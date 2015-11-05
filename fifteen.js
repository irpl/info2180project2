var div;
var blink;
var timer;
var whiteSpaceY;
var whiteSpaceX;

window.onload = function ()
{
    var puzzlearea = document.getElementById('puzzlearea');
    
    div = puzzlearea.getElementsByTagName('div');

    for (var i=0; i<div.length; i++)
    {
        div[i].style.backgroundImage="url('background.jpg')";
        div[i].className = 'puzzlepiece';
        div[i].style.left = (i%4*100)+'px';
        div[i].style.top = (parseInt(i/4)*100) + 'px';
        div[i].style.backgroundPosition= '-' + div[i].style.left + ' ' + '-' + div[i].style.top;
        div[i].onmouseover = function()
        {
            if (checkCanMove(parseInt(this.innerHTML)))
            {
                this.style.border = "2px solid red";
                this.style.color = "#006600";
            }
        };
        div[i].onmouseout = function()
        {
            this.style.border = "2px solid black";
            this.style.color = "#000000";
        };

        div[i].onclick = function()
        {
            if (checkCanMove(parseInt(this.innerHTML)))
            {
                swap(this.innerHTML-1);
                if (checkFinish())
                {
                    youWin();
                }
                return;
            }
        };
    }

    whiteSpaceX = '300px';
    whiteSpaceY = '300px';

    var shufflebutton = document.getElementById('shufflebutton');
    shufflebutton.onclick = function()
    {

        for (var i=0; i<250; i++)
        {
            var rand = parseInt(Math.random()* 100) %4;
            if (rand == 0)
            {
                var tmp = calcUp(whiteSpaceX, whiteSpaceY);
                if ( tmp != -1)
                {
                    swap(tmp);
                }
            }
            if (rand == 1)
            {
                var tmp = calcDown(whiteSpaceX, whiteSpaceY);
                if ( tmp != -1) 
                {
                    swap(tmp);
                }
            }

            if (rand == 2)
            {
                var tmp = calcLeft(whiteSpaceX, whiteSpaceY);
                if ( tmp != -1)
                {
                    swap(tmp);
                }
            }

            if (rand == 3)
            {
                var tmp = calcRight(whiteSpaceX, whiteSpaceY);
                if (tmp != -1)
                {
                    swap(tmp);
                }
            }
        }
    };
};

function checkCanMove(pos)
{
    if (calcLeft(whiteSpaceX, whiteSpaceY) == (pos-1))
    {
        return true;
    }

    if (calcDown(whiteSpaceX, whiteSpaceY) == (pos-1))
    {
        return true;
    }

    if (calcUp(whiteSpaceX, whiteSpaceY) == (pos-1))
    {
        return true;
    }

    if (calcRight(whiteSpaceX, whiteSpaceY) == (pos-1))
    {
        return true;
    }
}
function Blink()
{
    blink --;
    if (blink == 0)
    {
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundColor = "#FFFFFF";
        alert('you win');
        return;
    }
    if (blink % 2)
    {
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundColor = "#00FF00";    
    }
    else
    {
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundColor = "#FF0000";
    }
    timer = setTimeout(Blink, 100);
}

function youWin()
{
    var body = document.getElementsByTagName('body');
    body[0].style.backgroundColor = "#FF0000";
    blink = 10;
    timer = setTimeout(Blink, 100);
}

function checkFinish()
{
    var flag = true;
    for (var i = 0; i < div.length; i++) {
        var y = parseInt(div[i].style.top);
        var x = parseInt(div[i].style.left);

        if (x != (i%4*100) || y != parseInt(i/4)*100)
        {
            flag = false;
            break;
        }
    }
    return flag;
}

function calcLeft(x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);

    if (xx > 0)
    {
        for (var i = 0; i < div.length; i++) 
        {
            if (parseInt(div[i].style.left) + 100 == xx && parseInt(div[i].style.top) == yy)
            {
                return i;
            } 
        }
    }
    else 
    {
        return -1;
    }
}

function calcRight (x, y) {
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (xx < 300)
    {
        for (var i =0; i<div.length; i++){
            if (parseInt(div[i].style.left) - 100 == xx && parseInt(div[i].style.top) == yy) 
            {
                return i;
            }
        }
    }
    else
    {
        return -1;
    } 
}

function calcUp (x, y) {
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy > 0)
    {
        for (var i=0; i<div.length; i++)
        {
            if (parseInt(div[i].style.top) + 100 == yy && parseInt(div[i].style.left) == xx) 
            {
                return i;
            }
        } 
    }
    else 
    {
        return -1;
    }
}

function calcDown (x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy < 300)
    {
        for (var i=0; i<div.length; i++)
        {
            if (parseInt(div[i].style.top) - 100 == yy && parseInt(div[i].style.left) == xx) 
            {
                return i;
            }
        }
    }
    else
    {
        return -1;
    } 
}

function swap (pos) {
    var temp = div[pos].style.top;
    div[pos].style.top = whiteSpaceY;
    whiteSpaceY = temp;

    temp = div[pos].style.left;
    div[pos].style.left = whiteSpaceX;
    whiteSpaceX = temp;
}