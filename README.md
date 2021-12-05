<h1 align="center" id="title">Számológép</h1>
<h4 align="center">Egyszerű, letisztul, reszponszív számológép javascriptben</h4>
  
Sima egyszerű számológép, alap funkciókkal ellátva, letisztult user interface-el, minden funkció megtalálható benne ami megtalálható egy alap számológépben.    
A [figma design tervek](design.png) szerint a számológép még ennél is komplikáltabb lett volna, ellenben végül is ez lett a végleges verzió, hiszen tökéletesen ellátja ez is a dolgát.  
Úgy lett felépítve az oldal, hogy a számológép reszponszív legyen, illetve még annak nagyságát is lehessen állítani. Ha a felhasználó telefonról tölti be az oldalt akkor ő is egy szép, telefonra méretezett oldalt fog látni, ez a UserAgent átvizsgálása alapján történik. Ha esetlegesen szükség van két soros szám megjelenítésére, akkor ezt autómatikusan érzékeli a script, majd átállítja a fő megjelenítő elemet kétsorosra.  
A számológép a legelső művelettől kezdve, mindig elmenti az előző műveletet, hogy lehessen újra és újra azt lehívni anélkül, hogy mindig a felhasználónak be kéne írnia (ez sima számológépeknél is így van).  
A számológépben az egyetlen nagyobb nehézséget a [`Floating-Point Arithmetic`](https://floating-point-gui.de/) jelentette. Példaképp a `0,1 + 0,2` eredménye ugyanis `0.30000000000000004` ez az eredmény helytelen. Erre a problémára egy tökéletes megoldást találtam, mégpedig a [bignumber.js](http://jsfromhell.com/classes/bignumber)-t. Ez a script elősegíti a probléma kiküszöbölését, nagyon sokat köszönhetek neki.  
A számológép úgy lett leprogramozva, hogy könnyen bővíthető legyen, ugyanis a történések nagyrésze kódok alapján megy. Példaképp az `1`-es kód hozzáad egy egyest a jelenlegi számunk végére, a `14`-es kód pedig a jelenlegi műveleteket végrehajtja.  
A számológép irányítható billenytűkombinációkkal, ennek kivitelezése a kód rendszer alapján szinte már gyerekjáték volt.  

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