
var SIZE = 5;
var squares = [];
var moves = 64;
var points = 0;
var column = 2;

//************************************************************
//
//************************************************************
function setup() 
{
    createCanvas(640, 512);
    rectMode(CENTER);
    setupSquares();
}

//************************************************************
//
//************************************************************
function draw() 
{
    background(0);
    drawMarker();    
    drawSquares();
    drawTexts();
}

//************************************************************
//
//************************************************************
function keyPressed() 
{
    var lockGame = isTransition();

    if(moves == 0 || lockGame)
    {
        return;
    }

    if (keyCode === LEFT_ARROW)
    {
        if(column > 0)
        {
            column--;
            moves--;
        }
    }
    else if (keyCode === RIGHT_ARROW)
    {
        if(column < 4)
        {
            column++;
            moves--;
        }
    }
    else if (keyCode === UP_ARROW)
    {
        moveUp();
        checkSquares();
        moves--;
    }
    else if (keyCode === DOWN_ARROW)
    {
        moveDown();
        checkSquares();
        moves--;
    }
}

//************************************************************
//
//************************************************************
function moveUp()
{
    var color = squares[column][0].color;
            
    for(var i = 0; i < (SIZE - 1); i++)
    {
        squares[column][i].color = squares[column][i+1].color;
    }
        
    squares[column][SIZE - 1].color = color;
}

//************************************************************
//
//************************************************************
function moveDown()
{
    var color = squares[column][SIZE - 1].color;
            
    for(var i = (SIZE - 1); i > 0; i--)
    {
        squares[column][i].color = squares[column][i-1].color;
    }
        
    squares[column][0].color = color; 
}

//************************************************************
//
//************************************************************
function checkSquares()
{
    for(var y = 0; y < SIZE; y++)
    {
        var color = squares[column][y].color;
        var result = new Array();
        squareCounter(column, y, color, result);

        if(result.length >= 0 && result.length < 3)
        {
            for(var i = 0; i < result.length; i++)
            {
                squares[result[i].x][result[i].y].checked = false;
            }
        }
        else
        {
            points += result.length * result.length;
        }
    }
}

//************************************************************
//
//************************************************************
function squareCounter(xx, yy, cc, ary)
{
    if(squares[xx][yy].checked)
    {
        return;
    }
    
    squares[xx][yy].checked = true;
    ary.push(createVector(xx, yy));
    
    if((xx + 1 ) < SIZE && squares[xx + 1][yy].color == cc)
    {
        squareCounter(xx + 1, yy, cc, ary);
    }

    if((yy + 1) < SIZE && squares[xx][yy + 1].color == cc)
    {
        squareCounter(xx, yy + 1, cc, ary);
    }
            
    if((xx - 1) >= 0 && squares[xx - 1][yy].color == cc)
    {
        squareCounter(xx - 1, yy, cc, ary);
    }
            
    if((yy - 1) >= 0 && squares[xx][yy - 1].color == cc)
    {
        squareCounter(xx, yy - 1, cc, ary);
    }
}


//************************************************************
//
//************************************************************
function isTransition()
{
    for(var x = 0; x < SIZE; x++)
    {
       for(var y = 0; y < SIZE; y++)
        {
            if(squares[x][y].checked)
            {
                return true;
            }
        }
    }

    return false;
}

//************************************************************
//
//************************************************************
function drawMarker()
{
    stroke(255);
    fill(0)

    var ww = 96;
    var hh = SIZE*96;
    var xx = (column * ww) + 64;
    var yy = 256;

    rect(xx, yy, ww, hh);
}

//************************************************************
//
//************************************************************
function drawSquares()
{
    noStroke();

    for(var y = 0; y < SIZE; y++)
    {
        for(var x = 0; x < SIZE; x++)
        {
            squares[x][y].draw();
        }
    }
}

//************************************************************
//
//************************************************************
function drawTexts()
{
    fill(255);
    textSize(16);
    text("Square Terror", SIZE*96+32, 64);
    text("Moves: " + moves, SIZE*96+32, 128);
    text("Points: " + points, SIZE*96+32, 160);

    text("Creator:", SIZE*96+32, 456);
    text("deadguy", SIZE*96+32, 480);
}

//************************************************************
//
//************************************************************
function setupSquares()
{
    for(var x = 0; x < SIZE; x++)    
    {
        squares[x] = [];

        for(var y = 0; y < SIZE; y++)
        {
            var xx = (x * 96) + 64;
            var yy = (y * 96) + 64;

            squares[x][y] = new Square(xx, yy, 64);
        }
    }
}

