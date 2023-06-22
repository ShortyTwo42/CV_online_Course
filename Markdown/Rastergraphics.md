<!--
author:     Leon Endris

email:      leendris@uni-koblenz.de

version:    0.1.0

language:   de

narrator:   Deutsch Female

comment:    Dies ist die erste Lektion des
            CV Online Kurses. Format und Nutzen 
            von Pixel-/Rastergrafik wird hier vermittelt

link:       ../CSS/Main.css 

script:     ../JavaScript/LiaScriptCustom.js

-->

# Lektion 1: Pixel-/Rastergrafik
Willkommen zur ersten Lektion des CV Online Kurses. In dieser Lektion lernt werdet ihr mehr über den Aufbau von Pixel-/Rastergrafiken lernen und auch eigene Dateien selber erstellen.

# Was ist eine Pixel-/Rastergrafik?
Gängige Bildformate wie JPG oder PNG verwenden ein Raster, um sogenannte Picture Elements, kurz "Pixel", anzuordnen. Jeder Pixel enthält eine codierte Farbwertinformation. Die wichtigsten Eigenschaften eines solchen codierten Bildes sind Höhe, Breite und Farbtiefe. Die Farbtiefe gibt an, wie viele Abstufungen von Helligkeitswerten möglich sind.
Binärbilder erlauben beispielsweise nur schwarze oder weiße Pixel. Mit Grauwertbildern können verschiedene Grautöne zwischen Schwarz und Weiß dargestellt werden. Und schließlich können Farbbilder durch das anteilige Mischen der Farben Rot, Grün und Blau erzeugt werden.
Ein Problem bei diesen Pixelgrafiken besteht darin, dass eine verlustfreie Skalierung nicht möglich ist. Wenn wir in ein solches Bild hineinzoomen, werden die einzelnen Pixel immer deutlicher sichtbar.


# Wie kommt ein Pixel auf den Bildschirm?
Wie genau kommt ein solches Pixel nun auf unseren Bildschirm? Wir können uns das Raster eines Bildes vorstellen wie ein Koordinatensystem, bei dem wir nur mit natürlichen Zahlen (0, 1, 2, …) für die x und y Werte die einzelnen Pixel ansprechen. Das Koordinatensystem hat bei Bildern seinen Ursprung meist in der oberen linken Ecke.
In der Informatik zählen wir von 0 an und nicht wie sonst üblich von 1. Möchten wir also das obere linke Pixel eines Bildes ansprechen, so geben wir die Koordinaten (0, 0) an. Die Funktion PutPixel bekommt als Eingabe die Koordinaten eines Pixels und färbt diesen schwarz.
Möchten wir nun die erste Reihe unseres Bildes schwarz färben, so können wir eine „Schleife“ benutzen, anstatt jeden Pixel händisch einzeln anzusprechen. Wir nutzen eine „For-Schleife“. Diese ist wie folgt aufgebaut. Zunächst definieren wir eine Laufvariable und weisen dieser einen Startwert zu. Da wir die gesamte Reihe ansprechen wollen wählen wir als Startwert 0. Dann definieren wir eine Abbruchbedingung. Solange die Bedingung erfüllt ist, wird die Schleife wiederholt. Beispielsweise möchten wir, dass der Code innerhalb der Schleife so lange ausgeführt wird, bis unsere Laufvariable nicht mehr kleiner als die Breite unseres Bildes ist. Zuletzt müssen wir definieren, wie die Laufvariable nach jeder Durchführung der Schleife angepasst wird. In unserem Fall möchten wir die Variable immer um 1 erhöhen. Dies kann in JavaScript abgekürzt werden durch ein einfaches „++“. 
Möchten wir nun nicht nur die erste Reihe verfärben, so können wir die Schleife verschachteln. Wir umschließen unsere erste For-Schleife mit einer weiteren For-Schleife, die wiederum eine andere Laufvariable verändert. Diese läuft dieses Mal von 0 so lange durch, bis die Laufvariable nicht mehr kleiner als die Höhe des Bildes ist. So können wir über das gesamte Bild iterieren.
Um nicht einfach das gesamte Bild schwarz zu färben, können wir zusätzlich eine Bedingung für die PutPixel Funktion definieren. Diese Bedingung wird in einer If-Abfrage definiert. In unserem Beispiel wird die Funktion PutPixel nur aufgerufen, wenn x und y gleich sind. 


## Programmierbeispiel: PutPixel
Versuche es nun selbst mithilfe des PutPixel Tools. Mögliche Übungen:

