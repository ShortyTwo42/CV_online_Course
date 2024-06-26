<!--
author:     Leon Endris, Kevin Weirauch (Template Matching)

email:      leendris@uni-koblenz.de

version:    1.0.0

language:   de

narrator:   Deutsch Female

comment:    Dieser Kurs richtet sich an Schüler\*innen
            der Oberstufe. Aber auch Schüler\*innen der 
            Mittelstufe können sich an ihm probieren.
            Er soll eine Einführung in die Objekt Detektion 
            geben. Dafür wird zunächst der Aufbau von 
            Rastergrafiken beschrieben und anschließend 
            verschiedene Ansätze gegeben, wie Objekt 
            Detektion implementiert werden kann.

link:       ../CSS/main.css 

script:     ../JavaScript/LiaScriptCustom.js

logo:       ../Images/Hidden_Object_Challenge/Hidden_Object_Challenge_Logo.png

-->

# Objekt Detektion
Dieser Kurs soll eine Einführung in das Thema Objekt Detektion geben und dir dabei helfen ein besseres Verständnis zu entwickeln, wie einem Computer das "Sehen" beigebracht werden kann. Einige Inhalte dieses Kurses sind dem **CV-Online-Kurs** entnommen und dienen lediglich dazu ein Grundverständnis für den Aufbau von Pixel- und Rastergrafiken zu geben. Ist ein solches Verständnis bereits vorhanden kann dieser Teil natürlich übersprungen werden. In diesem Fall kannst du zu der Folie **Einführung in die Objekt Detektion** springen.

# Was ist eine Pixel-/Rastergrafik?
Gängige Bildformate wie **JPG** oder **PNG** verwenden ein Raster, um sogenannte **Picture Elements**, kurz **"Pixel"**, anzuordnen. Jeder Pixel enthält eine codierte Farbwertinformation. Die wichtigsten Eigenschaften eines solchen codierten Bildes sind **Höhe**, **Breite** und **Farbtiefe**. Die **Farbtiefe** gibt an, wie viele Abstufungen von Helligkeitswerten möglich sind. Dadurch gibt sie auch an, wie viele **Bits** benötigt werden, um den Farbwert zu codieren. Ein **Bit** ist die kleinste Informationseinheit in der Informatik und nimmt entweder den Wert *"1"* oder *"0"* an. Binärbilder erlauben beispielsweise nur schwarze oder weiße Pixel. Deshalb ist ein **Bit** ausreichend um den Wert eines jeden darin vorkommenden Pixels zu speichern. Bei Grauwertbildern können verschiedene Grautöne zwischen Schwarz und Weiß dargestellt werden. Normalerweise werden 8 **Bit** (= 1 **Byte**) dafür verwendet. Während mit 1 **Bit** nur 2<sup>1</sup>, also 2 Werte gespeichert werden können, kann man mit 8 **Bit** 2<sup>8</sup> ganze 256 Abstufungen erziehlen. Schließlich können Farbbilder durch das anteilige Mischen der Farben Rot, Grün und Blau erzeugt werden, hierbei kann jeder einzelne Farbkanal mit 1 **Byte** codiert werden.

Ein Problem bei Pixel-/Rastergrafiken besteht darin, dass eine verlustfreie Skalierung nicht möglich ist. Wenn wir in ein solches Bild hineinzoomen, werden die einzelnen Pixel immer deutlicher sichtbar.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

> In diesen Abbildungen wird immer weiter in ein Bild hineingezoomt. Die einzelnen Pixel werden immer deutlicher sichtbar
>
> ![butterflyZoom0](../Images/Rastergraphics/blue_butterfly_zoom_0.png) ![butterflyZoom1](../Images/Rastergraphics/blue_butterfly_zoom_1.png) ![butterflyZoom2](../Images/Rastergraphics/blue_butterfly_zoom_2.png) ![butterflyZoom4](../Images/Rastergraphics/blue_butterfly_zoom_3.png)


# Wie werden einfache Bildformate codiert?
> Der Inhalt des folgenden Textes ist auch am Ende dieser Seite in einem Video zusammengefasst. Nutzte die Resource, die dir besser liegt oder lese den Text und schaue zusätzlich das Video um das Gelernte zu festigen.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Portable Bitmap (PBM)
=================================================================================================================================================================================

Gehen wir zunächst von einem simplen Schwarz-Weiß-Bild aus. Wir codieren nun den Wert eines jeden Pixels als Zahl. *Schwarz* wird als *"1"* und *Weiß* wird als *"0"* codiert. Das ist schon fast die Codierung die wir für das lesen einer **Portable Bitmap (PBM)** verwenden. In der ersten Zeile muss nun zusätzlich das Format angeben werden. **PBMs** werden dabei durch das einfügen von *"P1"* in der ersten Zeile gekennzeichnet. Anschließend geben wir die Dimension unseres Bildes in der zweiten Zeile an. Also die Breite und danach die Höhe. Die restlichen Zeilen codieren dann das eigentliche Bild.

> Codierung eines Smileys im PBM Format:
> 
> ![smileyPBM](../Images/Rastergraphics/PBM_Coded.png)


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Portable Graymap (PGM)
=================================================================================================================================================================================

