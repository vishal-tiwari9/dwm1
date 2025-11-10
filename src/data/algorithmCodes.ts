const codes = {
  'fp-growth': {
    title: 'FP-Growth (8th Exp)',
    code: `import java.io.*;
class FP_Tree {
public static void main(String[] args) throws IOException {
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
System.out.print("Enter number of transactions: ");
int no_t = Integer.parseInt(br.readLine());
System.out.print("Enter number of items in the Itemset: ");
int no_i = Integer.parseInt(br.readLine());
System.out.print("Enter the minimum support: ");
double min_sup = Double.parseDouble(br.readLine());
System.out.println("Enter the item set (use lowercase letters). Enter '0' to end each transaction.");
String[][][] d = new String[no_t][2][no_i];
for (int i = 0; i < no_t; i++) {
System.out.println("Transaction TID " + (i + 1));
for (int k = 0; k < no_i; k++) {
String s = br.readLine();
d[i][1][k] = s;
if (s.equals("0"))
break;
}
}
char[] item_set = new char[no_i];
for (int i = 0; i < no_i; i++) {
item_set[i] = (char) (i + 97); // a, b, c, ...
}
System.out.print("Item Set: ");
for (char c : item_set) {
System.out.print(c + " ");
}
int[] sup = new int[no_i];
for (int j = 0; j < no_i; j++) {
int s = 0;
for (int i = 0; i < no_t; i++) {
for (int k = 0; k < no_i; k++) {
if (d[i][1][k].equals("0"))
break;
if (d[i][1][k].charAt(0) == item_set[j])
s++;
}
}
sup[j] = s;
}
System.out.print("\\nSupports: ");
for (int value : sup) {
System.out.print(value + " ");
}
char[] item_set_new = new char[no_i];
int count = 0;
for (int k = 0; k < no_i; k++) {
if (sup[k] >= min_sup) {
item_set_new[k] = item_set[k];
count++;
}
}
// Sorting based on support descending
for (int i = 0; i < no_i - 1; i++) {
for (int j = 0; j < no_i - i - 1; j++) {
if (sup[j] < sup[j + 1]) {
int tempSup = sup[j];
sup[j] = sup[j + 1];
sup[j + 1] = tempSup;
char tempItem = item_set_new[j];
item_set_new[j] = item_set_new[j + 1];
item_set_new[j + 1] = tempItem;
}
}
}
char[] is_final = new char[count];
int[] sup_final = new int[count];
int cnt = 0;
for (int i = 0; i < no_i; i++) {
if (Character.isLetter(item_set_new[i])) {
is_final[cnt] = item_set_new[i];
sup_final[cnt] = sup[i];
cnt++;
}
}
System.out.println("\\n\\nFrequent Items (after applying min support):");
for (int i = 0; i < is_final.length; i++) {
System.out.println(is_final[i] + "\\t" + sup_final[i]);
}
// Simulated FP-Tree Output
System.out.println("\\nFP-Tree (one path per transaction):");
for (int i = 0; i < no_t; i++) {
System.out.println("Transaction No: " + (i + 1));
System.out.print("Root");
for (int m = 0; m < count; m++) {
for (int k = 0; k < no_i; k++) {
if (d[i][1][k].equals("0"))
break;
if ((d[i][1][k].charAt(0) == is_final[m]) && (sup_final[m] > 0)) {
System.out.print(" -> " + is_final[m]);
sup_final[m]--;
break;
}
}
}
System.out.println("\\n");
}
}
}`
  },
  'apriori': {
    title: 'Apriori (9th Exp)',
    code: `class AprioriCalculation:
    def __init__(self):
        self.candidates = []
        self.numItems = 0
        self.numTransactions = 0
        self.minSup = 0.0
        self.oneVal = []
        self.itemSep = " "
        self.transactions = []

    def aprioriProcess(self):
        self.getConfig()
        print("Apriori algorithm has started.\n")

        import time
        start = time.time()
        itemsetNumber = 0

        while True:
            itemsetNumber += 1
            self.generateCandidates(itemsetNumber)

            if not self.candidates:
                break

            print(f"\nFrequent {itemsetNumber}-itemsets")
            print(self.candidates)

            self.calculateFrequentItemsets(itemsetNumber)

            if len(self.candidates) <= 1:
                break

        end = time.time()
        print(f"\nExecution time is {(end - start):.3f} seconds")

    def getInput(self, prompt):
        return input(prompt).strip()

    def getConfig(self):
        print("Enter number of items per transaction:")
        self.numItems = int(self.getInput("> "))

        print("Enter number of transactions:")
        self.numTransactions = int(self.getInput("> "))

        print("Enter minimum support as a decimal (e.g., 0.2 for 20%):")
        self.minSup = float(self.getInput("> "))

        self.oneVal = ["1"] * self.numItems

        change_val = self.getInput("Enter 'y' to change the value each row recognizes as a '1', else press enter: ")

        if change_val.lower() == 'y':
            for i in range(self.numItems):
                val = self.getInput(f"Enter value for column {i+1}: ")
                if val:
                    self.oneVal[i] = val

        print(f"\nEnter {self.numTransactions} transactions. Each transaction is {self.numItems} items separated by space (' '):")

        for i in range(self.numTransactions):
            while True:
                line = self.getInput(f"Transaction {i+1}: ")
                parts = line.strip().split(self.itemSep)
                if len(parts) == self.numItems:
                    self.transactions.append(parts)
                    break
                else:
                    print(f"Invalid input. Please enter exactly {self.numItems} items.")

    def generateCandidates(self, n):
        tempCandidates = []

        if n == 1:
            for i in range(1, self.numItems + 1):
                tempCandidates.append(str(i))

        elif n == 2:
            for i in range(len(self.candidates)):
                for j in range(i + 1, len(self.candidates)):
                    c1 = self.candidates[i].split()
                    c2 = self.candidates[j].split()
                    candidate = f"{c1[0]} {c2[0]}"
                    tempCandidates.append(candidate)

        else:
            for i in range(len(self.candidates)):
                for j in range(i + 1, len(self.candidates)):
                    c1 = self.candidates[i].split()
                    c2 = self.candidates[j].split()
                    if c1[:-1] == c2[:-1]:
                        candidate = ' '.join(c1 + [c2[-1]])
                        tempCandidates.append(candidate)

        self.candidates = tempCandidates

    def calculateFrequentItemsets(self, n):
        frequentCandidates = []
        counts = [0] * len(self.candidates)

        for transaction_vals in self.transactions:
            transaction = [transaction_vals[i] == self.oneVal[i] for i in range(self.numItems)]

            for idx, candidate in enumerate(self.candidates):
                items = list(map(int, candidate.split()))
                match = True

                for item in items:
                    if not transaction[item - 1]:
                        match = False
                        break

                if match:
                    counts[idx] += 1

        for idx, candidate in enumerate(self.candidates):
            support = counts[idx] / self.numTransactions
            if support >= self.minSup:
                frequentCandidates.append(candidate)
            print(f"{candidate} support: {support:.4f}")

        self.candidates = frequentCandidates


if __name__ == "__main__":
    ap = AprioriCalculation()
    ap.aprioriProcess()
       

       


      



    `
  },
  'k-means': {
    title: 'K-Means (7th Exp)',
    code: `import java.util.*;
public class KMeans1D {
static int[] d;
static int[][] k;
static int[][] tempk;
static double[] m;
static double[] diff;
static int n, p;

static int cal_diff(int a) {
for (int i = 0; i < p; ++i)
diff[i] = Math.abs(a - m[i]);
int val = 0;
double minDiff = diff[0];
for (int i = 1; i < p; ++i) {
if (diff[i] < minDiff) {
minDiff = diff[i];
val = i;
}
}
return val;
}

static void cal_mean() {
for (int i = 0; i < p; ++i)
m[i] = 0;
for (int i = 0; i < p; ++i) {
int count = 0;
for (int j = 0; j < n; ++j) {
if (k[i][j] != -1) {
m[i] += k[i][j];
count++;
}
}
if (count != 0)
m[i] /= count;
}
}

static boolean checkConvergence() {
for (int i = 0; i < p; ++i)
for (int j = 0; j < n; ++j)
if (tempk[i][j] != k[i][j])
return false;
return true;
}

public static void main(String[] args) {
Scanner scr = new Scanner(System.in);
System.out.print("Enter the number of data points: ");
n = scr.nextInt();
d = new int[n];
System.out.println("Enter " + n + " data points:");
for (int i = 0; i < n; ++i)
d[i] = scr.nextInt();
System.out.print("Enter number of clusters (k): ");
p = scr.nextInt();
k = new int[p][n];
tempk = new int[p][n];
m = new double[p];
diff = new double[p];
for (int i = 0; i < p; ++i)
m[i] = d[i];
boolean converged;
do {
for (int i = 0; i < p; ++i)
Arrays.fill(k[i], -1);
int[] clusterCounts = new int[p];
for (int i = 0; i < n; ++i) {
int cluster = cal_diff(d[i]);
k[cluster][clusterCounts[cluster]++] = d[i];
}
cal_mean();
converged = checkConvergence();
for (int i = 0; i < p; ++i)
tempk[i] = Arrays.copyOf(k[i], n);
System.out.println("Current Clusters:");
for (int i = 0; i < p; ++i) {
System.out.print("Cluster " + (i + 1) + ": ");
for (int val : k[i]) {
if (val != -1)
System.out.print(val + " ");
}
System.out.println();
}
System.out.print("Means: ");
for (int i = 0; i < p; ++i)
System.out.print("m" + (i + 1) + "=" + m[i] + " ");
System.out.println();
} while (!converged);
System.out.println("\\nFinal Clusters:");
for (int i = 0; i < p; ++i) {
System.out.print("Cluster " + (i + 1) + ": ");
for (int val : k[i]) {
if (val != -1)
System.out.print(val + " ");
}
System.out.println();
}
}
}`
  },
  'naive-bayes': {
    title: 'Naive Bayes (4th Exp)',
    code: `CODE:EXPT4
import java.io.*;
import java.util.*;
class Element {
double[][] p;
Element(int n, int m) {
p = new double[n][m]; }}
class Classifier {
int no_attr = 0, no_rows = 0;
String[][] fileArray;
String[][] values;
double[] class_p;
int count;
Element[] a;
void readFile(String fname) throws IOException {
FileInputStream in;
try {
File f = new File(fname);
in = new FileInputStream(f);
} catch (Exception e) {
System.out.println("ERROR WHILE READING FILE");
return;}
BufferedReader br = new BufferedReader(new InputStreamReader(in));
String input = br.readLine();
StringTokenizer line = new StringTokenizer(input);
no_attr = line.countTokens() - 1;
fileArray = new String[100][no_attr + 1];
for (int i = 0; i <= no_attr; i++) {
fileArray[no_rows][i] = line.nextToken(); }
while ((input = br.readLine()) != null) {
line = new StringTokenizer(input); no_rows++;
for (int i = 0; i <= no_attr; i++) {
fileArray[no_rows][i] = line.nextToken();}} getAllvalues(); createTable();
newEntry();}
boolean in_values(int col_no, String temp) {
for (int i = 0; i <= count; i++) {
if (values[i][col_no] != null && values[i][col_no].equals(temp)) {
return true;}} return false;}
void getAllvalues() {
values = new String[100][no_attr + 1];
String temp;
for (int i = 0; i <= no_attr; i++) {
count = 0;
for (int j = 1; j <= no_rows; j++) {
temp = fileArray[j][i];
if (!in_values(i, temp)) {
values[count++][i] = temp; }}}}
int getlen(int col_no) {
int i = 0;
while (values[i][col_no] != null)
i++;
return i;}
int getcount(String temp, int col_no) {
int tc = 0;

for (int i = 1; i <= no_rows; i++) {
if (fileArray[i][col_no].equals(temp))
tc++;}
return tc;}
void createTable() {
int tp = getlen(no_attr);
class_p = new double[tp];
for (int i = 0; i < tp; i++) {
for (int j = 1; j <= no_rows; j++) {
if (values[i][no_attr].equals(fileArray[j][no_attr]))
class_p[i]++;}
class_p[i] /= no_rows;
System.out.println("P(" + values[i][no_attr] + ")=" + class_p[i]);}
a = new Element[no_attr];
for (int i = 0; i < no_attr; i++) {
a[i] = new Element(getlen(i), getlen(no_attr));
for (int j = 0; j < getlen(i); j++) {
for (int k = 0; k < getlen(no_attr); k++) {
int tc = 0;
for (int x = 1; x <= no_rows; x++) {
if (values[j][i].equals(fileArray[x][i]) &&
values[k][no_attr].equals(fileArray[x][no_attr])){
tc++;}}a[i].p[j][k] = (double) tc / getcount(values[k][no_attr], no_attr);}}}}
void newEntry() {
Scanner s = new Scanner(System.in);
System.out.println("\nEnter New Entry");
String[] entry = new String[no_attr];
double[] p_entry = new double[getlen(no_attr)];
StringBuilder X = new StringBuilder("X=<");
for (int i = 0; i < no_attr; i++) {
System.out.println("Enter " + fileArray[0][i]);
entry[i] = s.next();
X.append(entry[i]).append(" "); }
X.append(">");
System.out.println("\nThe Unseen Sample is " + X + "\n");
double large = 0.0;
int pos = -1;
for (int i = 0; i < getlen(no_attr); i++) {
double product = 1.0;
for (int j = 0; j < no_attr; j++) {
product *= a[j].p[getindex(j, entry[j])][i];}
p_entry[i] = class_p[i] * product;
System.out.println("P(X|" + values[i][no_attr] + ").P(" + values[i][no_attr]
+ ") = " + p_entry[i]);
if (p_entry[i] > large) {
large = p_entry[i];
pos = i; } }
System.out.println("\nThe Decision is " + values[pos][no_attr]);}
int getindex(int col_no, String temp) {
for (int i = 0; i < getlen(col_no); i++) {
if (values[i][col_no].equals(temp)) return i;}
System.out.println("Invalid Entry");
return -1;}}public class Bayes {
public static void main(String[] args) throws IOException {
Scanner s = new Scanner(System.in);
Classifier c = new Classifier();
System.out.println("Enter the name of the input file with its extension:");
c.readFile(s.next());}}`
  },
  'decision-tree': {
    title: 'Decision Tree (5th Exp)',
    code: `# Decision Tree Implementation
# Add your Decision Tree code here`
  }
};

export function getAlgorithmCode(algorithm: string) {
  return codes[algorithm as keyof typeof codes] || { title: 'Unknown', code: '' };
}
