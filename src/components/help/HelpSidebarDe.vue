<template>
  <div class="prose prose-sm">
        <!-- Parser Section Help Content -->
        <div v-if="section === 'parser'" class="prose prose-sm">
          
          <div class="mb-8">
            <p class="text-gray-600 mb-1">
                Diese Anleitung erklärt, wie Sie den Parser-Abschnitt [Parser] in Ihrer Konfigurationsdatei konfigurieren. Jede Option steuert spezifische Aspekte der Verarbeitung und Interpretation Ihrer Eingabedaten.
            </p>
        </div>

        <div class="space-y-8">
            <!-- Required Options Section -->
            <div class="border-b pb-6">
                <h4 class="text-xl font-semibold mb-1 text-blue-600">Erforderliche Optionen</h4>
                
                <div class="grid gap-6">
                    <div class="bg-gray-50 p-6 ">
                        <h3 class="font-semibold text-gray-800 text-lg">Koordinaten (Erforderlich)</h3>
                        <div class="mt-3 space-y-3">
                            <p class="text-gray-600">Gibt an, welche Felder in Ihren Eingabedaten die räumlichen Koordinaten Ihrer Messungen enthalten. Die X- und Y-Koordinaten sind obligatorisch, während Z optional ist.</p>
                            
                            <ul class="list-disc list-inside text-gray-600 ml-4 space-y-1">
                                <li><span class="font-medium">coor x, coor y:</span> Müssen angegeben werden und auf vorhandene numerische Felder vom Typ "double" verweisen</li>
                                <li><span class="font-medium">coor z:</span> Optional - wenn nicht angegeben, werden Z-Koordinaten standardmäßig auf 0.0 gesetzt</li>
                            </ul>
                            
                            <code class="block bg-gray-100 mt-2 text-sm rounded p-2">
                                coor x = xfield<br>
                                coor y = yfield<br>
                                coor z = zfield
                            </code>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 ">
                        <h3 class="font-semibold text-gray-800 text-lg">Geometrie-Tags (Erforderlich)</h3>
                        <div class="mt-3 space-y-3">
                            <p class="text-gray-600">Definiert spezielle Markierungen, die verschiedene Geometrietypen in Ihren Daten identifizieren. Diese Tags ermöglichen es dem Parser, einfache Punktmessungen in komplexe Geometrien wie Linien und Polygone zu konvertieren.</p>
                            
                            <ul class="list-disc list-inside text-gray-600 ml-4 space-y-1">
                                <li><span class="font-medium">geom tag point:</span> Markiert Punktobjekte (in einigen Parser-Modi optional)</li>
                                <li><span class="font-medium">geom tag line:</span> Markiert Linienobjekte</li>
                                <li><span class="font-medium">geom tag poly:</span> Markiert Polygonobjekte</li>
                            </ul>
                            
                            <p class="text-gray-600">Sie können bis zu 32 Tags pro Geometrietyp definieren, aber sie müssen eindeutig sein und dürfen sich nicht mit Feldtrennzeichen oder Anführungszeichen überschneiden.</p>
                            
                            <code class="block bg-gray-100 mt-2 text-sm rounded p-2">
                                geom tag point = "*"<br>
                                geom tag line = "-"<br>
                                geom tag poly = "@"<br>
                                geom tag poly = "@ "  # Alternatives Polygon-Tag
                            </code>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 ">
                        <h3 class="font-semibold text-gray-800 text-lg">Schlüsselfeld (Erforderlich für einige Modi)</h3>
                        <div class="mt-3 space-y-3">
                            <p class="text-gray-600">Gibt das Feld an, das Identifikatorwerte enthält, die mehrere Messungen verknüpfen, die zur selben Geometrie gehören (wie Punkte in einer Linie oder einem Polygon).</p>
                            
                            <ul class="list-disc list-inside text-gray-600 ml-4 space-y-1">
                                <li>Obligatorisch für Parser-Modi "End" und "Max"</li>
                                <li>Alle Messungen mit demselben Schlüsselwert werden als Teil derselben Geometrie betrachtet</li>
                                <li>Kann mit der Option "key unique" für mehrteilige Geometrien verwendet werden</li>
                            </ul>
                            
                            <code class="block bg-gray-100 mt-2 text-sm rounded p-2">
                                key field = key<br>
                                key unique = yes  # Optional, für mehrteilige Geometrien
                            </code>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 ">
                        <h3 class="font-semibold text-gray-800 text-lg">Tagging-Modus (Erforderlich)</h3>
                        <div class="mt-3 space-y-3">
                            <p class="text-gray-600">Bestimmt, wie der Parser Geometrie-Tags interpretiert und Messungen in Features verarbeitet.</p>
                            
                            <ul class="list-disc list-inside text-gray-600 ml-4 space-y-1">
                                <li><span class="font-medium">min:</span> Minimales Tagging - typischerweise verwendet, wenn jede Geometrie einen Datensatz mit vollständigen Attributen hat</li>
                                <li><span class="font-medium">max:</span> Maximales Tagging - für komplexe Geometrien mit mehreren Attributdatensätzen</li>
                                <li><span class="font-medium">end:</span> End-Tagging - verarbeitet Geometrien basierend auf Endmarkierungen</li>
                                <li><span class="font-medium">none:</span> Kein Tagging - behandelt alle Datensätze als einfache Punktmessungen</li>
                            </ul>
                            
                            <code class="block bg-gray-100 mt-2 text-sm rounded p-2">
                                tagging mode = end
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Optional Options Section -->
            <div>
                <h4 class="text-xl font-semibold mb-1 text-green-600">Optionale Einstellungen</h4>
                
                <div class="grid gap-6">
                    <div class="bg-gray-50 p-6 ">
                        <h3 class="font-semibold text-gray-800 text-lg">Kommentar-Markierung</h3>
                        <div class="mt-3 space-y-3">
                            <p class="text-gray-600">Definiert spezielle Zeichen, die den Beginn von Kommentaren in Ihren Eingabedaten markieren. Jeder Text nach diesen Markierungen wird während der Verarbeitung ignoriert.</p>
                            
                            <ul class="list-disc list-inside text-gray-600 ml-4">
                                <li>Mehrere Kommentarmarkierungen können angegeben werden</li>
                                <li>Dürfen nicht mit Feldtrennzeichen oder Anführungszeichen in Konflikt stehen</li>
                            </ul>
                            
                            <code class="block bg-gray-100 mt-2 text-sm rounded p-2">
                                comment mark = #<br>
                                comment mark = //
                            </code>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 ">
                        <h4 class="font-semibold text-gray-800 text-lg">Keine-Daten-Wert</h4>
                        <div class="mt-3 space-y-3">
                            <p class="text-gray-600">Gibt einen ganzzahligen Wert an, der null oder fehlende Daten in Ihren Attributen repräsentiert. Dieser Wert sollte eindeutig sein und nicht in gültigen Daten vorkommen.</p>
                            
                            <p class="text-gray-600">Dieser Wert wird in Ausgabedateien geschrieben, wenn ein Feld leer ist oder keine gültigen Daten enthält.</p>
                            
                            <code class="block bg-gray-100 mt-2 text-sm rounded p-2">
                                no data = -99999
                            </code>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 ">
                        <h4 class="font-semibold text-gray-800 text-lg">Tag Strikt-Modus</h4>
                        <div class="mt-3 space-y-3">
                            <p class="text-gray-600">Kontrolliert, wie streng der Parser die Regeln für Geometrie-Tagging durchsetzt. Wenn aktiviert, muss jede Messung ein gültiges Geometrie-Tag enthalten, sonst wird sie verworfen.</p>
                            
                            <p class="text-gray-600">Standardmäßig "off", wenn nicht angegeben. Aktivieren Sie dies für strengere Datenvalidierung.</p>
                            
                            <code class="block bg-gray-100 mt-2 text-sm rounded p-2">
                                tag strict = yes
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8 p-6 bg-blue-50 ">
            <h4 class="font-semibold text-blue-800 mb-3 text-lg">Wichtige Überlegungen</h4>
            <ul class="list-disc list-inside space-y-1 text-blue-700">
                <li>Alle Geometrie-Tags müssen eindeutig sein und dürfen sich nicht mit anderen Sonderzeichen überschneiden</li>
                <li>Koordinatenfelder müssen numerisch und vom Typ "double" sein</li>
                <li>Bei Verwendung des Schlüsselfelds überlegen Sie, ob Ihre Geometrien möglicherweise mehrere Teile haben</li>
                <li>Der Parser-Modus beeinflusst erheblich, wie Ihre Daten verarbeitet werden - wählen Sie sorgfältig</li>
                <li>Der Tag Strikt-Modus kann dabei helfen, Datenfehler zu erkennen, aber kann gültige Messungen verwerfen, wenn sie nicht richtig getaggt sind</li>
            </ul>
        </div>

        </div>
  
        <!-- Imprint Content -->
        <div v-if="section === 'imprint'" class="prose prose-sm">

        <!-- Contact Information Card -->
        <div class="bg-white  mb-3 mt-6">
            <h4 class="text-xl font-bold text-gray-800 mb-1">Anbieter</h4>
            <div class="space-y-1 text-gray-600">
                <p class="font-medium">
                    Landesamt für Denkmalpflege im Regierungspräsidium Stuttgart<br>
                    Berliner Straße 12<br>
                    73728 Esslingen (Neckar)</p>
            </div>
        </div>

        <!-- Usage Terms Card -->
        <div class="bg-white  mb-3">
            <h4 class="text-xl font-bold text-gray-800 mb-1">Hinweise zur Nutzung</h4>
            <ol class="list-decimal list-inside space-y-3 text-gray-600">
                <li>Das Nutzungsrecht wird Ihnen unentgeltlich eingeräumt.</li>
                <li>
                    Das Landesamt für Denkmalpflege Baden-Württemberg im Regierungspräsidium Stuttgart 
                    übernimmt keine Haftung für Hard- oder Softwareschäden, die durch die Anwendung 
                    dieser Anwendung verursacht werden.
                </li>
                <li>
                    Es wird keinerlei Support für die Software gewährleistet. Das LAD und CSGIS haften 
                    nicht für Fahrlässigkeit. Eine Haftung für mittelbare Schäden oder die 
                    Wiederbeschaffung von Daten wird ausgeschlossen.
                </li>
                <li>
                    Die Seite verwendet keine Cookies.
                </li>
                <li>
                    Es werden keine Daten serverseitig verarbeitet oder gespeichert.
                </li>
            </ol>
        </div>

        <!-- Team Information Card -->
        <div class="bg-white  mb-3">
            <h4 class="text-xl font-bold text-gray-800 mb-1">Projektteam</h4>
            <ul class="space-y-1 text-gray-600">
                <li>Jonas Abele</li>
                <li>Claus Brenner</li>
                <li>José Canalejo</li>
                <li>Toni Schönbuchner</li>
            </ul>
        </div>

        <!-- Implementation Details Card -->
        <div class="bg-white ">
            <h4 class="text-xl font-bold text-gray-800 mb-1">Projektumsetzung</h4>
            <div class="text-gray-600">
                <p class="font-medium">CSGIS GbR</p>
                <p>Am Eichbüchl 7</p>
                <p>D - 82223 Eichenau</p>
                <a href="http://www.csgis.de" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                    www.csgis.de (v1.1)
                </a>
            </div>
        </div>
        </div>

        <!-- Help Content -->
        <div v-if="section === 'help'" class="prose prose-sm">
          <p class="text-lg text-gray-600 mb-8">Ein Web-Tool zum Erstellen von Parser-Dateien für Survey2GIS.</p>

                <!-- Quick Start -->
                <div class="bg-blue-50  p-6 mb-8">
                <h4 class="text-xl font-semibold text-blue-900 mb-4">🚀 Schnellstart</h4>
                <ol class="space-y-2 text-blue-900">
                    <li>1. Beginnen Sie mit dem <span class="font-semibold">Parser-Abschnitt</span> oben</li>
                    <li>2. Füllen Sie die erforderlichen Felder aus (markiert mit <span class="text-red-500">*</span>)</li>
                    <li>3. Fügen Sie <span class="font-semibold">Feld-Abschnitte</span> für jedes Datenfeld hinzu</li>
                    <li>4. Laden Sie Ihre Konfigurationsdatei herunter</li>
                </ol>
                <hr class="mt-4 mb-4">
                <p class="text-blue-900">
                Die komplette Dokumentation von survey2gis findet Sie <a  class="underline" href="https://survey2gis.github.io/survey2gis-docs/">hier</a>. (nur Englisch)
                </p>
                </div>


                <!-- Required Settings -->
                <div class="mb-8">
                <h4 class="text-xl font-semibold text-gray-900 mb-4">Erforderliche Einstellungen</h4>

                <!-- Parser Section -->
                <div class="bg-white shadow  p-6 mb-6">
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">Parser-Abschnitt</h4>
                    <p class="text-gray-600 mb-2">Diese Felder müssen ausgefüllt werden:</p>
                    <ul class="space-y-2 text-gray-700">
                    <li class="flex items-start">
                        <span class="font-semibold min-w-[100px]">Name:</span>
                        <span>Ihr Konfigurationsname</span>
                    </li>
                    <li class="flex items-start">
                        <span class="font-semibold min-w-[100px]">COORX:</span>
                        <span>Feldname für X-Koordinaten</span>
                    </li>
                    <li class="flex items-start">
                        <span class="font-semibold min-w-[100px]">COORY:</span>
                        <span>Feldname für Y-Koordinaten</span>
                    </li>
                    </ul>
                </div>

                <!-- Field Sections -->
                <div class="bg-white shadow  p-6">
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">Feld-Abschnitte</h4>
                    <p class="text-gray-600 mb-3">Für jedes Feld müssen Sie angeben:</p>
                    <div class="space-y-4">
                    <div>
                        <h4 class="font-semibold text-gray-900">Name</h4>
                        <p class="text-gray-600">Maximal 10 Zeichen, nur Buchstaben, Zahlen und Unterstriche</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-900">Typ</h4>
                        <ul class="list-disc ml-5 text-gray-600">
                        <li>integer (ganze Zahlen)</li>
                        <li>double (Dezimalzahlen)</li>
                        <li>text (Textzeichenfolgen)</li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>

                <!-- Common Tasks -->
                <div class="mb-8">
                <h4 class="text-xl font-semibold text-gray-900 mb-4">Häufige Aufgaben</h4>
                
                <!-- Creating Fields -->
                <div class="bg-white shadow  p-6 mb-6">
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">Neues Feld erstellen</h4>
                    <ol class="space-y-2 text-gray-600">
                    <li>1. Klicken Sie auf die Schaltfläche "Feld-Abschnitt hinzufügen"</li>
                    <li>2. Füllen Sie die erforderlichen Felder Name und Typ aus</li>
                    <li>3. Passen Sie optionale Einstellungen nach Bedarf an</li>
                    </ol>
                </div>
        </div>

            <!-- Parser Modes Section -->
            <div class="mt-12">
                <h4 class="text-xl font-semibold mb-3 text-green-600">Parser-Modi</h4>
                <div class="bg-gray-50 p-6 ">
                    <h4 class="font-semibold text-gray-800 mb-1">Geometrieverarbeitung verstehen</h4>
                    
                    <div class="space-y-6">
                        <div>
                            <h4 class="font-medium text-gray-700">Wesentliche Einschränkungen</h4>
                            <ul class="list-disc list-inside text-gray-600 ml-4">
                                <li>Scheitelpunkte einer einzelnen Geometrie müssen in einer Datei sein</li>
                                <li>Scheitelpunktmessungen können nur durch Kommentare/leere Zeilen unterbrochen werden</li>
                                <li>Verfügbare Geometrietypen: Punkt, Linie, Polygon</li>
                            </ul>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-700">Geometrie-Markierungen</h4>
                            <ul class="list-disc list-inside text-gray-600 ml-4">
                                <li>Verwenden Sie Sonderzeichen (z.B. @, $) zur Markierung von Geometrietypen</li>
                                <li>Können separate Felder oder zu bestehenden Feldern hinzugefügt werden</li>
                                <li>Müssen in der Option "tag field" deklariert werden</li>
                            </ul>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-700">Wichtige Hinweise</h4>
                            <ul class="list-disc list-inside text-gray-600 ml-4">
                                <li>Polygone werden automatisch geschlossen - keine doppelten Scheitelpunkte erforderlich</li>
                                <li>Schlüsselfeldwerte sind groß-/kleinschreibungsempfindlich</li>
                                <li>Nur ein Parser-Modus kann pro Schema verwendet werden</li>
                            </ul>
                        </div>
                    </div>

                         <!-- Important Notes Section -->
                         <div class="mt-8 p-6 bg-blue-50 ">
                            <h4 class="font-semibold text-blue-800 mb-3 text-lg">Wichtige Überlegungen</h4>
                            <ul class="list-disc list-inside space-y-1 text-blue-700">
                                <li>Feldnamen sind auf 10 Zeichen und bestimmte gültige Zeichen beschränkt</li>
                                <li>Trennzeichen müssen eindeutig sein und dürfen sich nicht mit anderen Sonderzeichen überschneiden</li>
                                <li>Leere Felder funktionieren möglicherweise nicht korrekt mit Leerzeichen-Trennzeichen</li>
                                <li>Textersetzung funktioniert nur bei exakter Übereinstimmung des Feldinhalts</li>
                                <li>Parser-Modi beeinflussen, wie Geometrie-Markierungen und Schlüsselfelder interpretiert werden</li>
                            </ul>
                        </div>
                </div>
            </div>
        </div>

        <!-- Field Section Help Content -->
        <div v-if="section === 'field'" class="prose prose-sm">
          
          <div class="grid gap-6">
                <div class="bg-gray-50 p-6 ">
                    <h4 class="font-semibold text-gray-800 text-lg">Erforderliche Feldoptionen</h4>
                    <div class="mt-3 space-y-4">
                        <div>
                            <h4 class="font-medium text-gray-700">name (Erforderlich)</h4>
                            <p class="text-gray-600 mt-1">Die Bezeichnung für Ihr Feld (max. 10 Zeichen)</p>
                            <ul class="list-disc list-inside text-gray-600 ml-4 mt-2">
                                <li>Gültige Zeichen: Buchstaben, Zahlen, Unterstrich</li>
                                <li>Groß-/kleinschreibungsunabhängig - wird in Kleinbuchstaben gespeichert</li>
                            </ul>
                            <code class="block bg-gray-100 mt-2 text-sm rounded p-2">
                                name = index_fld
                            </code>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-700">type (Erforderlich)</h4>
                            <p class="text-gray-600 mt-1">Definiert den Datentyp des Feldes</p>
                            <ul class="list-disc list-inside text-gray-600 ml-4 mt-2">
                                <li><span class="font-medium">integer:</span> Ganze Zahlen (-1, 0, 100)</li>
                                <li><span class="font-medium">double:</span> Gleitkommazahlen (-10.05, 0.0)</li>
                                <li><span class="font-medium">text:</span> Allgemeiner Textinhalt</li>
                            </ul>
                            <code class="block bg-gray-100 mt-2 text-sm rounded p-2">
                                type = integer
                            </code>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-700">separator</h4>
                            <p class="text-gray-600 mt-1">Definiert Zeichen, die Felder trennen (erforderlich außer für das letzte Feld)</p>
                            <ul class="list-disc list-inside text-gray-600 ml-4 mt-2">
                                <li>Kann mehrere Zeichen verwenden</li>
                                <li>Spezielle Werte: "tab" und "space"</li>
                            </ul>
                            <code class="block bg-gray-100 mt-2 text-sm rounded p-2">
                                separator = ;<br>
                                separator = tab<br>
                                separator = space
                            </code>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 p-6 ">
                    <h3 class="font-semibold text-gray-800 text-lg">Optionale Feldeinstellungen</h3>
                    <div class="mt-3 space-y-4">
                        <div>
                            <h4 class="font-medium text-gray-700">empty allowed</h4>
                            <p class="text-gray-600 mt-1">Kontrolliert, ob Felder leer sein können</p>
                            <ul class="list-disc list-inside text-gray-600 ml-4 mt-2">
                                <li>Standard: aus</li>
                                <li>Kann nicht mit Schlüssel- oder Tag-Feldern verwendet werden</li>
                                <li>Nicht kompatibel mit merge_separators</li>
                            </ul>
                            <code class="block bg-gray-100 mt-2 text-sm rounded p-2">
                                empty allowed = yes
                            </code>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-700">change case</h4>
                            <p class="text-gray-600 mt-1">Konvertiert Textfeldinhalte zu Groß- oder Kleinschreibung</p>
                            <ul class="list-disc list-inside text-gray-600 ml-4 mt-2">
                                <li>Werte: lower, upper, none</li>
                                <li>Gilt nur für Textfelder</li>
                            </ul>
                            <code class="block bg-gray-100 mt-2 text-sm rounded p-2">
                                change case = lower
                            </code>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-700">Textersetzung (@)</h4>
                            <p class="text-gray-600 mt-1">Ersetzt Codes oder Abkürzungen durch vollständigen Text</p>
                            <ul class="list-disc list-inside text-gray-600 ml-4 mt-2">
                                <li>Format: @alt=neu</li>
                                <li>Groß-/kleinschreibungsunabhängige Übereinstimmung</li>
                                <li>Max. 254 Zeichen für neuen Text</li>
                            </ul>
                            <code class="block bg-gray-100 mt-2 text-sm rounded p-2">
                                @ABK = Abkürzung<br>
                                @P1 = Punkt vom Typ 1
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
  
<script setup>
defineProps({
  section: {
    type: String,
    required: true
  }
})
</script>
  
<style scoped>
.prose h4 { @apply text-lg font-semibold mb-2; }
.prose h5 { @apply font-semibold mb-1; }
.prose ul { @apply list-disc ml-4 mb-2; }
.prose li { @apply mb-1; }
code { @apply bg-gray-100 px-2 py-1 rounded text-sm; }
</style>