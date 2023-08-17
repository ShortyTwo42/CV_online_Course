<!--
author:     Leon Endris

email:      leendris@uni-koblenz.de

version:    0.1.0

language:   de

narrator:   Deutsch Female

comment:    Dies ist die dritte Lektion des
            CV Online Kurses. Funktionsweise
            und Nutzen von Filtern wird hier 
            näher erläutert.

link:       ../CSS/Main.css 

script:     ../JavaScript/Filter.js

-->

# Lektion 3: Filter
Willkommen zur dritte Lektion des CV Online Kurses. In dieser Lektion wird dir die Funktionsweise verschiedener Filter vorgestellt. Am Ende dieser Lektion sollst du verstehen, wie ein Median-, Mittelwert- und Gauß-Filter funktionieren und was deren Einsatzbereiche sind.

# Wiederholungsquiz: "Vektorgrafik"
In diesem kleinen Wiederholungsquiz kannst du deinen eigenen Wissensstand zum Thema "Vektorgrafiken" nochmals überprüfen. Auch falsche Antworten können dir helfen das gelernte zu festigen, indem du die Erklärung für die korrekte Antwort nochmal verinnerlichst. Hast du eine falsche Antwort angegeben und möchtest es nicht nochmals versuchen, kannst du dir über das Häkchen die Lösung anzeigen lassen.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Quiz
=================================================================================================================================================================================

1. Welche Informationen braucht es, um einen Kreis in einem SVG zu speichern?
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<!-- data-randomize -->
- [[X]] Koordinaten des Mittelpunktes
- [[ ]] Umfang des Kreises
- [[ ]] Durchmesser des Kreises
- [[X]] Radius des Kreises
*********************************************************************************************************************************************************************************
Um einen Kreis in einem SVG zu speichern müssen wir dessen Radius und die Koordinaten des Mittelpunktes kennen. Das Koordinatensystem wird für das SVG selbst definiert und wird nicht extra für den Kreis neu definiert. Auch können weitere Informationen über den Kreis gespeichert werden, wie Farbe oder die Breite des Umrisses. Diese Informationen sind aber nicht zwingend notwendig.
*********************************************************************************************************************************************************************************

2. Welche Aussagen über SVGs treffen zu?
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<!-- data-randomize -->
- [[ ]] In einem SVG kann immer nur eine einzelne geometrische Form gespeichert werden
- [[X]] Mit SVGs ist eine verlustfreie Skalierung möglich
- [[ ]] Das SVG-Format sind besonders gut für Fotos geeignet
- [[X]] Vor der Darstellung auf einem Bildschirm muss ein SVG in eine Rastergrafik umgewandelt werden
*********************************************************************************************************************************************************************************
SVGs können eine vielzahl an verschiedenen geometrischen Formen speichern und diese können beliebig miteinander zu neuen Bildern kombiniert werden. Zudem ist es, durch das Speichern geometrischer Informationen möglich, ein SVG ohne Qulaitätsverlust in beliebigen Größen darzustellen. Dafür muss ein SVG jedoch vor jeder Darstellung rasterisiert werden. Also aus der Vektorgrafik wird eine Rastergrafik in der gewünschten Größe erstellt. Für Fotos eignen sich SVGs nicht. Der Einsatzbereich von SVGs liegt eher bei Logos oder auch Schriftarten für den Computer.
*********************************************************************************************************************************************************************************

3. Wie nennt man das Verfahren, mit dem der Treppen(stufen)effekt, der bei der Rasterisierung von Vektorgrafiken entstehen kann, eingedämmt werden soll?
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
[[anti-aliasing]]
<script>
    const input = "@input".trim().toLowerCase();
    input == "anti-aliasing" || input == "antialiasing" || input == "anti aliasing";
</script>
*********************************************************************************************************************************************************************************
Um gegen den Treppen(stufen)effekt vorzugehen nutzen wir das sogenannte **Anti-Aliasing**. Anstatt ein Pixel entweder vollständig oder gar nicht in der Farbe eines Objektes zu färben, erhält ein Pixel eine Mischfarbe basierend auf den darin enthaltenen Objekten. Je mehr Fläche des Pixels ein Objekt dabei einnimmt desto größer ist der Farbanteil, den es zu dem Pixel beisteuert.
*********************************************************************************************************************************************************************************

