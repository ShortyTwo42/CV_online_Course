<!--
author:     Leon Endris

email:      leendris@uni-koblenz.de

version:    0.0.1

language:   de

narrator:   Deutsch Female

comment:    Dies ist die erste Lektion des
            CV Online Kurses. Format und Nutzen 
            von Pixel-/Rastergrafik wird hier vermittelt

link:       ../CSS/Main.css 
            ../CSS/fontawesome/css/all.min.css
            ../CSS/InteractiveCodingTemplate.css

script:     ../JavaScript/LiaScriptCustom.js
            ../JavaScript/InteractiveCodingTemplate.js
            ../JavaScript/MyPicCoder.js


-->

# Lektion 1: Pixel-/Rastergrafik
Hier sind alle Tools zu finden, die für den CV Online Kurs entwickelt wurden

# Was ist eine Pixel-/Rastergrafik?
Gängige Bildformate wie JPG oder PNG verwenden ein Raster, um sogenannte Picture Elements, kurz "Pixel", anzuordnen. Jeder Pixel enthält eine codierte Farbwertinformation. Die wichtigsten Eigenschaften eines solchen codierten Bildes sind Höhe, Breite und Farbtiefe. Die Farbtiefe gibt an, wie viele Abstufungen von Helligkeitswerten möglich sind.
Binärbilder erlauben beispielsweise nur schwarze oder weiße Pixel. Mit Grauwertbildern können verschiedene Grautöne zwischen Schwarz und Weiß dargestellt werden. Und schließlich können Farbbilder durch das anteilige Mischen der Farben Rot, Grün und Blau erzeugt werden.
Ein Problem bei diesen Pixelgrafiken besteht darin, dass eine verlustfreie Skalierung nicht möglich ist. Wenn wir in ein solches Bild hineinzoomen, werden die einzelnen Pixel immer deutlicher sichtbar.


# Wie kommt ein Pixel auf den Bildschirm?
Wie genau kommt ein solches Pixel nun auf unseren Bildschirm? Wir können uns das Raster eines Bildes vorstellen wie ein Koordinatensystem, bei dem wir nur mit natürlichen Zahlen (1, 2, 3, …) die einzelnen Pixel ansprechen. Das Koordinatensystem hat bei Bildern seinen Ursprung meist in der oberen linken Ecke.

## Programmierbeispiel: PutPixel
??[PutPixel](../HTML/PutPixel.html)

# Wie werden einfache Bildformate codiert?
Hallo Welt

# Erstelle ein eigenes Bild
<html>
    <body>   
        <div class="ict-range">
            <div class="ict-header">
                <h1>
                    MyPicCoder
                </h1>
                <div class="ict-subHeader">
                    <div class="ict-subHeaderItem">
                        <label for="ict-fileName">
                            Dateiname
                        </label>
                        <input id="ict-fileName" value="Bild"></input>
                    </div>
                </div>
                <div class="ict-menu">
                    <button onclick="tryFileDownload()">
                        <i class="fa-solid fa-floppy-disk fa-2xl"></i>
                    </button>
                    <button>
                        <label for="file-upload" class="file_upload_label">
                            <i class="fa-solid fa-folder-open fa-2xl"></i>
                        </label>
                        <input type="file" id="file-upload" class="file_uploader" onchange="tryFileUpload()"/>  
                    </button>
                    <button onclick="toggleView('100%', '0%')" title="Code maximieren">
                        <i class="fa-solid fa-arrow-right fa-2xl"></i>
                    </button>
                    <button onclick="toggleView('50%', '50%')" title="Split Screen">
                        <i class="fa-solid fa-arrows-left-right fa-2xl"></i>
                    </button>
                    <button onclick="toggleView('0%', '100%')" title="Preview maximieren">
                        <i class="fa-solid fa-arrow-left fa-2xl"></i>
                    </button>
                    <button onclick="display()" title="Lade Preview" class="float-right">
                        <i class="fa-solid fa-code fa-2xl"></i>
                    </button>
                    <label class="ict-switch float-right" title="Live Preview">
                        <input type="checkbox" onchange="toggleAutoRefresh(this)" checked>
                        <span class="ict-slider"></span>
                    </label>
                </div>
            </div>
            <div class="ict-content">
                <div class="ict-codingSpace">
                    <div class="ict-wrapper background-codeSpace">
                        <div class="ict-editor">
                            <div class="ict-lineNumbers">
                                <span></span>
                            </div>
                            <textarea class="ict-code" oninput="display()"></textarea>
                        </div>
                    </div>
                </div>
                <div class="ict-previewSpace">
                    <div class="ict-display background-previewSpace">
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>