* Färbe nur die 3te Reihe schwarz
* Färbe nur ungerade Reihen oder nur ungerade Spalten schwarz
* Färbe ein Pixel nur, wenn x + y ein Bestimmtes Ergebnis erfüllen

??[PutPixel](https://shortytwo42.github.io/InteractiveCodingTools/InteractiveCodingTools/HTML/PutPixel.html)

# Wie werden einfache Bildformate codiert?
Die einfachste Art Bilder zu codieren ist es wohl, deren Farb- beziehungsweise Helligkeitswert für jedes Pixel einzeln als Zahl zu speichern. Auf diese Weise werden die Formate PBM, PGM und PPM codiert. In der ersten Zeile dieser Formate wird angegeben um welches der drei Formate es sich handelt. In der zweiten Spalte geben wir die Dimension unseres Bildes an, also Breite und Höhe. Die anschließenden Zeilen beinhalten nun die Farb-/Helligkeitswerte des Bildes als Zahlen codiert.

Das Portable Bitmap (PBM) Format ist gut für die Erstellung von Schwarz-Weiß-Bildern geeignet. Der Aufbau ist wie folgt:

* Die erste Reihe gibt das Format an. Damit erkannt wird, dass es sich um ein PBM handelt, schreiben wir dort „P1“ hin
* Die zweite Reihe gibt die Dimension unseres Bildes an. Möchten wir also ein Bild mit Breite 5 und Höhe 10 erstellen, dann schreiben wir „5 10“ in diese Reihe.
* Ab der dritten Reihe werden nun die einzelnen Pixel codiert. Beim PBM ist es nur möglich schwarze oder weiße Pixel zu codieren. Weiße Pixel werden mit einer 0 codiert und schwarze Pixel mit einer 1

Das Portable Graymap (PGM) Format ist für die Erstellung von Grauwertbildern geeignet. Der Aufbau ist wie folgt:

* Die erste Reihe gibt das Format an. Damit erkannt wird, dass es sich um ein PGM handelt, schreiben wir dort „P2“ hin
* Die zweite Reihe gibt die Dimension unseres Bildes an. Möchten wir also ein Bild mit Breite 5 und Höhe 10 erstellen, dann schreiben wir „5 10“ in diese Reihe.
* Anders als bei PBMs wird in der dritten Reihe zusätzlich die Information benötigt, wie viele Abstufungen von Grautönen wir zulassen, beziehungsweise was der Maximalwert sein soll, bei dem ein Pixel ganz weiß ist. Meist werden 255 Grautöne zugelassen. Deshalb tragen wir in unserem Beispiel „255“ ein.
* Ab der dritten Reihe werden nun die einzelnen Pixel codiert. Beim PGM ist es nun möglich auch Grauwerte zwischen schwarz (0) und weiß (in diesem Fall 255) zu codieren, indem wir die Zahlen zwischen 0 und unserem definierten Maximalwert wählen

Das Portable Pixmap (PPM) Format ist für die Erstellung von Farbbildern geeignet. Der Aufbau ist wie folgt:

* Die erste Reihe gibt das Format an. Damit erkannt wird, dass es sich um ein PPM handelt, schreiben wir dort „P3“ hin
* Die zweite Reihe gibt die Dimension unseres Bildes an. Möchten wir also ein Bild mit Breite 5 und Höhe 10 erstellen, dann schreiben wir „5 10“ in diese Reihe.
* Wie auch bei PGMs wird in der dritten Reihe zusätzlich die Information benötigt, wie viele Abstufungen von Helligkeitswerten wir zulassen, beziehungsweise was der Maximalwert sein soll. Meist werden 255 Abstufungen zugelassen. Deshalb tragen wir in unserem Beispiel „255“ ein.
* Ab der dritten Reihe werden nun die einzelnen Pixel codiert. Beim PPM ist es nun möglich auch Farbwerte zu codieren. Dies wird ermöglicht, indem wir nun 3 Zahlen pro Pixel angeben. Eine für den Rot, eine für den Grün und eine für den Blaukanal. Wir mischen diese 3 Farbwerte also anteilig, um verschiedene Farbeindrücke zu erzeugen. Möchten wir in unserem Beispiel ein Rotes Pixel erzeugen, so setzten wir die Zahlen „255 0 0“ ein.

# Erstelle ein eigenes Bild
Erstelle nun eigene Bilder mit dem Tool „MyPicCoder“. Nutze den Editor, um dein Bild zu erstellen in einem der drei Vorgestellten Formate. Mögliche Motive wären:

* Der eigene Name
* Ein Haus
* Ein Smiley

??[MyPicCoder](https://shortytwo42.github.io/InteractiveCodingTools/InteractiveCodingTools/HTML/MyPicCoder.html)