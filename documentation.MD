

## **1. Az alkalmazás célja**

Az alkalamzás célja, hogy egy magánrendelés betegirányítását ellássa, a rendelésen dolgzók számára információkat szolgáltasson.
Az alkalmazás nodejs + Mongodb backenddel készült, az univerzális futtathatóságot Docker biztosítja.

## **2. Az alkalmazás telepítése**


- A célgépre le kell klónozni az alábbi GitHub repository tartalmát.

   `git clone https://github.com/kovix/vizsgaremek`

Telepíteni kell az alkalmazás függőségeit az alábbi sorrendben:
- Docker desktop: https://www.docker.com/products/docker-desktop/
- Nodejs: A node futtatáshoz a https://nodejs.org/en/download/ címről tölthető le a operációs rendszernek és architektúrának megfelelő telepítőkészlet.

- Ha még nincsen fenn a célgépen, akkor telepíteni kell az Angular keretrendszert az `npm i -g @angular/cli` paranccsal.

    - Frontend

        - A terminálon be kell lépni a /frontend mappába és futtatni az `npm i` parancsot.  

    - Backend

        - A terminálon be kell lépni a /backend mappába és futtatni az `npm i` parancsot.
    

## **3. Az alkalmazás konfigurálása**

A /frontend/environments mappában be kell állítani az API végpont elérési útvonalát: 

  - _environment.ts_ fejlesztői módban 
  - _environment.prod.ts_ állomány: végfelhasználói módban
Alapértelmezett végpontok:
backend:  'http://localhost:3000/',
chatURL:  'ws://localhost:3000/chat'

**Fontos:** Az alkalmazás egy egyszerű websocket implementációt használ arra, hogy az egyes munkahelyek (rendelők) az adatokban bekövetkező változásokról azonnal tudomást szerezzenek. Ha az alkalmazást nem localhost-ról használják, csak akkor fog működni ha HTTPS protokollt használ az elérésre érvényes tanusítvánnyal. Az alkalmazás express szervere jelenleg nincs felkészítve a tanusítvány kulcsainak kezelésére, így többgépes felhasználás esetén szükség lehet pl. egy reverse proxy beállítására. **Természetesen localhoston, például több böngészőablakkal a websocket funkcionalitás tesztelhető.**


## **4. Az alkalmazás indítása**

A megadott Docker container indítása és inicializálása:

- El kell indítani a Docker Desktop alkalmazást.
- A /backend mappába belépve a terminálban ki kell adni az `npm run deploy` parancsot.  A parancs lefordítja a frontend alkalmazást, a backend publikus mappájába másolja, majd inicializálja a docker konténert.

_Megjegyzés_:  
A belépéshez egy érvényes e-mail-cím és jelszó páros (példa):  

Felhasználónév | Jelszó
------------ | -------------
training360 | Training2022!


## **5. Az alkalmazás tesztelése**

A /backend mappában az `npm test` paranccsal futtathatóak az unit és integrációs tesztek.  

## **6. A végpontok dokumentációja**

Swagger 
- Ha az alkalmazás fut, az alábbi végpontoton érhető el az interaktív API dokumentáció: https://localhost:3000/api-docs

## **7. Hasznos tipp**

Rendelés képernyőn, betegadat szerkesztés közben, a popup ablakban az időpont mezőkre kétszer kattintva a mezőbe az aktuális dátum beírható.


## **Linkek:**  

https://github.com/kovix/vizsgaremek/blob/main/README.md
