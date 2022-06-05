# User story - Sétálólap alkalmazás

**Motiváció:** Az alkalmazás célja magánklinikák belső betegirányításának egyszerűbbé és hatákonyabbá tétele.
A magánrendelésen (a tesztesetben kardiológia) többfajta vizsgálaton megy keresztül a beteg az érkezés és a távozás között. (pl érkezés - konzultáció - EKG, laborvizsgálat - ultrahang - terheléses ekg - holter - majd főorvosi konzultáció. Ezek a vizsgálatok párhuzamosan zajlanak, azaz amíg valakit éppen vesznek fel, addig egy másik helyiségben másvalakin épp ultrahangos vizsgálatot végeznek, és van aki már a főorvossal egyeztet az eredményekről, stb.

A jó betegkiszolgálás és a magas elégedettség elérése miatt kulcsfontosságú hogy a személyzet időben felfedezze ha valahol csúszás van, tudják irányítani a rendelőkben dolgozókat, és el tudják érni hogy a betegek várakozási ideje "tűréshatáron belül legyen", amely akár egyénenként változhat, illetve természetesen, hogy a páciens pontosan azokat a vizsgákatokat kapja meg, amelyeket kér, illetve amelyekre szüksége van.

A jellemző, elfogadott rendszer a papír alapú betegkövetés, ahol a páciens érkezéskor kap egy papírt, amelyre minden vizsgálat tényét rávezetik. Ez a megoldás csak a vizsgálatok megtörténtét rögzíti és az elszámolást teszi lehetővé, a ment közbeni gyors beavatkozás lehetőségét, illetve a későbbi elemzéseket, a folyamatok részletes megismerését, esetleg betegkövetést nem tesz lehetővé. A fenti hiányosságok orvoslására hívjuk életre ezt az alkalmazást.


## _**Bejelentkezési képernyő**_

**1. agilis felhasználói történet:**
> _Az alkalmazás kizárólag bejelentkezés után használható._

**Elfogadási kritérium:**  

Minden olyan kérésre, amely nem authorizált, egy bejelentkezési képernyőnek kell megjelennie. A bejelentkezési képernyőn felhasználónév és jelszó megadásával lehet az alkalmazás további funkcióihoz hozzáférni.
A bejelentkezési felület mobilbarát módon jelenik meg, menük és egyéb elemek nélkül. Regisztrációra az alkalmazásban nincs lehetőség.

## _**2. Nyitó oldal**_

**1. agilis felhasználói történet:**
> _A főoldalon új rendelést lehet létrehozni illetve meglévő rendelést lehet létrehozni._

**Elfogadási kritérium:**  

A képernyőn megjelenik egy új rendelés létrehozása űrlap ahol megadható egy új rendelés neve, valamint egy lenyíló listából kiválasztható a rendelés típusa. A mentés gombra kattintva létrejön a rendelés az adatbázisban, és az alkalmazás automatikusan az új rendelés lebonyolítására navigál.

Az új űrlap alatt lapozható formában, táblázatban megjelennek a korábban rögzített rendelések adatai (név, dátum, betegek száma), valamint egy gomb, amelyre kattintva az alkalmazás az adott rendelés lebonyolítására navigál. 

## _**2. Nyitó oldal**_

**1. agilis felhasználói történet:**
> _A főoldalon új rendelést lehet létrehozni illetve meglévő rendelést lehet létrehozni._

**Elfogadási kritérium:**  

A képernyőn megjelenik egy új rendelés létrehozása űrlap ahol megadható egy új rendelés neve, valamint egy lenyíló listából kiválasztható a rendelés típusa. A mentés gombra kattintva létrejön a rendelés az adatbázisban, és az alkalmazás automatikusan az új rendelés lebonyolítására navigál.

Az új űrlap alatt lapozható formában, táblázatban megjelennek a korábban rögzített rendelések adatai (név, dátum, betegek száma), valamint egy gomb, amelyre kattintva az alkalmazás az adott rendelés lebonyolítására navigál. 

## _**3. Vizsgálatok karbantartása oldal**_

**1. agilis felhasználói történet:**
> _A felhasználói felületen megjelennek a vizsgálatok adatai. (név, átlagos időtartam)_

**Elfogadási kritérium:**  

A képernyőn táblázatos formában jelennek meg a rögzített vizsgálatok adatai, illetve egy szerkesztés és törlés gomb. Csak akkor törölhető a vizsgálat, ha egyetlen rendeléshez sincs hozzárendelve. 

**2. agilis felhasználói történet:**
> _A vizsgákat törölhető, ha egyetlen vizsgálat csoporthoz és rendeléshez sincs hozzárendelve_

**Elfogadási kritérium:**  

A törlés gombra kattintva elindul a vizsgálat törlése. Csak akkor törölhető a vizsgálat, ha egyetlen rendeléshez és csoporhoz sincs hozzárendelve. Speciális "vizsgálat típus" az érkezés és a távozás, amelyek nem törölhetőek.

**3. agilis felhasználói történet:**
> _A vizsgákat adatai szerkeszthetők_

**Elfogadási kritérium:**  

A szerkesztés gombra kattintva a kiválasztott vizsgálat adatai szerkeszthetőek. Nem lehet két azonos nevű vizsgákat.

**4. agilis felhasználói történet:**
> _Új vizsgálat rögzíthető_

**Elfogadási kritérium:**  

Az új vizsgálat létrehozása gombra kattintva egy popupban hozható létre új vizsgálat. Meg kell adni a vizsgálat nevét, és átlagos időtartamát. Csak olyan vizsgálat rögzíthető amely neve még nem szerepel az adatbázisban. Amennyiben a mentés sikeres, az új vizsgálat azonnal megjelenik a listában.


 ## _**4. Vizsgálat csoportok karbantartása oldal**_

**1. agilis felhasználói történet:**
> _Megjelennek táblázatos formában a vizsgálatcsoportok, a másodikban a kiválasztott vizsgálatcsoporthoz tartozó vizsgálatok_

**Elfogadási kritérium:**  
A vizsgálatok csoportba rendezhetők. Az egyes csoportok tulajdonképpen a rendelést testesítik meg. A csoportba rögzített vizsgálatok sorrendje megegyezik a vizsgálatok logikai sorrendjével.
A képernyő két egyenlő részre osztva jelenik meg, a bal oldali oszlopban jelenneg meg a rendelés típusok. (Egyetlen paraméterrel rendelkezik, amely a név) 
Megjelenik továbbá egy egyszerű új rögzítés űrlap, amely egyetlen beviteli mezőből áll (név) valamint egy mentés gombból.
Amennyiben a felület mobileszközön jelenik meg, az oszlopok egymás alatt kapnak helyet.

**2. agilis felhasználói történet:**
> _Új vizsgálat csoport rögzíthető_

**Elfogadási kritérium:**  

Az oldalon megjelenő "új rögzítés űrlap" kitöltése és a mentés gomb megnyomása után a mentés funkció indul el. Csak egyedi nevű rendelés csoport rögzíthető. Ha a rendelés csoport már létezik, hibaüzenet jelenik meg, ellenkező esetben mentésre kerül, azonnal megjelenik a listában és kiválasztásra kerül.

**3. agilis felhasználói történet:**
> _A vizsgálat csoporta kattintva a csoport kiválasztásra kerül._

**Elfogadási kritérium:**  

A bal oldali listában a csoport nevére kattintva a jobb oldali listába betöltődik a csoporhoz rendelt vizsgálatok listája (3.pont), valamint egy új hozzáadása űrlap.

**4. agilis felhasználói történet:**
> _A kiválasztott vizsgálat csoporthoz új vizsgálat rendelhető hozzá_

**Elfogadási kritérium:**  

A kiválaszott csoport rendelései felett megjelenik egy új hozzárendelés űrlap, amely egy lenyíló listában tartalmazza mindazon vizsgálatokat, amelyek még nincsnek a csoporthoz rendelve. A mentés gombra kattinva a vizsgálat utolsó elemént mentésre kerül a csoporthoz. Az érkezés és távozás speciális események nem rendelhetők hozzá egyetlen csoporthoz sem.

**5. agilis felhasználói történet:**
> _A vizsgálat törölhető a csoportból_

**Elfogadási kritérium:**  

A vizsgálat mellett megjelenő törlés ikonnal a vizsgálat eltávolítható a csoportból. A törlés előtt figyelmezető üzenet jelenik meg.

**6. agilis felhasználói történet:**
> _A vizsgálat törölhető a csoportból_

**Elfogadási kritérium:**  

A vizsgálat mellett megjelenő törlés ikonnal a vizsgálat eltávolítható a csoportból. A törlés előtt figyelmezető üzenet (kérdés) jelenik meg.

**7. agilis felhasználói történet:**
> _A vizsgálatok sorrendje módosítható a csoportban_

**Elfogadási kritérium:**  

A kiválasztott csoporthoz rendelt vizsgálatok sorrendje a vizsgálat előtt található rendezés ikonnal fel illetve le mozgatható. Az első bejegyzés csak lefelé mozhatható, az utolsó pedig csak felfelé. Amennyiben a rendelés csoport csak egyetlen vizsgálatot tartalmaz, az átrendezés ikonok egyáltalán nem jelennek meg. Az átrendezés automatiksan, azonnal mentésre kerül.

_**Elfogadási kritérium:**_ A 4-es pontban felsorolt módosító műveletek a meglévő rendelésekre nincs hatással, csak az újonnal létrehozott rendelések esetében kerülnek érvényre.


 ## _**5. Páciensek karbantartása oldal**_

**1. agilis felhasználói történet:**
> _Táblázatos formában megjelennek a betegek adatai_

**Elfogadási kritérium:**  
A menüpontra kattintva táblázatos formában jelenik meg a rögzített páciensek főbb adatai. (Név, TAJ, e-mail, utolsó látogatás, beállított riasztás)

**2. agilis felhasználói történet:**
> _A páciensek adatai lapozható formában jelennek meg._

**Elfogadási kritérium:**  
A páciens táblázat az erőforrás takarékos működés érdekében lapozhatóan jelenik meg. a lapozó a táblázat alatt jelenik meg.

**3. agilis felhasználói történet:**
> _A páciensek adatai a főbb szempontok alapján sorba rendezhető_

**Elfogadási kritérium:**  
A páciens táblázat oszlopfejléceire kattintva a főbb adatok alapján (Név, taj, e-mail, utolsó látogatás, beállított riasztás) átrendezhető a lista.
  

**4. agilis felhasználói történet:**
> _A páciensek listája szűrhető_

**Elfogadási kritérium:**  
A páciensek listája név és TAJ szám alapján szűrhető.

**5. agilis felhasználói történet:**
> _Új páciens rögzíthető_

**Elfogadási kritérium:**  
Az új hozzáadása gombra kattintva új felhasználó rögzíthető Név, E-mail cím, TAJ szám, megjegyzés megadásával.
A TAJ számnak egyedinek kell lennie.

**6. agilis felhasználói történet:**
> _A páciensek törölhetőek_

**Elfogadási kritérium:**  
Amennyiben a páciens egyetlen rendeléshez sincs hozzárendelve, törölhető az adatbázisból, törlés gombbal.
Amennyiben már történt hozzárendelés, a törlés helyett az adatokat anonimizáljuk, a név "Törölt páciens" a TAJ 000-000-000 értékre kerül beállításra, az e-mail cím pedig törlés kerül.

 ## _**6. rendelés lebonyolítása oldal**_

**1. agilis felhasználói történet:**
> _A rendelés adatai táblázatos formában jelennek meg._

**Elfogadási kritérium:**  
A lebonyolítás oldalon táblázatos formában jelennek meg a rendelés fontos adatai, ahol az oszlopok a kiválasztott csoport vizsgálatai a megadott sorrendben, a sorok pedig a rendelésen megjelent páciensek.

**2. agilis felhasználói történet:**
> _A rendelőben dolgozó személy beállíthatja, hogy mely szakerületekért felel._

**Elfogadási kritérium:**  
A felület a rendelés során minden rendelőben, valamint a recepción is egyidőben megnyitásra kerülhet. Az adminisztrátor az adott munkameneten beállíthatja, hogy mely vizsgálatokért felel. A későbbiekben csak ezeket a vizsgálatokon lesz képes módosításokat végezni. Nincs akadálya annak, hogy egy-egy vizsgálat több munkahelyen is beállításra kerüljön. (Pl. a recepció mindent menedzselhet, a rendelő csak az ott végzett vizsgálatokat.) A beállítás nem kerül mentésre, esetleges újratöltés esetén meg kell ismételni a kijelölést.

**3. agilis felhasználói történet:**
> _A táblázat sorai színkódoltak_

**Elfogadási kritérium:**  
- A táblázatban fehér háttérrel jelenik meg minden általános sor.
- A táblázatban zöld színnel jelennek meg azok a sorok ahol a páciens már távozott
- A táblázatban narancssárga színnel jelenik meg minden olyan aktív páciens aki több mint 15 perce várakozik
- A táblázatban vörös színnel jelenik meg akit riasztás 1 szintre állítottak
- A táblázatban sötét vörös színnel jelenik meg, akit riasztás 2 szintre állítottak

**4. agilis felhasználói történet:**
> _A rendeléshez új páciens rögzíthető_

**Elfogadási kritérium:**  
Az érkező páciens a betegtörzsből hozzárendelhető a rendeléshez. A hozzárendelhető páciensek táblázatos formában jelennek meg, a táblázat név és TAJ szám szerint szűrhető. A kiválasztás után meg kell adni az érkezési időt, majd a mentés gombra kattintást követően a páciens automatikusan megjelenik a táblázatban, illetve a páciens módosítás dialógus automatiksan megjelenik.

**5. agilis felhasználói történet:**
> _A rendeléshez rendelt páciens paraméterei módosíthatóak_

**Elfogadási kritérium:**  
A páciens táblázat sorának utolsó oszlopban taláható információk ikonra kattintva egy popup jelenik meg, amely tartalmazza az alábbi adatokat:

- Vizsgálat neve
- Státusz (kell, nem kell)
- Behívás időpontja
- távozás időpontja

Tartalmaz továbbá minden sor egy gombot: 
"Behívás gomb" jelenik meg, ha a vizsgálat szükséges, és nincs behívva
"Távozás gomb" jelenik meg, ha a vizsgálat szükséges, a beteg behívásra került, de még nem távozott.

A dialogban csak azok a sorok módosíthatóak, amely vizsgálathoz a felhasználó jelezte, hogy a munkahelyén felelős, módosíthatja. 
A módosítás kétféleképpen történhet: A vizsgálat sora mellett beírhatóak az időpontok a megfelelő mezőkbe, és a mentés gombbal elmenthetőek, illetve a Behívás / Távozás gombra kattintva a megfelelő mező az aktuális óó:pp értékkel kitöltésre kerül, és a dialog automatikusan bezáródik.

Amennyiben a vizsgálat úgy kerül befejezésre, hogy nincs megnyitva, vagy a megnyitás és a lezárás között kevesebb mint 10 másodperc telik el, a szoftver úgy tekinti, hogy a kezdés időt nem kívánták megadni, így annak értékét törli.

Érkezés esemény esetén csak a kezdési idő, távozás esetén csak a zárás idő értelmezhető.

**6. agilis felhasználói történet:**
> _A táblázat celláiban megjelenik a az adott beteg adott vizsgálathoz tartozó paraméteri jelennek meg._

**Elfogadási kritérium:**  
A páciens / vizsgálat metszéspontban található cellák értéke az alábbiak szerint alakul:

- ha a vizsgálat nem szükséges -- nem szükséges -- érték jelenik meg halványan (muted)
- Ha a vizsgálat szükséges, két cella jelenik meg, 50%-50% szélességben, az első oszlop az érkezés, a második oszlop a távozás időpontját jelöli óó:pp formátumban. Amennyiben a cellára húzza a felhasználó az egeret a vizsgálat hossza jelenik meg perc:mp formátumban, ha kiszámolható és értelmezhető.

**7. agilis felhasználói történet:**
> _A táblázat első oszlopa tartalmazza a beteg várakozással töltött idejét az utolsó vizsgálat óta._

**Elfogadási kritérium:**  A táblázat első oszlopa egy folyamatosan frissülő counter, amely pp:mm formátumban mutatja, hogy az érkezés vagy az utolsó vizsgálat befejezése óta eltelt idő mennyi. (ez alapján kerül a narancssága színkód is beállításra.)

 **8. agilis felhasználói történet:**
> _A recepció behívásra javasolhat beteget._

**Elfogadási kritérium:**  A táblázat egyes celláira kövzvetlenül kattintva a recepció a váróterem összetétele ismeretében javasolhatja, hogy az egyes szakterületek mely beteget hívják be következőként. A kattintást követően egy megerősítő dialog jelenik meg. Jóváhagyás esetén a kijelölt cella tartalma villog amíg a páciens behívásra nem kerül. (A szakterület saját belátása szerint jóváhagyja vagy figyelmen kívül hagyhatja a javaslatot.)
Ismételt cellára kattintással a javaslat törölhető.

 **9. agilis felhasználói történet:**
> _A távozott betegek adatai elrejthetőek._

**Elfogadási kritérium:**  A táblázatból a távozott betegek elrejthetőek, így csak az aktív betegek adatai láthatóak, a táblázat áttekinthetőbb lesz.

 **10. agilis felhasználói történet:**
> _Minden műveletről naplóbejegyzés készül._

**Elfogadási kritérium:**  A felületen minden módosításról naplóbejegyzés készül, amely tartalmazza az esemény idejét, az IP címet, a bejelentkezett felhasználót, és az esemény szöveges leírását.

 **11. agilis felhasználói történet:**
> _A táblázat automatikusan frissül._

**Elfogadási kritérium:**  Az egyes kliensek egy webscoket szerverhez kapcsolódnak, amelyen kereszül értesítés kerül kiküldésre minden egyes alkalommal, amikor a táblázat bárhol, bármely munkahelyen módosul. A beérkező üzenet hatására a táblázat frissítésre kerül, így elkerülhető a felesleges hálózati terhelés, a polling.

 **12. agilis felhasználói történet:**
> _A napló megtekintése gombra kattintva a napló oldal jelenik meg.._

**Elfogadási kritérium:**  A gombra kattintva a szoftver a rendeléshez tartozó napló oldalra navigál.

 ## _**6. naplóbejegyzések oldal**_

**1. agilis felhasználói történet:**
> _Az egyes rendelések minden egyes műveletéhez naplóbejegyzések rendelhetőek._

**Elfogadási kritérium:**  
Az oldalon egy kiválasztott rendelés naplói jelennek meg, táblázatos formában. A naplóbejegyzéseket sem módosítani, sem törölni nem lehet.

 ## _**6. beteghívó felület**_

**1. agilis felhasználói történet:**
> _Önálló felületen jelennek meg a behívott betegek adatai._

**Elfogadási kritérium:**  
Érkezéskor minden páciens sorszámot kap, amely a beteghívó felületen megjelenik ha behívják egy vizsgálatra.
A felületen nagy méretben jelenik meg a beteg sorszám, és a vizsgálat helye hogy távolról is jól olvasható legyen.

**2. agilis felhasználói történet:**
> _Ez a felület bejelentkezés nélkül is látható._

**Elfogadási kritérium:**  
A felület adatai bejelentkezés nélkül is megtekinthetőek.

 **3. agilis felhasználói történet:**
> _A képernyő automatikusan frissül._

**Elfogadási kritérium:**  Az egyes kliensek egy webscoket szerverhez kapcsolódnak, amelyen kereszül értesítés kerül kiküldésre minden egyes alkalommal, amikor a táblázat bárhol, bármely munkahelyen módosul. A beérkező üzenet hatására a táblázat frissítésre kerül, így elkerülhető a felesleges hálózati terhelés, a polling.

## _A projekt egyéb adatai:_

**Prioritás:**  
magas

**Megvalósítás időtartama:**  
10 hét

**További fejlesztési lehetőségek:**  
- További betegadatok rögzítése.
- Távozáskor automatikus riasztás beállításának lehetősége. (pl. 3 hónap múlva automatikus e-mail hogy kontrollvizsgákat szükséges, a megfelelő előjegyzés link beszúrásával, vagy riasztás az recepció felé hogy ugyanezen okból hívja fel a pácienst.
- Megfelelő biztonsági szint elérése esetén az alkalmazás nyilvános szerveren is futtatható, amely lehetővé tenné, hogy a rendszerhez egy mobilalkalmazás készüljön, amin a várakozó betegek a beteghívó mellett közvetlen értesítést is kaphatnak a hívásról, illetve további közvetlen kommunikációra is mód nyílna. (pl időpontfoglalás, emlékeztetők, stb.)
- Részletes statisztika a rendelés menetéről, így a gyenge pontok folyamatosan és gyorsan azonosíthatóak lennének, és gyors reagálás, folyamatalakítás válna lehetővé.


---
---




