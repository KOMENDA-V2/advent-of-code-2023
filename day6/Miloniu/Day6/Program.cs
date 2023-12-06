Tuple<double, double>[] records =
{
    new Tuple<double, double>(47707566, 282107911471062),
};
int attemptsBreakingTheRecord = 0;
int multipliedAttempts = 1;
foreach(Tuple<double, double> value in records)
{
    for (int attempt = 0; attempt < value.Item1; attempt++)
    {
        if (attempt * (value.Item1 - attempt) > value.Item2)
        {
            attemptsBreakingTheRecord++;
        }
    }
    Console.WriteLine(attemptsBreakingTheRecord.ToString());
    multipliedAttempts = multipliedAttempts * attemptsBreakingTheRecord; 
    Console.WriteLine(multipliedAttempts.ToString());
    attemptsBreakingTheRecord = 0;
}