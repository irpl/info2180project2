window.onload()
{
    var puzzleArea = document.getElementById('puzlearea');
    var puzzlePiece = puzzleArea.getElementsByTagName('div');

    for ( var i = 0; i < puzzlePiece.length; i++ )
    {
        puzzlePiece[i].className = 'puzzlepiece';
        puzzlePiece[i].onmouseover = function()
        {
            if ( canMove(parseInt(this.innerHTML)) )
            {
                this.className = 'movablepiece:hover';
            }
        }
    }
}

function movePiece(where)
{
    
}

function canMove(position)
{
    
}