Möchten wir nun Grauwertbilder codieren, also Bilder, die auch Werte zwischen Schwarz und Weiß annehmen können, nutzen wir das **Portable Graymap (PGM)** Format. Die erste Zeile wird von *"P1"* in *"P2"* umgewandelt, um zu kennzeichnen, dass es sich nun um ein **PGM** handelt. In Zeile zwei werden weiterhin die Breite und Höhe unseres Bildes angezeigt. In einer dritten Zeile wird nun zusätzlich die **Farbtiefe** angegeben. Die **Farbtiefe** gibt an, wie viele Abstufungen von Grautönen wir zulassen, beziehungsweise was der Maximalwert sein soll, bei dem ein Pixel ganz weiß ist. Hierbei ist es nun wichtig zu beachten, dass *"0" Schwarz* codiert und die Zahl, die wir als Maximalwert festgelegt haben *Weiß*. In unserem Beispiel geben wir eine **Farbtiefe** von *"2"* an. Das bedeutet, dass *"0" schwarz*, *"1" grau* und *"2" weiß* codiert.

> Codierung eines Smileys im PGM Format:
> 
> ![smileyPGM](../Images/Rastergraphics/Smiley_PGM.png)


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Portable Pixmap (PPM)
=================================================================================================================================================================================

Farbbilder sind mit den vorherigen Formaten nicht darstellbar. Auf einem gängigen Computer Bildschirm wird die Wahrnehmung verschiedener Farben erzielt, indem die drei Farben Rot, Grün und Blau anteilig gemischt werden. Wir sprechen hierbei vom **RGB-Farbraum**. Schwarz, Grau und Weiß werden dargestellt, indem alle drei Grundfarben zu gleichen Anteilen verwendet werden. Nutzen wir nun 3 Zahlen pro Pixel anstatt wie bisher nur einer, können wir alle drei Grundfarben einzeln ansprechen und bestimmen, zu welchem Anteil sie den Farbeindruck des aktuellen Pixels beeinflussen. In die erste Zeile schreiben wir nun *"P3"* um zu kennzeichnen, dass es sich um eine **Portable Pixmap (PPM)** handelt. Zeile zwei beschreibt, wie auch bei den beiden vorherigen Formaten, die Breite und Höhe des codierten Bildes. In Zeile 3 wird, wie auch bei **PGMs**, die **Farbtiefe** angegeben. Diese bezieht sich nun aber auf alle drei Farbkanäle. In unserem Beispiel geben wir als **Farbtiefe** *"1"* an. Das bedeutet, dass eine Grundfarbe entweder gar keinen Anteil am Farbwert des aktuellen Pixels nimmt, wenn sie auf *"0"* steht. Oder, dass sie den Farbwert des aktuellen Pixels beeinflusst, wenn sie auf *"1"* steht. *Rot* würde hierbei als *"1 0 0"* codiert werden, *Grün* als *"0 1 0"* und *Blau* als *"0 0 1"*. Unser Beispiel zeigt wieder den Smiley, aber dieses mal in Farbe.

> Codierung eines Smileys im **PPM** Format:
> 
> ![smileyPPM](../Images/Rastergraphics/PPM_Coded.png)


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

