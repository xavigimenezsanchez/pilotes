# Amb dues Pilotes
## bé de fet hi ha 150

Per aquest exemple he fet servir la POO clàsica.

Hi ha tres classes:
* **Joc**
* **CanvasElement**
* **Pilota**

#CanvaElement
   
   Aquesta és la classe (abstracta) de la que hereta qualsevol element que volem pintar en el canvas.
   
   El mètode **collisio** s'encarrega de dir-nos en quina paret ha col·lisionat la pilota
   
#Pilota

   Aquesta és la classe filla que hereta de **CanvasElement**.
   
   Té una nova propietat que és **color**.
   
   La màgia de les matemàtiques la trobem al mètode **moure**
   
#Joc

   És la classe que crea el canvas, el array de pilotes i fa que es mogin

