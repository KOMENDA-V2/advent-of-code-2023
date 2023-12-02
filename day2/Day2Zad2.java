import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Day2Zad2 {
    public static void main(String[] args) {
        int powersValue =0;
        BufferedReader br = null;

        try {
            br = new BufferedReader(new FileReader("puzzle.txt"));

            String line;
            while ((line = br.readLine()) != null) {
                String[] game = line.split(":");

                for (int k = 1; k < game.length; k++) { //zmiana gry
                    boolean possible = true;
                    int valueRed = 0;
                    int valueBlue = 0;
                    int valueGreen = 0;
                    String line2 = game[k];
                    String[] parts = line2.split(";");
                    int power = 0;
                    for (String parts2 : parts) {
                        String[] colorNumber = parts2.split(",");
                        for (String colorNumber1 : colorNumber) {
                            boolean red = colorNumber1.contains("red");
                            boolean blue = colorNumber1.contains("blue");
                            boolean green = colorNumber1.contains("green");

                            if (red || blue || green) {
                                String[] colorAndNumber = colorNumber1.split("(red|blue|green)");
                                String numberStr = colorAndNumber[0].replaceAll("\\s", "");
                                if (!numberStr.isEmpty()) {
                                    int number = Integer.parseInt(numberStr);
                                    if (red && number > valueRed) {
                                        valueRed = number;
                                    } else if (blue && number > valueBlue) {
                                        valueBlue = number;
                                    } else if (green && number > valueGreen) {
                                        valueGreen = number;
                                    }
                                }
                            }
                        }
                        power = valueRed * valueGreen * valueBlue;
                    }
                    powersValue = powersValue+power;

                }
            }System.out.println(powersValue);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }
}