# Was sind Filter
Häufig werden Filter genutzt, um ungewollten Effekten bei aufgenommenen Bildern entgegenzuwirken oder bestimmte Informationen aus Bildern besonders hervorzuheben (beispielsweise Kanten). Einer dieser ungewollten Effekte ist beispielsweise Bildrauschen. Auf dieses Phänomen gehen wir im folgenden Abschnitt genauer ein.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Bildrauschen
=================================================================================================================================================================================
Sensoren sind nie perfekt. So auch die Sensoren in den Kameras, mit denen wir Bilder aufnehmen. Dadurch kann es zu Ungenauigkeiten kommen, wenn das einfallende Licht in einen Pixelwert umgewandelt werden soll. Diese Ungenauigkeiten führen zu einem sogenannten **verrauschten Bild** und können von Kamera zu Kamera unterschiedlich stark ausfallen. Diese Art des Rauschens nennen wir auch **Gauß-Rauschen**. Eine andere Art von Rauschen ist das sogenannte **Salz-und-Pfeffer-Rauschen**. Dabei sind vereinzelte Pixel entweder annähernd schwarz oder weiß. Dieser Effekt kann auftreten, wenn die einzelnen Sensoren nicht mehr richtig funktionieren und entweder den Wert des Pixels immer als komplett beleuchtet (weiß) oder als unbeleuchtet (schwarz) auswerten.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Filter
=================================================================================================================================================================================
Kompliziert ausgedrückt transformiert ein Filter den Wert jedes Pixels in einem Eingabebild in einen neuen Pixelwert für ein Ausgabebild, nachdem eine mathematische Funktion, Formel oder Algorithmus darauf angewandt wurde. In einfacheren Worten gehen wir also wie folgt vor: Wir gehen über jeden einzelnen Pixel in unserem Eingabebild und wenden darauf eine vorher definierte Operation an. Das kann beispielsweise sein, dass wir den aktuellen Wert lediglich um 10 erhöhen, damit das Bild insgesammt aufgehellt wird. Sehr häufig betrachten wir aber nicht nur den aktuellen Pixel, sondern betrachten auch gleich seine Nachbarschaft. Das können wir uns vorstellen, wie eine Maske oder ein Fenster, dass wir über unser Bild legen. In der Mitte des Fensters befindet sich unser Eingabepixel. Die Pixel, die sich sonst noch in dem Fenster befinden, sind diejenigen Nachbarpixel, die für unser Eingabepixel von Interesse sind. Bei vielen Filtern können wir die Größe des Fensters selbst auswählen, indem wir einen Radius angeben. Dabei müssen wir immer beachten, dass auch der Rechenaufwand steigt, je größer wir das Fenster wählen. Die drei Filter, die in dieser Lektion vorgestellt werden, nutzen ein solches Fenster:

Median-Filter
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Bei diesem Filter sortieren wir zunächst alle betrachteten Pixelwerte der Größe nach. Anschließend wählen wir den Median dieser Werte aus, also den Wert, der genau in der Mitte liegt. Auf diese Weise können wir stark ausreißende Werte oder extreme Werte aus unserem Eingabebild entfernen.

Mittelwert-Filter
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Bei diesem Filter werden alle benachbarten Pixelwerte und der aktuelle Wert aufsummiert und durch die Anzahl an Pixeln geteilt, die in Betracht gezogen wurden. Ein Vorteil dabei ist, dass benachbarte Pixel dadurch auch ähnliche Werte annehmen und Sensorungenauigkeiten dadurch ausgeglichen werden können. Ein Nachteil ist, dass Bilder danach "verschwommen" aussehen können. Und vor allem Kanten werden dadurch "verschmiert".

Gauß-Filter
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Dieser Filter ist sowas, wie die logische Erweiterung des Mittelwert-Filters. Dabei gehen wir von der Annahme aus, dass die Pixel, die näher an unserem aktuellen Pixel liegen auch mehr Einfluss auf dessen neuen Wert nehmen sollten. Aus diesem Grund werden die Einzelnen Pixelwerte zusätzlich mit einem Gewichtungsfaktor multipliziert, um den Einfluss auf den neuen Pixelwert zu steuern. Auch nach Anwendung des Gauß-Filters sieht ein Bild meist "verschwommen" aus. Im vergleich zum Mittelwertfilter ist dieser Effekt aber schwächer.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Randbehandlung
=================================================================================================================================================================================
Die Berechnung neuer Pixelwerte im Ausgabebild ist in den meisten Fällen recht Intuitiv, indem wir einfach die definierte Operation ausführen. Die einzige Frage, die wir uns noch stellen müssen ist, wie wir die Ränder unseres Bildes behandeln. Liegt das Fenster auf dem oberen linken Pixel, dann ragt es über das darunterliegende Bild hinaus. Das bedeutet, dass einige Nachbarn nicht existieren und wir dadurch undefinierte Werte hätten. An dieser Stelle werden dir drei mögliche Randbehandlungen vorgestellt:

* **Keine Randbehandlung:** In den meisten Fällen sind die Ränder von Bildern vernachlässigbar. Das von Interesse liegt meist im eher im Zentrum des Bildes. Wenn wir keine Randbehandlung anwenden, verwerfen wir die äußeren Pixel und wenden den Filter nur dann an, wenn das Fenster komplett über unserem Bild liegt. Die Ränder werden dabei dann meist schwarz gelassen.
* **Äußeres Pixel wiederholen:** Die leichteste Lösung, um ungewollte schwarze Ränder zu verhindern ist es, den Wert des äußersten Pixels zu wiederholen und damit die fehlenden Pixelwerte aufzufüllen. Doch auch das kann zu ungewollten gleichmäßigen Mustern an den Rändern führen.
* **Pixel spiegeln:** Um die Ränder recht natürlich wirken zu lassen ist es auch möglich, dass die fehlenden Pixelwerte einfach durch ihre am Rand gespiegelten Pixel aufgefüllt werden. Dadurch wird die überrepräsentation des Äußersten Pixels vermieden und die Ränder wirken realistischer.

# Pixelwert selbst berechnen
In diesem Abschnitt, sollst du nun selbst versuchen den neuen Pixelwert eines Eingabepixels zu berechnen, damit du besser verstehst, wie die einzelnen Filter funktionieren.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Median-Filter
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<lia-keep>
    <button class="lia-btn--outline myBtn" onclick="generate_grid('median');">
        Erstelle neue Werte
    </button>
    <div class="grid_container" id="median_grid">
        <!-- You can use the following as an example. Right now it gets created randomly when loading the course -->
        <div class="grid_item" style="background-color: rgb(109, 109, 109); color: white;" data-value="109">109</div>
        <div class="grid_item" style="background-color: rgb( 74,  74,  74); color: white;" data-value="74" >74</div>
        <div class="grid_item" style="background-color: rgb( 49,  49,  49); color: white;" data-value="49" >49</div>
        <div class="grid_item" style="background-color: rgb(  0,   0,   0); color: white;" data-value="0"  >0</div>
        <div class="grid_item" style="background-color: rgb( 38,  38,  38); color: white;" data-value="38" >38</div>
        <div class="grid_item" style="background-color: rgb(146, 146, 146); color: black;" data-value="146">146</div>
        <div class="grid_item" style="background-color: rgb(148, 148, 148); color: black;" data-value="148">148</div>
        <div class="grid_item" style="background-color: rgb( 97,  97,  97); color: white;" data-value="97" >97</div>
        <div class="grid_item" style="background-color: rgb(144, 144, 144); color: black;" data-value="144">144</div> 
    </div>
    <div class="myAnswer">
        <input type="number" class="lia-quiz__input myInput" id="median_answer" placeholder="deine Antwort hier"></input>
        <button class="lia-btn--outline myBtn" onclick="check_solution('median');">
            Prüfen
        </button>
        <button class="mySolutionBtn lia-btn lia-btn--transparent lia-quiz__resolve" title="zeige Lösung" onclick="show_solution('median');">
            <i class="icon icon-resolve lia-btn__icon"></i>
        </button>
    </div>
    <div class="mySolution" id="median_solution">
    </div>
</lia-keep>

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Mittelwert-Filter
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Bitte trag deinen errechneten Wert in das Antwortfeld ein. Du darfst dein Ergebnis auf ganze Zahlen runden, wenn du trotzdem Dezimalzahlen angeben möchtest, trenne die Vor- und Nachkommastellen mit einem "." anstelle eines ",".

