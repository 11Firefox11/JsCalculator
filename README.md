<h1 align="center" id="title">Számológép</h1>
<h4 align="center">Egyszerű, letisztul, reszponszív számológép javascriptben</h4>
  
Sima egyszerű számológép, alap funkciókkal ellátva, letisztult user interface-el, szemnek kellemes színekkel (![#001011](https://via.placeholder.com/15/001011/000000?text=+), ![#456990](https://via.placeholder.com/15/456990/000000?text=+), ![#E59500](https://via.placeholder.com/15/E59500/000000?text=+), ![#FF6663](https://via.placeholder.com/15/FF6663/000000?text=+)), minden funkció megtalálható benne ami egy alap számológépben.  

## Funkciók
### Responzív, "okos" design
Úgy lett felépítve az oldal, hogy a számológép reszponszív legyen, illetve még annak nagyságát is lehessen állítani. Amikor a számológép szélessége és/vagy magassága eléri a teljesen kitölthető területet, akkor ha a böngésző újra lesz méretezve, a számológép teljesen ki fogja tölteni a területet (főképp gépen/laptopon jellemző). Ha a felhasználó telefonról tölti be az oldalt akkor ő is egy szép, telefonra méretezett oldalt fog látni. Ha esetlegesen szükség van két soros szám megjelenítésére, akkor ezt automatikusan érzékeli, majd átállítja a fő megjelenítő elemet két sorosra.  
### Előző művelet
A számológép a legelső művelettől kezdve, mindig elmenti az előző műveletet, hogy lehessen újra és újra azt lehívni anélkül, hogy mindig a felhasználónak be kéne írnia azt újra, meg újra. Ez a lementett előző művelet kitörlődik a teljes törlés folyamán.
### Precíz számok  
A számológépben az egyetlen nagyobb nehézséget a [`Floating-Point Arithmetic`](https://floating-point-gui.de/) jelentette. Példaképp a `0,1 + 0,2` eredménye ugyanis `0.30000000000000004` a számítógépek "nyelvében" és ez az eredmény helytelen. Erre a problémára egy tökéletes megoldást találtam, mégpedig a [bignumber.js](http://jsfromhell.com/classes/bignumber)-t. Ez a script elősegíti a probléma kiküszöbölését, nagyon sokat köszönhetek neki, más megoldást ami ugyanilyen precizitást biztosít ugyanis nem tudtam kivitelezni. 
### Bővíthetőség   
A számológép úgy lett leprogramozva, hogy könnyen bővíthető legyen, ugyanis a történések nagyrészt kódok alapján megy. Példaképp az `1`-es kód hozzáad egy egyest a jelenlegi számunk végére, a `14`-es kód pedig a jelenlegi műveleteket végrehajtja.  
### Billentyűkombinációk
A számológép irányítható billenytűkombinációkkal, ami az alábbi táblázatban jól is látszódik.

---
  
### A kódok és egyéb információ róluk:
  
| Kód | Történés | Billentyű kombináció | Gomb | 
| --- | --- | --- | --- |
| `0` | A jelenlegi szám végére rak egy `0`-t | <kbd>Num0</kbd> vagy <kbd>0</kbd> | `0` |
| `1` | A jelenlegi szám végére rak egy `1`-t| <kbd>Num1</kbd> vagy <kbd>1</kbd> | `1` |
| ... | ... | ... | ... |
| `9` | A jelenlegi szám végére rak egy `9`-t | <kbd>Num9</kbd> vagy <kbd>9</kbd> | `9` |
| `11` | Kitörli a jelenlegi eredményt és az legutolsó számítást | <kbd>Del</kbd> vagy <kbd>Shift</kbd>+<kbd>Backspace</kbd> | `C` |
| `12` | Kitörli a jelenlegi szám utolsó karakterét | <kbd>Backspace</kbd> | `CE` |
| `13.1` | A jelenlegi szám egy százalékát kiszámolja | <kbd>Shift</kbd>+<kbd>5</kbd> | `%` |
| `13.2` | Regisztrálja az osztás műveletet | <kbd>Num/</kbd> vagy <kbd>Shift</kbd>+<kbd>6</kbd> | `÷` |
| `13.3` | Regisztrálja a szorzás műveletet | <kbd>Num*</kbd> vagy <kbd>LeftAlt</kbd>+<kbd>-</kbd> | `x` |
| `13.4` | Regisztrálja a kivonás műveletet | <kbd>Num-</kbd> vagy <kbd>-</kbd> | `-` |
| `13.5` | Regisztrálja az összeadás műveletet | <kbd>Num+</kbd> vagy <kbd>Shift</kbd>+<kbd>3</kbd> | `+` |
| `14` | A jelenlegi műveletet kiszámolja, végrehajtja | <kbd>NumEnter</kbd> vagy <kbd>Enter</kbd> | `=` |
| `15` | A jelenlegi számot pozitívvá/minusszá változtatja | <kbd>Shift</kbd>+<kbd>Num-</kbd> vagy <kbd>Shift</kbd>+<kbd>-</kbd> | `+/-` |
| `16` | A jelenlegi szám végére rak egy `,`-t | <kbd>Num,</kbd> vagy <kbd>,</kbd> vagy <kbd>.</kbd> | `,` |
  
> Hungarian repo