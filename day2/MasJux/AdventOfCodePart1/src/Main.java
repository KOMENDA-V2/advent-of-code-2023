import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws FileNotFoundException {
        int finalScore = 0;
        deleteGame checkGame = new deleteGame();
        String redCube = "red";
        String greenCube = "green";
        String blueCube = "blue";
        int num = 0;
        int maxCubes;
        String path = ("src/dataset.txt");
        List<List<String>> subList = new ArrayList<>();
        List<String> finalArray = new ArrayList<>();
        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(path))) {
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                List<String> lineList = new ArrayList<>();
                lineList.add(line);
                subList.add(lineList);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        subList = checkGame.checkGame(subList, redCube, num, 12);
        subList = checkGame.checkGame(subList, greenCube, num, 13);
        subList = checkGame.checkGame(subList, blueCube, num, 14);
        for (int i = 0; i < subList.size(); i++) {
            String split = subList.get(i).toString();
            String[] arraySplit = split.split("[:;,]");
            List<String> splittedList = new ArrayList<>();
            Collections.addAll(splittedList, arraySplit);
            String segment = splittedList.get(0);
            String finalElement2 = segment.split(" ")[1];
            int intParsing = Integer.parseInt(finalElement2);
            finalScore += intParsing;
        }
        System.out.println(finalScore);

    }
}