<lia-keep>
    <button class="lia-btn--outline myBtn" onclick="generate_grid('mean');">
        Erstelle neue Werte
    </button>
    <div class="grid_container" id="mean_grid">
        <!-- You can use the following as an example. Right now it gets created randomly when loading the course -->
        <div class="grid_item" style="background-color: rgb(157, 157, 157); color: black;" data-value="157">157</div>
        <div class="grid_item" style="background-color: rgb(137, 137, 137); color: black;" data-value="137">137</div>
        <div class="grid_item" style="background-color: rgb(166, 166, 166); color: black;" data-value="166">166</div>
        <div class="grid_item" style="background-color: rgb(154, 154, 154); color: black;" data-value="154">154</div>
        <div class="grid_item" style="background-color: rgb(171, 171, 171); color: black;" data-value="171">171</div>
        <div class="grid_item" style="background-color: rgb(140, 140, 140); color: black;" data-value="140">140</div>
        <div class="grid_item" style="background-color: rgb(133, 133, 133); color: black;" data-value="133">133</div>
        <div class="grid_item" style="background-color: rgb(162, 162, 162); color: black;" data-value="162">162</div>
        <div class="grid_item" style="background-color: rgb(149, 149, 149); color: black;" data-value="149">149</div>
    </div>
    <div class="myAnswer">
        <input type="number" class="lia-quiz__input myInput" id="mean_answer" placeholder="deine Antwort hier"></input>
        <button class="lia-btn--outline myBtn" onclick="check_solution('mean');">
            Prüfen
        </button>
        <button class="mySolutionBtn lia-btn lia-btn--transparent lia-quiz__resolve" title="zeige Lösung" onclick="show_solution('mean');">
            <i class="icon icon-resolve lia-btn__icon"></i>
        </button>
    </div>
    <div class="mySolution" id="mean_solution">
    </div>
</lia-keep>

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Gauß-Filter
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Bitte trag deinen errechneten Wert in das Antwortfeld ein. Du darfst dein Ergebnis auf ganze Zahlen runden, wenn du trotzdem Dezimalzahlen angeben möchtest, trenne die Vor- und Nachkommastellen mit einem "." anstelle eines ",". Die Gewichte, mit denen du die einzelnen Werte multiplizierst sind bei einem 3x3 großen Fenster zur Erinnerung wie folgt:
<lia-keep>
<pre>
+-----------+
| 1 | 2 | 1 |
+-----------+
| 2 | 4 | 2 |
+-----------+
| 1 | 2 | 1 |
+-----------+
</pre>
</lia-keep>
Denke auch daran, anschließend durch die Summe der Gewichte zu teilen. In diesem Fall also durch **16**.

<lia-keep>
    <button class="lia-btn--outline myBtn" onclick="generate_grid('gaussian');">
        Erstelle neue Werte
    </button>
    <div class="grid_container" id="gaussian_grid">
        <!-- You can use the following as an example. Right now it gets created randomly when loading the course -->
        <div class="grid_item" style="background-color: rgb(157, 157, 157); color: black;" data-value="157">157</div>
        <div class="grid_item" style="background-color: rgb(137, 137, 137); color: black;" data-value="137">137</div>
        <div class="grid_item" style="background-color: rgb(166, 166, 166); color: black;" data-value="166">166</div>
        <div class="grid_item" style="background-color: rgb(154, 154, 154); color: black;" data-value="154">154</div>
        <div class="grid_item" style="background-color: rgb(171, 171, 171); color: black;" data-value="171">171</div>
        <div class="grid_item" style="background-color: rgb(140, 140, 140); color: black;" data-value="140">140</div>
        <div class="grid_item" style="background-color: rgb(133, 133, 133); color: black;" data-value="133">133</div>
        <div class="grid_item" style="background-color: rgb(162, 162, 162); color: black;" data-value="162">162</div>
        <div class="grid_item" style="background-color: rgb(149, 149, 149); color: black;" data-value="149">149</div>
    </div>
    <div class="myAnswer">
        <input type="number" class="lia-quiz__input myInput" id="gaussian_answer" placeholder="deine Antwort hier"></input>
        <button class="lia-btn--outline myBtn" onclick="check_solution('gaussian');">
            Prüfen
        </button>
        <button class="mySolutionBtn lia-btn lia-btn--transparent lia-quiz__resolve" title="zeige Lösung" onclick="show_solution('gaussian');">
            <i class="icon icon-resolve lia-btn__icon"></i>
        </button>
    </div>
    <div class="mySolution" id="gaussian_solution">
    </div>
</lia-keep>