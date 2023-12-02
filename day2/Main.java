import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        int idValue = 0;
        BufferedReader br = null;
        try {
            br = new BufferedReader(new FileReader("puzzle.txt"));
            String line;
            while ((line = br.readLine()) != null) {
                String[] game = line.split(":");
                for (int k = 1; k < game.length; k++) {
                    boolean possible = true;
                    String line2 = game[k];
                    String[] parts = line2.split(";");
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
                                    if (red && number > 12) {
                                        possible = false;
                                    } else if (blue && number > 14) {
                                        possible = false;
                                    } else if (green && number > 13) {
                                        possible = false;
                                    }

                                    if (!possible) {
                                        break;
                                    }
                                }
                            }
                        }
                        if (!possible) {
                            break;
                        }
                    }
                    if (possible) {
                        String gameAndNumber = game[0];
                        String[] gameNumberArr = gameAndNumber.split("Game");
                        String gameNumber = gameNumberArr[1];
                        String resultGameNumber = gameNumber.replaceAll("\\s", "");
                        idValue += Integer.parseInt(resultGameNumber);
                        System.out.println(resultGameNumber);
                        System.out.println(idValue);
                    }
                }
            }
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

