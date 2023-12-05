import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class deleteGame {
    private List<List<String>> removeIndexes(List<List<String>> array, List<Integer> indexesToRemove) {
        Collections.sort(indexesToRemove);

        for (int i = indexesToRemove.size() - 1; i >= 0; i--) {
            int index = indexesToRemove.get(i);
            if (index >= 0 && index < array.size()) {
                List<List<String>> newList = new ArrayList<>();
                newList.addAll(array.subList(0, index));
                newList.addAll(array.subList(index + 1, array.size()));
                array = newList;
            }
        }
        return array;
    }
    public List<List<String>> checkGame(List<List<String>> subList, String colour, int num, int maxCubes) {
        List<Integer> wrongGames = new ArrayList<>();

        for (int i = 0; i < subList.size(); i++) { //przeleć po kazdej z gier
            String split = subList.get(i).toString();
            String[] arraySplit = split.split("[:;,]");
            List<String> splittedList = new ArrayList<>();
            Collections.addAll(splittedList, arraySplit);
            for (int j = 0; j < splittedList.size(); j++) { //podziel kazda z gier na segmenty
                String segment = splittedList.get(j);
                if (segment.contains(colour)) {
                    String[] parts = segment.split("\\s" + colour);
                        String number = parts[0].trim();
                        try {
                            num = Integer.parseInt(number);
                        } catch (NumberFormatException e) {
                            System.out.println("fail");
                        }
                        if (num > maxCubes && !wrongGames.contains(i)) {
                            wrongGames.add(i);
                        }
                    }
                }
        }
        return removeIndexes(subList, wrongGames);
    }
}