> Dieses Video fasst den Inhalt des vorangegangenen Textes zusammen:
> 
> !?[pixelGraphicVideo](https://youtu.be/-6yhYWyqlCo)

## Übersicht der Formate PBM, PGM und PPM
An dieser Stelle werden die wichtigsten Details nochmals aufgelistet.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Portable Bitmap (PBM) - Übersicht
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Das **Portable Bitmap (PBM)** Format ist gut für die Erstellung von Schwarz-Weiß-Bildern geeignet. Der Aufbau ist wie folgt:

* Die erste Zeile gibt das Format an. Damit erkannt wird, dass es sich um ein **PBM** handelt, tragen wir dort *"P1"* ein.
* Die zweite Zeil gibt die Dimension unseres Bildes an. Möchten wir also ein Bild mit Breite 15 und Höhe 15 erstellen, dann schreiben wir *"15 15"* in diese Zeile.
* Ab der dritten Reihe werden nun die einzelnen Pixel codiert. Beim **PBM** ist es nur möglich *schwarze* oder *weiße* Pixel zu codieren. *Weiße* Pixel werden mit einer *"0"* codiert und *schwarze* Pixel mit einer *"1"*.

> Aufbau des **Portable Bitmap (PBM)** Formats:
> 
> ![pbmOverview](../Images/Rastergraphics/PBM_Overview.png)

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Portable Graymap (PGM) - Übersicht
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Das **Portable Graymap (PGM)** Format ist für die Erstellung von Grauwertbildern geeignet. Der Aufbau ist wie folgt:

* Die erste Zeile gibt das Format an. Damit erkannt wird, dass es sich um ein **PGM** handelt, tragen wir dort *"P2"* ein.
* Die zweite Zeile gibt die Dimension unseres Bildes an. Möchten wir also ein Bild mit Breite 15 und Höhe 15 erstellen, dann schreiben wir *"15 15"* in diese Zeile.
* Anders als bei **PBMs** wird in der dritten Zeile zusätzlich die Information benötigt, wie viele Abstufungen von Grautönen wir zulassen, beziehungsweise was der Maximalwert sein soll, bei dem ein Pixel ganz weiß ist. Meist werden *"255"* Grautöne zugelassen. 
* Ab der vierten Zeile werden nun die einzelnen Pixel codiert. Beim **PGM** ist es nun möglich auch Grauwerte zwischen *schwarz "0"* und *weiß (der vorher definierte Maximalwert)* zu codieren, indem wir die Zahlen zwischen *"0"* und unserem definierten *Maximalwert* wählen.

> Aufbau des **Portable Bitmap (PBM)** Formats:
> 
> ![pgmOverview](../Images/Rastergraphics/PGM_Overview.png)

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Portable Pixmap (PPM) - Übersicht
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Das **Portable Pixmap (PPM)** Format ist für die Erstellung von Farbbildern geeignet. Der Aufbau ist wie folgt:

* Die erste Zeile gibt das Format an. Damit erkannt wird, dass es sich um ein **PPM** handelt, tragen wir dort *"P3"* ein.
* Die zweite Zeile gibt die Dimension unseres Bildes an. Möchten wir also ein Bild mit Breite 15 und Höhe 15 erstellen, dann schreiben wir *"15 15"* in diese Zeile.
* Wie auch bei **PGMs** wird in der dritten Zeile zusätzlich die Information benötigt, wie viele Abstufungen von Helligkeitswerten wir zulassen, beziehungsweise was der Maximalwert sein soll. Meist werden *"255"* Abstufungen zugelassen.
* Ab der vierten Zeile werden nun die einzelnen Pixel codiert. Beim **PPM** ist es nun möglich auch Farbwerte zu codieren. Dies wird ermöglicht, indem wir nun 3 Zahlen pro Pixel angeben. Eine für den Rot-, eine für den Grün- und eine für den Blaukanal. Wir mischen diese 3 Farbwerte also anteilig, um verschiedene Farbeindrücke zu erzeugen. Möchten wir ein Rotes Pixel erzeugen und die Farbtiefe wurde auf *"255"* gesetzt, so setzten wir die Zahlen *"255 0 0"* ein.

> Aufbau des **Portable Bitmap (PBM)** Formats:
> 
> ![ppmOverview](../Images/Rastergraphics/PPM_Overview.png)

# Erstelle ein eigenes Bild
> WICHTIG: Über das <img src="../CSS/fontawesome/downloaded_svgs/circle-info-solid.svg" width="20" height="20"> Icon kannst du dir ein Tutorial zu dem Tool ansehen. Dort werden dir alle wichtigen Funktionen vorgestellt. Auch findet sich auf der folgenden Seite eine Anleitung zu dem Tool.

Erstelle nun eigene Bilder mit dem Tool "MyPicCoder". Die Dokumentation und Anleitung für das Tool befindet sich auf der nächsten Seite, falls etwas unklar ist. Nutze den Editor, um dein Bild in einem der drei Vorgestellten Formate zu erstellen. Sei kreativ und spiel ein wenig mit dem Tool rum. Mögliche Motive wären:

* Der eigene Name
* Ein Baum
* Ein einfaches Emoji

Du kannst auch über <img src="../CSS/fontawesome/downloaded_svgs/file-arrow-up-solid.svg" width="20" height="20"> ein Beispielbild auswählen und dieses bearbeiten und anpassen.

??[MyPicCoder](https://shortytwo42.github.io/InteractiveCodingTools/InteractiveCodingTools/HTML/MyPicCoder.html)

## MyPicCoder Anleitung
<div class="instruction">
    <p>
        Das Tool **"MyPicCoder"** ist in zwei Abschnitte aufgeteilt. Links der Editor und rechts die Vorschau
        <img src="../Images/Tools/MyPicCoder/MyPicCoder_overview.png">
    </p>
    <p>
        Im Header befinden sich alle wichtigen Funktionen
        <img src="../Images/Tools/MyPicCoder/MyPicCoder_header.png">
    </p>
    <p>
        Links im Header kann zunächst der Dateiname frei gewählt werden. 
        <p><img src="../Images/Tools/MyPicCoder/MyPicCoder_header_left.png"></p>
        Die Icons bedeuten folgendes von links nach rechts:
        <ul>
            <li><img src="../CSS/fontawesome/downloaded_svgs/floppy-disk-solid.svg" width="20" height="20"> Die Diskette, speichert das aktuelle Bild mit dem aktuell ausgewählten Dateinamen.</li>
            <li><img src="../CSS/fontawesome/downloaded_svgs/folder-open-solid.svg" width="20" height="20"> Der Ordner kann verwendet werden, um eigene Bilder hochzuladen und diese zu bearbeiten. Hierbei werden nur Dateien der Art **"PBM"**, **"PGM"**, **"PPM"** und "svg" angenommen.</li>
            <li><img src="../CSS/fontawesome/downloaded_svgs/file-arrow-up-solid.svg" width="20" height="20"> Die Datei mit Pfeil, öffnet das Beispielbilder Menü (zu diesem kommen wir später).</li>
            <li><img src="../CSS/fontawesome/downloaded_svgs/arrow-right-solid.svg" width="20" height="20"> Der Pfeil, der nach rechts zeigt, versteckt die Vorschau und gibt dem Editor, den gesamten Platz.</li>
            <li><img src="../CSS/fontawesome/downloaded_svgs/arrows-left-right-solid.svg" width="20" height="20"> Der Pfeil, der in beide Richtungen zeigt, sorgt dafür, dass Editor und Vorschau, zu gleichen Anteilen gezeigt werden</li>
            <li><img src="../CSS/fontawesome/downloaded_svgs/arrow-left-solid.svg" width="20" height="20"> Der Pfeil, der nach links zeigt, versteckt den Editor und gibt der Vorschau, den gesamten Platz.</li>
        </ul>
    </p>
    <p>
        Rechts im Header sehen wir folgende Icons.
        <p><img src="../Images/Tools/MyPicCoder/MyPicCoder_header_right.png"></p>
        Die Icons bedeuten folgendes von links nach rechts:
        <ul>
            <li><img src="../CSS/fontawesome/downloaded_svgs/circle-info-solid.svg" width="20" height="20"> Über das Info-Icon können Tutorials aufgerufen werden, die einen durch das Tool leiten.</li>
            <li><img src="../CSS/fontawesome/downloaded_svgs/slider.svg" width="20" height="20"> Der Slider ist zu Beginn angeschaltet. Das bedeutet, dass die Live-Vorschau aktiviert ist. Änderungen im Editor werden also in Echtzeit auch in der Vorschau gezeigt. Die Live-Vorschau kann jederzeit an und ausgeschaltet werden.</li>
            <li><img src="../CSS/fontawesome/downloaded_svgs/code-solid.svg" width="20" height="20"> Ist die Live-Vorschau ausgeschaltet, kann das Code Symbol geklickt werden, um die Vorschau manuell zu aktualisieren.</li>
        </ul>
    </p>
    <p>
        Nun zum Beispielbilder Menü. In diesem kann zunächst ausgewählt werden, von welchem Bildtyp das Beispiel sein soll. Dabei wird zwischen **"PBM"**, **"PGM"**, **"PPM"** und "svg" unterschieden. Für jeden Bildtyp gibt es drei Beispiele, die ausgewählt werden können. Durch Klicken auf das "Datei mit Pfeil"-Icon in der unteren rechten Ecke des Menüs, wird das ausgewählte Beispiel hochgeladen und kann bearbeitet werden.
        <img src="../Images/Tools/MyPicCoder/MyPicCoder_example_pictures.png">
    </p>
</div>

# Programmierübung am Beispiel von Pixel-/Rastergrafiken
> Der Inhalt des folgenden Textes ist auch am Ende dieser Seite in einem Video zusammengefasst. Nutzte die Resource, die dir besser liegt oder lese den Text und schaue zusätzlich das Video um das Gelernte zu festigen.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Die PutPixel-Funktion
=================================================================================================================================================================================

Wie könnte wir die erstellung einer Pixel-/Rastergrafik zumindest teilweise automatisieren? Stellen wir uns dafür zunächst das Raster eines Bildes als Koordinatensystem vor, bei dem wir die einzelnen Pixel nur mit natürlichen Zahlen (0, 1, 2, ...) ansprechen können. Das Koordinatensystem bei Bildern startet in der oberen linken Ecke. Zudem startet es nicht von 1, sondern in der Informatik zählen wir von 0 aufsteigend. Möchten wir also das obere linke Pixel eines Bildes ansprechen, so geben wir die Koordinaten *"(0, 0)"* an. Es gibt nun eine Funktion **"putPixel()"**. An diese Funktion übergeben wir die Koordinate, die wir einfärben wollen. Das würde folgendermaßen Aussehen:

> Klicke auf die einzelnen Bilder um sie im Vollbild zu betrachten. Auf jedem der Bilder ist links der Editor zu sehen, in dem wir die Funktion aufrufen. Rechts sehen wir das Bildkoordinatensystem, nachdem die Funktion ausgeführt wurde. Im ersten Bild wird die Funktion nur mit den Koordinaten aufgerufen. Das führt dazu, dass das aufgerufene Pixel schwarz gefärbt wird. Im zweiten Bild wird die Funktion zusätzlich mit einer Zahl zwischen *"0" (schwarz)* und *"255" (weiß)* aufgerufen, um das Pixel in einem gewünschten Grauwert zu färben. Und im dritten Bild wird die Funktion mit drei Zahlen zwischen *"0"* und *"255"* aufgerufen, um die Färbung in verschiedenen Farben zu ermöglichen.
> 
> ![putPixelBlack](../Images/Rastergraphics/PutPixel_Black.png) ![putPixelGray](../Images/Rastergraphics/PutPixel_Gray.png) ![putPixelRed](../Images/Rastergraphics/PutPixel_Red.png)

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Die For-Schleife
=================================================================================================================================================================================

Möchten wir nun die erste Reihe unseres Bildes schwarz färben, könnten wir das tun, indem wir die **"putPixel()"** Funktion mehrfach aufrufen für jedes Pixel der ersten Reihe. Das können wir allerdings auch abkürzen, indem wir eine **"Schleife"** benutzen. Wir nutzen genauer gesagt eine sogenannte **"For-Schleife"**. Diese ist wie folgt aufgebaut:

* Zunächst wird eine Laufvariable definiert. Dieser Laufvariable weisen wir einen Startwert zu. In **"JavaScript"**, der Programmiersprache, die wir in diesem Kurs verwenden, würden wir das wie folgt erzielen: **let x = 0;**. Wir wählen **x = 0**, weil wir ja die gesamte erste Reihe schwarz färben möchten und deshalb auch bei *"0"* starten.
* Dann definieren wir eine Abbruchbedingung. Solange diese Bedingung erfüllt ist, wird die Schleife wiederholt. Beispielsweise möchten wir, dass der Code innerhalb der Schleife so lange wiederholt wird, bis unsere Laufvariable nicht mehr kleiner als die Breite unseres Bildes ist. Dies würden wir schreiben als: **x < picture_width;**. Der Wert für **picture_width** wird hierbei als gegeben betrachtet. Ist unser Bild also *"10"* Pixel breit würde **picture_width** auch den Wert *"10"* annehmen.
* Zuletzt müssen wir definieren, wie die Laufvariable nach jeder Durchführung der Schleife angepasst wird. In unserem Beispiel möchten wir die Variable immer um *"1"* erhöhen, um den nächten Pixel zu erreichen. Dies kann in **JavaScript** entweder als **x = x + 1**, **x += 1** oder, wie es am üblichsten ist, als **x++** realisiert werden.

> Ein Beispiel einer kompletten **"For-Schleife"** sieht also wie folgt aus: 
> 
> ![forLoop](../Images/Rastergraphics/For_Loop.png)


Möchten wir nun nicht nur die erste Reihe verfärben, so können wir die Schleife auch verschachteln. Wir umschließen unsere erste **"For-Schleife"** mit einer weiteren **"For-Schleife"**, die wiederum eine andere Laufvariable verändert. Diese läuft dieses Mal von *"0"* so lange durch, bis die Laufvariable nicht mehr kleiner als die Höhe des Bildes ist. Dabei wird der Wert der Höhe des Bildes in **"picture_height"** gespeichert. Verschachteln wir unsere **"For-Schleifen"** auf diese Weise, so können wir jedes Pixel unseres Bildes ansprechen.

> Mittels eines verschachtelten **"For-Loops"** können wir das gesamte Bild schwarz färben.
> 
> ![doubleForLoop](../Images/Rastergraphics/Double_For_Loop.png)

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Die If-Abfrage
=================================================================================================================================================================================

Zuletzt können wir noch eine **"Bedingung"** einbauen, mit der wir bestimmen, wann unsere Funktion ausgeführt werden soll. Dies erziehlen wir mithilfe einer **"If-Abfrage"**. Diese ist wie relativ simpel aufgebaut. Wir schreiben **if**, öffnen daraufhin runde Klammern **"()"**, und innerhalb dieser Klammern definieren wir unsere Bedingung. Alles was danach innerhalb der geschweiften Klammern **"{}"** steht, wird nur ausgeführt, wenn die Bedingung erfüllt ist. Mögliche Bedingungen wären:

* **if(x == y)** --> wir nutzen **"=="** um abzufragen, ob zwei Werte gleich sind (nicht mit **"="** verwechseln. Damit wird ein Wert zugewiesen)
* **if(x < y)**
* **if(x + y == 1)**
* ...

> Um in unserem Beispiel also nicht einfach das gesamte Bild schwarz zu färben, können wir zusätzlich eine Bedingung für die **"putPixel()"** Funktion definieren.  Die Funktion soll nur aufgerufen werden, wenn x und y gleich sind.
> 
> ![doubleForLoopIf](../Images/Rastergraphics/Double_For_Loop_If.png)

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

> Dieses Video fasst den Inhalt des vorangegangenen Textes zusammen:
> 
> !?[putPixelVideo](https://youtu.be/SJvE3u-DgiQ)


## Programmierbeispiel: PutPixel
> WICHTIG: Über das <img src="../CSS/fontawesome/downloaded_svgs/circle-info-solid.svg" width="20" height="20"> Icon kannst du dir ein Tutorial zu dem Tool ansehen. Dort werden dir alle wichtigen Funktionen vorgestellt. Auch findet sich auf der folgenden Seite eine Anleitung zu dem Tool.

Versuche es nun selbst mithilfe des PutPixel Tools. Die Dokumentation und Anleitung für das Tool befindet sich auf der nächsten Seite, falls etwas unklar ist. 
Mögliche Aufgaben wären:

* Färbe nur die 3te Reihe schwarz
* Färbe ein Pixel nur, wenn x + y ein Bestimmtes Ergebnis erfüllen
* Änder die Breite und Höhe des Bildes auf *"256"* und gehe mit einer verschachtelten Schleife über jedes Pixel. Setze nun Beispielsweise den x-Wert als Rot und den y-Wert als Grün ein. (Erinnerung: **"putPixel(x, y, [0, 0, 0])"** würde das Pixel schwarz färben)

??[PutPixel](https://shortytwo42.github.io/InteractiveCodingTools/InteractiveCodingTools/HTML/PutPixel.html)

### PutPixel Anleitung
<div class="instruction">
    <p>
        Das Tool **"PutPixel"** ist in zwei Abschnitte aufgeteilt. Links der Code Editor und rechts die Vorschau
        <img src="../Images/Tools/PutPixel/PutPixel_overview.png">
    </p>
    <p>
        Im Header kann zunächst die Dimension, also Breite und Höhe, des Bildes ausgewählt werden
        <img src="../Images/Tools/PutPixel/PutPixel_header.png">
    </p>
    <p>
        Links im Header sehen wir folgende Icons.
        <p><img src="../Images/Tools/PutPixel/PutPixel_header_left.png"></p>
        Die Icons bedeuten folgendes von links nach rechts:
        <ul>
            <li><img src="../CSS/fontawesome/downloaded_svgs/arrow-rotate-right-solid.svg" width="20" height="20"> Klickt man auf diesen "Reload" Button, wird ein simpler Beispielcode geladen, um einen Ansatzpunkt zur Verfügung zu stellen, der weiter verändert werden kann.</li>
            <li><img src="../CSS/fontawesome/downloaded_svgs/arrow-right-solid.svg" width="20" height="20"> Der Pfeil, der nach rechts zeigt, versteckt die Vorschau und gibt dem Editor, den gesamten Platz.</li>
            <li><img src="../CSS/fontawesome/downloaded_svgs/arrows-left-right-solid.svg" width="20" height="20"> Der Pfeil, der in beide Richtungen zeigt, sorgt dafür, dass Editor und Vorschau, zu gleichen Anteilen gezeigt werden</li>
            <li><img src="../CSS/fontawesome/downloaded_svgs/arrow-left-solid.svg" width="20" height="20"> Der Pfeil, der nach links zeigt, versteckt den Editor und gibt der Vorschau, den gesamten Platz.</li>
        </ul> 
    </p>
    <p>
        Rechts im Header sehen wir das Code Icon.
        <p><img src="../Images/Tools/PutPixel/PutPixel_header_right.png"></p>
        <ul>
            <li><img src="../CSS/fontawesome/downloaded_svgs/circle-info-solid.svg" width="20" height="20"> Über das Info-Icon können Tutorials aufgerufen werden, die einen durch das Tool leiten.</li>
            <li><img src="../CSS/fontawesome/downloaded_svgs/code-solid.svg" width="20" height="20"> Wird dieses Angeklickt, wird das Programm aus dem Editor zunächst überprüft (ob dieses auch nur zugelassene Funktionen beinhaltet), und anschließend ausgeführt.</li>
       </ul> 
    </p>
</div>

# Einführung in die Objekt Detektion
Im Sommer 1966 organisierte Professor Seymour Papert vom MIT das *"Summer Vision Project"*. Ziel dieses Projekts war, innerhalb weniger Sommermonate ein System zu entwickeln, das vorab festgelegte Objekte in komplexen Szenen detektieren und Labeln konnte. Dieses Ziel erwies sich jedoch als zu ehrgeizig und beschäftigt Forschende bis heute. Viele betrachten dieses Projekt als den Ursprung der **Computer Vision**, der Wissenschaft, dem Computer das *"Sehen"* beizubringen.

Wie du bereits gelernt hast, werden virtuelle Bilder auf Computern durch einzelne Pixel repräsentiert. Daher gestaltet es sich für einen Computer nicht einfach, den Inhalt eines Bildes zu analysieren, wenn das Bild zunächst nur aus abstrakten Zahlenwerten besteht. Das Problem besteht darin, dass der Computer die einzelnen Pixelwerte zwar zu einem Bild zusammensetzen kann, aber gleichzeitig nicht *"weiß"*, was das Bild darstellt. Welche Ansätze gibt es also, damit ein Computer lernt, Objekte zu *"erkennen"*?

## Künstliche Intelligenz
Insbesondere im Bereich der **Computer Vision** ist **künstliche Intelligenz** ein häufig verwendetes Werkzeug. Genauer gesagt kommen hier sogenannte **Faltungsnetze** (**Convolutional Neural Networks** oder kurz **CNNs**) zum Einsatz. Die Grundlagen für diese Technologie wurden 1979 von Kunihiko Fukushima geschaffen und wurden seitdem kontinuierlich weiterentwickelt. **CNNs** sind spezielle künstliche neuronale Netze, die versuchen, bestimmte Vorgänge im menschlichen visuellen Kortex zu simulieren.

**CNNs** bestehen dabei aus einer **Eingabeschicht**, einer **Ausgabeschicht** und verschiedenen **versteckten Schichten**. Es wird dabei zwischen *"Faltungsschichten"* (**Convolutional Layern**) und *"Vereinigungsschichten"* (**Pooling Layern**) unterschieden. In den *"Faltungsschichten"* werden Filter auf die Eingabe angewendet, wobei das Netzwerk selbst lernt, wie diese Filter funktionieren. Die *"Vereinigungsschichten"* vereinfachen die Inputs indem überflüssige Informationen verworfen werden.

> Schematische Darstellung eines typischen **CNNs** (Quelle: https://open-instruction.com/dl-algorithms/convolutional-neural-network/ [zuletzt besucht: 01.02.2024])
>
> ![cnn](../Images/Hidden_Object_Challenge/CNN.png)

Obwohl die Ergebnisse, die mit **CNNs** erzielt werden, beeindruckend sind, gibt es auch Nachteile. Einer der größten Nachteile besteht darin, dass eine große Menge an Daten benötigt wird, um ein solches Netzwerk zu trainieren. Eine umfangreiche Datenmenge mit den entsprechenden erwarteten Ergebnissen muss dem Netzwerk zugeführt werden, wobei die Daten oft aufwendig aufbereitet werden müssen. Dem Netzwerk wird so gesehen eine große Anzahl an Beispielen an Eingaben und Erwarteten Ergebnissen vorgegeben und es wird gehofft, dass dadurch gute Ergebnisse erzielt werden. Wie genau das **CNN** letzten Endes zu den Ergebnissen gelangt ist selbst für die Entwickler nicht immer nachvollziehbar. Das Training des Netzwerks benötigt zudem einen erheblichen Rechenaufwand. Daher erfordern **CNNs** häufig erhebliche Ressourcen, wie aufbereitete Trainingsdaten und Rechenkapazität. Im optimalen Fall sind diese Ressourcen bereits vorhanden, damit sich die Forschenden auf das Wesentliche konzentrieren können.

## Wie funktioniert Template Matching?
**Template Matching** ist eine Technik, mit der versucht wird ein vorgegebenes **Template** in einem Suchbild zu finden. Ein **Template** ist dabei ein kleineres Bild, welches im Suchbild gefunden werden soll, falls vorhanden. Hierbei wird immer angenommen, dass das **Template** in exakt der vorliegenden Form, also ohne **Rotation**, **Spiegelungen** und in gleicher **Größe**, im Suchbild enthalten ist. 

Beim **Template Matching** wird das **Template** Pixel für Pixel über das Suchbild bewegt und an jeder Stelle wird die Ähnlichkeit zwischen dem **Template** und dem Ausschnitt aus dem Suchbild bestimmen. Die Stelle an der die Ähnlichkeit am höchsten ist, ist die gesuchte Stelle und dort wird das **Template** erkannt.

> Ein **Template** und das dazu gehörige Suchbild könnten folgendermaßen aussehen:
>
> ![template](../Images/Hidden_Object_Challenge/Logo.png) ![searchExample](../Images/Hidden_Object_Challenge/Building_Example.png)

Die Ähnlichkeit zwischen **Template** und Suchposition im Suchbild lässt sich mit verschiedenen Formeln berechnen. Einige davon kannst du zusammen mit Illustrationen unter diesem Link finden: [Template Matching](https://docs.fab-image.com/studio/machine_vision_guide/TemplateMatching.html)

Diese Methode zur **Objekt Detektion** hat jedoch ihre Grenzen. So kann sie Abwandlungen des **Templates** nur schlecht finden. Zum Beispiel ist es bereits ein Problem eine **skalierte** oder eine **rotierte** Version des **Templates** zu finden. Um dies zu lösen gibt es verschiedene Ansätze. Einige davon werden auch in dem vorangegangenen Link besprochen.

Alternative Methoden verwenden **Keypoint Matching**. Mehr über **Template Matching** und auch **Keypoint Matching** findest du hier: [Verschiedene Matching Methoden](https://www.headspin.io/docs/image-matching-methods-explained)

> Wenn du Videos bevorzugst findest du zum Thema **Template Matching** hier ein instruktives Video:
> 
> !?[templateMatchingVideo](https://www.youtube.com/watch?v=WDQmh_fHTUg)

Eine Methode, die auf **Keypoint Matching** beruht wird in den folgenden Abschnitten diskutiert und näher erläutert.

## Wie funktioniert SIFT?
**SIFT** steht für **Scale-Invariant Feature Transform**. Der Algorithmus findet sogenannte **Keypoints**, die zu einem gewissen Grad invariant gegenüber **Translation** ("egal wo im Bild"), **Skalierung** ("egal wie groß im Bild") und **Rotation** ("egal wie orientiert im Bild") sind. Weiterhin besteht eine gewisse Robustheit gegenüber Änderungen in der Beleuchtung, Bildrauschen und schwachen geometrischen Deformationen wie beispielsweise Scherungen. Um dies zu ermöglichen wird jeder **Keypoint** mit einem zusätzlichen Deskriptor versehen, der weitere Informationen über den **Keypoint** inne hält.

Der Algorithmus funktioniert dabei wie folgt: Zuerst bauen wir den **Scale Space** auf. Dafür nehmen wir das Eingangsbild und vergrößern es *(Up-Sampling)* durch Verdoppelung aller Pixel. Dadurch entsteht ein Bild, das doppelt so groß wie das Original ist. Anschließend wenden wir einen **Gauß-Filter** mit verschiedenen Stärken auf dieses vergrößerte Bild an, um es in verschiedenen Stufen zu glätten. Eines der geglätteten Bilder wird dann verkleinert *(Down-Sampling)*, wodurch Breite und Höhe halbiert werden. Diesen Prozess wiederholen wir mehrmals, bis es wenig Sinn ergibt, das Bild noch weiter zu verkleinern. Jede dieser Ebenen im **Scale Space** wird als **Oktave** bezeichnet. 

> Beispielhafter **Scale Space** (Bild wurde erstellt mithilfe dieser Interaktiven Webseite: http://weitz.de/sift/ [zuletzt besucht: 30.01.2024])
> 
> ![scaleSpace](../Images/Hidden_Object_Challenge/Scale_Space.png)

Dadurch sollen Invariante Merkmale besser gefunden werden. Die Idee ist, dass durch das **Gauß-Filtern** zum einen gegen Rauschen vorgegangen wird, aber auch leichte Bewegungen berücksichtigt werden können. Das *Down-Samplen* soll dafür sorgen, dass es gegenüber der **Skalierung** invariant ist. Also egal wie groß das Objekt in einem Bild auftaucht.

Anschließend wird der **Scale Space** genutzt um sogenannte **Difference of Gaussians (DoGs)** zu generieren. Dafür werden die benachbarten Bilder innerhalb einer **Oktave** voneinander abgezogen. Dadurch werden Teile des Bildes mit wenigen bis keine Veränderungen in den Grauwerten gleich eingefärbt, während stärkere Grauübergänge hervorgehoben werden. 

> Schematische Darstellung, wie die **DoGs** generiert werden (Quelle: https://medium.com/@deepanshut041/introduction-to-sift-scale-invariant-feature-transform-65d7f3a72d40 [zuletzt besucht: 27.01.2024])
>
> ![dogVis](../Images/Hidden_Object_Challenge/DoG_Visualization.png)

> Visualisierung der **DoGs** (Quelle: http://weitz.de/sift/ [zuletzt besucht: 30.01.2024])
>
> ![dog](../Images/Hidden_Object_Challenge/DoG.png)

Nun wird auf diesen Bildern nach Extrema gesucht. Also Pixelwerte, die sich stark von Ihren Nachbarwerten unterscheiden. Das Besondere ist, dass nicht nur die Nachbarn aus demselben Bild betrachtet werden, sondern auch die Nachbarn aus der darüber und darunter liegenden Weichzeichnungsebene. Ist der betrachtete Pixelwert größer oder kleiner als alle 26 Nachbarn, dann ist er ein lokales Extremum und wird ein **Keypoint** Kandidat.

> Die Nachbarschaftsbetrachtung erfolgt somit in einer Art 3-dimensionalen Ansicht:
> 
> ![siftNeighbourhood](../Images/Hidden_Object_Challenge/SIFT_Neighbourhood.png)

Einige Kandidaten werden aus verschiedenen Gründen wieder verworfen. Ein Grund kann sein, dass der Punkt zwar ein Extremum ist, aber nicht über einen vorher festgelegten Schwellwert liegt. Diesen Schwellwert kann man selbst festlegen und er dient dazu gegen Bildrauschen vorzugehen. Ist der Unterschied also zu gering und liegt unter dem Schwellwert, wird davon ausgegangen, dass der **Keypoint** Kandidat durch Rauschen zustande kommt. Außerdem werden auch häufig Punkte, die auf Kanten liegen verworfen, weil diese theoretisch hin und her geschoben werden könnten und deshalb nicht gut lokalisiert werden können.

> Hier sind einige Kandidaten gelb eingefärbt, die aus den vorher genannten Gründen wieder verworfen werden. (Quelle: http://weitz.de/sift/ [zuletzt besucht: 30.01.2024])
>
> ![keypointDetection](../Images/Hidden_Object_Challenge/Keypoint_Detection.png)

Das Besondere an den **Keypoints** im **Scale Space** ist, dass diese dabei **Subpixel** genau sind. Das bedeutet, dass die **Keypoints** auch zwischen Pixeln liegen können. Wie genau dies funktioniert würde an dieser Stelle allerdings zu weit gehen. 

Als nächstes werden den gefundenen **Keypoints** besondere **Deskriptoren** zugeordnet, die als eine Art Fingerabdruck dienen. Dafür wird erneut über die **Keypoints** iteriert und deren Nachbarpunkte betrachtet. Zu jedem dieser Nachbarpunkte wird der **Gradient** (also die Differenz der Pixelwerte) berechnet und anschließend betrachtet, ob es dort eine dominante Richtung gibt. Also eine Richtung, in die die Grauwerte entweder besonders stark abfallen oder ansteigen. Ist es nicht möglich eine dominante Richtung zu erkennen, wird der **Keypoint** verworfen. Dadurch, dass jedem Punkt nun auch eine Orientierung zu Grunde liegt ist der **Keypoint** invariant gegenüber **Rotation**.

> Hier ist visualisiert, wie man sich die Orientierungsberechnung vorstellen kann. (Quelle: http://weitz.de/sift/ [zuletzt besucht: 30.01.2024])
>
> ![siftOrientation](../Images/Hidden_Object_Challenge/SIFT_Orientation.png)

Zuletzt wird erneut die Nachbarschaft des Punktes betrachtet, dieses Mal allerdings in Relation zu der dominanten Richtung. Auch hier werden die **Gradienten** betrachtet und in einem **Histogramm** gespeichert.

> Ein solches **Histogram** kann man sich folgendermaßen vorstellen. (Quelle: http://weitz.de/sift/ [zuletzt besucht: 30.01.2024])
>
> ![siftHistogram](../Images/Hidden_Object_Challenge/SIFT_Histogram.png)

Raus bekommen wir also eine Liste mit **Keypoints** mit folgenden Informationen:

* Die Koordinate des Punktes (**Subpixel** genau)
* In welcher **Oktave** der Punkt im **Scale Space** liegt
* In welchem unschärfegrad der Punkt liegt
* Die Orientierung des Punktes
* Die berechneten **Histogramme**, die in Relation zur Orientierung des Punktes gebaut wurden

### Objekt Detektion mit SIFT
Was bringt uns das nun, wenn wir Objekte in anderen Bildern wieder finden möchten? Zunächst trainieren wir unseren eigenen Objekt-Detektions-Algorithmus. Dafür nehmen wir ein Bild, das als unsere *Ground Truth* dient. Also einfach ein Referenzbild, in dem wir unsere ursprünglichen Merkmale entdecken wollen. Das "Training" erfolgt dadurch, dass wir **SIFT** auf unsere *Ground Truth* anwenden. Dadurch erhalten wir unsere Liste an **Keypoints** mit dazugehörigen **Deskriptoren**.

> Visualisiert man die gefundenen **Keypoints** kann dies folgendermaßen aussehen. Der Durchmesser ist hierbei ein Indikator dafür, wie "gut" der **Keypoint** ist. Dies wäre in unserem Fall unsere *Ground Truth*.
>
> ![siftKeypoints](../Images/Hidden_Object_Challenge/SIFT_Keypoints.png)

Nun wenden wir **SIFT** auch auf die Bilder an, in denen wir nach unserem Objekt suchen. Durch Vergleich der **Deskriptoren** können wir die verschiedenen **Keypoints** miteinander *matchen*. Das können wir auf verschiedene Art und Weise machen. Die einfachste Art und Weise wäre über einen *Brute Force Algorithmus*. Alle **Keypoints** werden miteinander verglichen und die jeweils ähnlichsten gelten als **Keypoint**-Paar. Haben wir genug "gute" *Matches* gefunden gilt auch das Objekt als gefunden.

> Hier ist ein Beispiel, in dem die jeweilig gematchten **Keypoints** miteinander verbunden wurden
>
> ![matches](../Images/Hidden_Object_Challenge/Matches.png)

Zusätzlich könnte man eine Art **Bounding Box** oder **Bounding Polygon** um das gefundene Objekt legen. Dafür wird dieses **Polygon** in Koordinaten der *Ground Truth* angegeben. Hat man genügend zusammenpassende **Keypoints** gefunden kann man mithilfe einer sogenannten **Homographie** die Koordinaten der Punkte des **Polygons** in der *Ground Truth* auf das Bild *mappen*, in dem das Objekt gefunden wurde.

> Hier sind **Bounding Box** und **Bounding Polygon** einmal im Referenzbild eingezeichnet.
> 
> ![boundingBox](../Images/Hidden_Object_Challenge/Bounding_Box.jpg) ![boundingPolygon](../Images/Hidden_Object_Challenge/Bounding_Polygon.jpg) 

> Wurden genug *Matches* gefunden ist es möglich eine **Homographie** zu berechnen mit der die Koordinaten der **Bounding Box** beziehungsweise des **Bounding Polygons** auf das neue Bild *gemappt* werden können.
> 
> ![boundingBox](../Images/Hidden_Object_Challenge/Found_Bounding_Box.jpg) ![boundingPolygon](../Images/Hidden_Object_Challenge/Found_Bounding_Polygon.jpg) 

Mithilfe von Bibliotheken wie **OpenCV** können die meisten Schritte der Objekt **Detektion** mit **SIFT** recht einfach implementiert werden. Beispielsweise können die **Keypoints** und **Deskriptoren** mit nur einem einzigen Funktionsaufruf gefunden werden. Auch **Homographien** können sich dadurch auf einfache Art und Weise berechnen lassen, sodass diese Schritte nicht selbst implementiert werden müssen. 