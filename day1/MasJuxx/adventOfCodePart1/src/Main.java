import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws FileNotFoundException {
        File file = new File("src/inputTxt.txt");
        Scanner scan  = new Scanner(file);
        ArrayList<String> arrayList = new ArrayList<String>();
        ArrayList<String> integerArrayList = new ArrayList<String>();
        ArrayList<String> finalArray = new ArrayList<String>();
        int finalScore=0;
        while(scan.hasNext()){
            arrayList.add(scan.next());
        }
        scan.close();
        for(int i=0; i< arrayList.size(); i++){
            String a = arrayList.get(i);
            char[] letters = a.toCharArray();
            StringBuilder stringBuilder = new StringBuilder();
            for(char c:letters){
                if(Character.isDigit(c)){
                    stringBuilder.append(c);
                }
            }
            integerArrayList.add(String.valueOf(stringBuilder));
        }
        for(int i=0; i<integerArrayList.size();i++){
            String stringNumber = integerArrayList.get(i);
            int stringSize = stringNumber.length();
            if(stringSize<2){
                String duplicatedChar = stringNumber.repeat(2);
                finalArray.add(duplicatedChar);
            }else{
                char firstChar = stringNumber.charAt(0);
                char lastChar = stringNumber.charAt(stringSize - 1);
                String finalChars = Character.toString(firstChar)+Character.toString(lastChar);
                finalArray.add(finalChars);
            }
        }
        for(int i=0; i<finalArray.size();i++){
            int currentNumber = Integer.parseInt(finalArray.get(i));;
            finalScore += currentNumber;
        }
        System.out.println(integerArrayList);
    }
}