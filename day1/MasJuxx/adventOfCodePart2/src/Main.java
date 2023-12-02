import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;


public class Main {
    public static void main(String[] args) throws FileNotFoundException {
        changeModule CM = new changeModule();
        File file = new File("src/inputTxt.txt");
        File equals = new File("src/equals.txt");

        Scanner scan = new Scanner(file);
        Scanner scanner = new Scanner(equals);

        ArrayList<String> arrayEqual = new ArrayList<String>();
        ArrayList<String> arrayNumbers = new ArrayList<String>();
        ArrayList<String> arrayMap = new ArrayList<String>();
        while (scan.hasNext()) {
            arrayNumbers.add(scan.next());
        }
        while (scanner.hasNext()) {
            arrayEqual.add(scanner.next());
        }

        for (int i = 0; i < arrayNumbers.size(); i++) {
            String content = arrayNumbers.get(i);
            for(int j=0; j<arrayEqual.size(); j++){
                String a = arrayEqual.get(j);
                String b = String.format("%s%s%s",a.charAt(0), (j+1), a.charAt(a.length()-1));
                content = content.replaceAll(a, b);
            }
            arrayMap.add(content);
        }
        CM.changeModule(arrayMap);
        System.out.println(arrayMap);
    }
}