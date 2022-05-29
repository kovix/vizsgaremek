# User story - Túra szervező alkalmazás

**Motiváció:** Az alkalmazás célja az hogy instant túrák lebonyolítását segítse, egyszerű felületen biztosítson a túra szervezőjének a résztvevők regisztrációjához és nyilvántartására, a túra paramétereinek kezeléséhez. Szintén egyszerű, nagyon könnyen kezelhető felületet kell biztosítani a túra résztvevőinek a teljesítés igazolásához, az egyes ellenőrző pontok meglátogatásának igazolásához. 
Rendkívül fontos a könnyű kezelhetőség, a kis adatforgalmú megvalósítás, sőt, bizonyos keretek között az offline működés is.


## 1. nyitólap

 **1. agilis felhasználói történet**

> A nyitólapon egy rövid bemutatkozó szöveg mellett központi helyen
> jelenik meg egy bejelentkező képernyő, amelyen az adminisztrátor vagy
> a túra tervező bejelentkezhet. Megjelenik továbba kiemelten minden
> olyan teljesítés, amely éppen zajlik, illetve külön listában a
> befejezett teljesítések. A teljesítésekre kattintva a teljesítések
> részletes nézetére navigál az alkalmazás.

**Elfogadási kritérium:**
Reszponzív, mobilra optimalizált képernyő, amely helyesen jeleníti meg a bejelentkezési képernyőt abban az esetben ha a felhasználó még nem lépett be. Helyesen jeleníti meg az akuális és befejezett teljesítések adatait. (Túra név, induló név, életkor, utolsó ellenőrzőpont, váható célba érkezés, ha befejezett túra akkor az, hogy a teljesítés sikeres vagy sikertelen.)

## 2. bejelentkezési képernyő

**1. agilis felhasználói történet**
> A képernyőn egy felhasználónév és egy jelszó beviteli mező,  egy
> "jegyezzen meg" jelölőnégyzet, valamint egy login gomb jelenik meg.
> Megjelenik továbbá egy elfelejtett jelszó hivatkozás és egy
> regisztrációs link.

**Elfogadási kritérium:** 
Sikeres bejelentkezés esetén a felhasználó a jogosultsági szintjének megfelelő felületre kerül átiránytásra, sikertelen bejelentkezés esetén figyelmeztető üzenet jelenik meg. 
Amennyiben a látogató az elfelejtett jelszó hivatkozásra kattint, az űrlap helyett egy e-mail cím bekérő űrlap jelenik meg. 
Amennyiben a látogató a regisztráció hivatkozásra kattint, új teljesítői fiókot hozhat létre, a felhasználónév (egyedi), név, e-mail cím, jelszó (2*) adatok megadásával.

## 3. Adminisztráció - túrák adatbázisa
**1. agilis felhasználói történet**

> A túrák adatai egy központi helyen megtekinthetőek.

**Elfogadási kritérium:** 
Táblázatos formában jelennek meg a túra főbb adatai: Név, szakaszok száma, ellenőrzőpontok száma, össz teljesítés száma, jelenlegi és jövőbeli teljesítések, sikeres teljesítések aránya.
***

**2. agilis felhasználói történet**

> Új túra rözíthető, illetve a túra átnevezhető.

**Elfogadási kritérium:** 
Az új rögzítés gombra kattintva új túra rögzíthető, a túrák sorában található ceruza ikonra kattintva a túra neve módosítható.  Mindkét esetben egy modal dialog jelenik meg, a képernyőről nem kell elnavigálni.
***

**3. agilis felhasználói történet**

> A túra részletes nézete megtekinthető.

**Elfogadási kritérium:** 
A túra nevére kattintva egy részletes képernyő jelenik meg, ahol a túra szakaszai, a szakaszokhoz tartozó ellenőrző pontok adatai, valamint a teljesítők adatai megtekinthetőek.
***

**4. agilis felhasználói történet**

> A túrákhoz szakaszok rögzíthetők.

**Elfogadási kritérium:** 
Minden egyes túra legalább egy szakszból áll, de akár több szakaszt is tartalmazhat. Péládul a DZD ultra trail 300 egyik verziója 1db 300km-es szakaszból áll, amely szintideje 90 óra, a második verziója pedig 3x100km-ből áll, amelyket egy éven belül kell teljesíteni, a szakaszok szintideje pedig egyenként 24 óra (összesen 72)
A képernyőn meg kell tudni jeleníteni a kiválasztott versenyhez tartozó szakaszokat, lehetőséget kell biztosítani új szakasz rögzítésére az alábbi adatok megadásával: Szakasz név, szaksz táv (km), szintidő mértéke.
Lehetőséget kell biztosítani szakasz adatainak módosítására. Mindkét esetben modal dialogot kell megjeleníteni, hogy az adatkarbantartás a megjelenítő képernyő elhagyása nélkül lehetséges legyen.
***

**5. agilis felhasználói történet**

> A szakaszok ellenőrzőpontokból állnak, az ellenőrzőpontok
> megjeleníthetőek, módosíthatóak, törölhetőek.

**Elfogadási kritérium:** 
Minden szakasz ellenőrzőpontokból áll. Az ellenőrzőpontok meglátogatásával, és a látogatások  igazolásável bizonyítja a túrázó hogy a távot az előírtaknak megfelelően teljesített. 
A pontok táblázatos, vagy kártya formátumban is megjeleníthetőek a felületen. 
A pontok adatai: 

 - sorszám (generált) 
 - megnevezés 
 - előző szakasztól mért távolsága
 -  Fotó a
   bezonosíthatósághoz 
   GPS koordináták (lat, lng) 
   Aktív flag

A felület lehetőséget biztosít az ellenőrző pontok rögzítésére, szerkesztésére modal dialog segítségével valamint törlésére az alábbiak szerint:
Ha az ellenőrzőpont egyetlen túra teljesítésben sem szerepel, visszavonhatatlanul törlésre kerül. Ha szerepel teljesítésben, akkor nem lehet törölni, ezért csak az aktív flag kerül bekapcsolásra. (Soft delete). 

A felületen biztosítani kell egy checkboxot, vagy toggle jelölőt, amely segítségével kiválasztható, hogy a bejelentkezett adminisztrátor csak az aktív, vagy az összes (beleértve a törölt) ellenőrzőpontokat kívánja megtekinteni.



# Felhasználói profilok (personas)

![Attila, 45 éves túraszervező. Az alkalmazás tipikus adminisztrátora](https://raw.githubusercontent.com/kovix/vizsgaremek/main/docs/Attila.png)

![Dániel, az alkalmazás tipikus felhasználója](https://raw.githubusercontent.com/kovix/vizsgaremek/main/docs/KoviX.png)
