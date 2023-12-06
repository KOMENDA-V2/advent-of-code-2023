using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Day4
{
    internal class Program
    {
        public static double scoreValue(string winningNumbers, string ownedNumbers)
        {
            double score = 0;
            List<int> arrayWinningNumbers = new List<int>();
            List<int> arrayOwnedNumber = new List<int>();
            string temporaryHelper = null;
            Console.WriteLine(winningNumbers);
            Console.WriteLine(ownedNumbers);
            foreach(char character in winningNumbers)
            {
                if (Char.IsDigit(character) == true)
                {
                    temporaryHelper += character;
                }
                else if ((character == ' ' || character=='\r') && temporaryHelper != null)
                {
                    arrayWinningNumbers.Add(int.Parse(temporaryHelper));
                    temporaryHelper = null;
                }
            }
            foreach (char character in ownedNumbers)
            {
                if (Char.IsDigit(character) == true)
                {
                    temporaryHelper += character;
                }
                else if ((character == ' ' || character == '\r') && temporaryHelper != null)
                {
                    arrayOwnedNumber.Add(int.Parse(temporaryHelper));
                    temporaryHelper = null;
                }
            }
            int[] temporaryWinningNumbers = arrayWinningNumbers.ToArray();
            int[] temporaryOwnedNumbers = arrayOwnedNumber.ToArray();
            foreach(int number in temporaryWinningNumbers)
            {
                foreach(int ownedNumber in temporaryOwnedNumbers)
                {
                    if (ownedNumber == number) 
                    {
                        score++;
                    }
                }
            }

            return score;
        }
        static void Main(string[] args)
        {
            StringBuilder winningNumbers = new StringBuilder("");
            StringBuilder ownedNumbers = new StringBuilder("");
            bool numbersStarted = false;
            double score = 0;
            double scorePartII = 0;
            double multiply;
            bool winningNumbersStarted = false;
            StreamReader reader = new StreamReader("zdrapki.txt");
            string scratch = reader.ReadToEnd();
            Console.WriteLine(scratch);
            int charNumber = 0;
            int cardNumber = 0;
            double[] part2helper = new double[210];
            while (charNumber < scratch.Length)
            {
                if (winningNumbersStarted == true && scratch[charNumber] != '|')
                {
                    winningNumbers.Append(scratch[charNumber]);
                }
                else if (numbersStarted == true) 
                {
                    ownedNumbers.Append(scratch[charNumber]);
                }

                if (scratch[charNumber] == ':')
                {
                    winningNumbersStarted = true;
                }
                else if (scratch[charNumber] == '|')
                {
                    numbersStarted = true;
                    winningNumbersStarted = false;
                }
                else if (scratch[charNumber] == '\r')
                {
                    multiply = scoreValue(winningNumbers.ToString(), ownedNumbers.ToString());
                    if(multiply != 0) 
                    { 
                        score = score + 1 * Math.Pow(2, multiply - 1); 
                    }
                    Console.WriteLine(score);
                    numbersStarted = false;
                    winningNumbers.Clear();
                    ownedNumbers.Clear();
                    part2helper[cardNumber] = multiply;
                    cardNumber++;
;
                }

                charNumber++;
            }
            Console.WriteLine(part2helper[50]);
            double[] howManyCards = new double[210];
            for(int card = 0; card<210; card++)
            {
                howManyCards[card] = 1;
            }
            for (int reverse = 0; reverse<210; reverse++)
            {

                Console.WriteLine(part2helper[reverse]);
                if(210 - (reverse+part2helper[reverse]) >= 0)
                {
                    for (int i = 1; i < part2helper[reverse]; i++)
                    {
                        for(int j = 0; j < howManyCards[reverse]; j++)
                        {
                            if (i + reverse <= 210)
                            {
                                howManyCards[i + reverse]++;
                            }
                        }
                        
                    }
                }
            }
            for(int cardNumberFinal = 0; cardNumberFinal<210; cardNumberFinal++)
            {
                scorePartII += howManyCards[cardNumberFinal];
            }
            Console.WriteLine(scorePartII.ToString());

        }
    }
}
