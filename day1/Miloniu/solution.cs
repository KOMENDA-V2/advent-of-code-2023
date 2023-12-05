using System.ComponentModel.Design;
using System.IO;
using System.Runtime.CompilerServices;
using System.Windows.Markup;

string input;
int localization=0;
double lastValue = 0;
int? firstNumber = null;
int? lastNumber = null;
int value;
StreamReader calbirationValue = new StreamReader("day1input.txt");
input = calbirationValue.ReadToEnd();
Console.WriteLine(input);  

foreach(char character in input)
{
    if ((Char.IsDigit(character) == true) && firstNumber == null) 
    {
        firstNumber = int.Parse(character.ToString());
        lastNumber = int.Parse(character.ToString());
    }
    else if(Char.IsDigit(character) == true)
    {
        lastNumber = int.Parse(character.ToString());
    }
    if(character == '\r' ||  localization == input.Length - 1)
    {
        value = int.Parse(firstNumber.ToString()+lastNumber.ToString());
        Console.WriteLine(value);
        lastValue =lastValue + value;
        firstNumber = null;
    }
    localization++;
}
Console.WriteLine(lastValue);