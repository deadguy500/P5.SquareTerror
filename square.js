
function Square(xx, yy, ss)
{
    var colors = ["yellow", "red", "blue", "green", "white"];

    this.x = xx;
    this.y = yy;
    this.size = ss;
    this.color = random(colors);
    this.checked = false;
    this.transSize = 0;
    this.shift = true;

    this.draw = function()
    {
        if(this.checked)
        {
            if(this.shift && this.transSize < this.size)
            {
                this.transSize++;
            }
            else if (this.shift)
            {
                this.shift = false
                this.color = random(colors);
            }
            else if(!this.shift && this.transSize > 0)
            {
                this.transSize--;
            }
            else
            {
                this.checked = false;
                this.shift = true;
            }
        }

        fill(this.color);
        rect(this.x, this.y, this.size - this.transSize, this.size - this.transSize);
    }
}
