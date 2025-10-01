<template>
  <div class="h-screen flex flex-col ">
    <!-- Tab Navigation -->
    <div class="bg-white border-b border-gray-200">
      <div class="flex">
        <button 
          class="flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2"
          :class="activeTab === 'introduction' ? 'text-blue-600 border-blue-600 bg-blue-50' : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'"
          @click="activeTab = 'introduction'"
        >
          Einführung
        </button>
        <button 
          class="flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2"
          :class="activeTab === 'interface' ? 'text-blue-600 border-blue-600 bg-blue-50' : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'"
          @click="activeTab = 'interface'"
        >
          Website-Oberfläche
        </button>
        <button 
          class="flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2"
          :class="activeTab === 'parser' ? 'text-blue-600 border-blue-600 bg-blue-50' : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'"
          @click="activeTab = 'parser'"
        >
          Parser definieren
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="flex-1  p-6">
      
      <!-- Introduction Content -->
      <div v-show="activeTab === 'introduction'">
        <h2 class="text-2xl font-bold text-gray-900 mb-3">Survey2GIS Parser Builder</h2>
        <p class="text-gray-600 mb-6">
          Dieses Werkzeug hilft Ihnen, Parser-Dateien zu erstellen, die es Survey2GIS ermöglichen, Ihre Tachymeter-Daten in Shapefiles, GeoJSON und andere GIS-Formate zu konvertieren.
        </p>

        <div class="border-blue-500 rounded mb-6">
          <h5 class="font-semibold text-blue-900 mb-3">Was ist eine Parser-Datei?</h5>
          <p class="text-sm mb-4">
            Eine Parser-Datei ist eine Konfiguration, die Survey2GIS mitteilt, wie Ihre Tachymeter-Daten gelesen und interpretiert werden sollen. <br>
            Sie definiert, welche Spalten Koordinaten enthalten, welche Zeichen verschiedene Geometrietypen markieren und wie die Messungen verarbeitet werden.
          </p>
          
          <h6 class="font-semibold text-blue-900 mb-2 text-sm">Kompatibel mit:</h6>
          <ul class="space-y-2 text-sm">
            <li>
              <strong>Kommandozeilen-Tool:</strong> 
              <a href="https://github.com/survey2gis/survey-tools" class="text-blue-700 hover:underline underline ml-1" target="_blank" rel="noopener noreferrer">
                github.com/survey2gis/survey-tools
              </a>
            </li>
            <li>
              <strong>QGIS Plugin:</strong> 
              <a href="https://plugins.qgis.org/plugins/s2g_data_processor/" class="text-blue-700 hover:underline underline ml-1" target="_blank" rel="noopener noreferrer">
                S2G Data Processor
              </a>
            </li>
          </ul>
          
          <div class="mt-4 pt-4 border-t border-blue-200">
            <p class="text-sm text-blue-800 mb-1">
              <strong>Vollständige Dokumentation:</strong>
            </p>
            <a href="https://s2g-docs.survey-tools.org/parser-schema.html" class="text-blue-700 hover:text-blue-600 font-medium underline text-sm" target="_blank" rel="noopener noreferrer">
              Parser Schema Dokumentation
            </a>
          </div>
        </div>
      </div>

      <!-- Interface Content -->
      <div v-show="activeTab === 'interface'">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Die Benutzeroberfläche verstehen</h2>

        <div class="space-y-4">
          <div class="bg-white rounded-lg shadow-sm p-5">
            <h5 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span class="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Die Navigationsleiste
            </h5>
            <p class="text-gray-600 mb-3">
                <img src="img/nav.jpeg" alt="Survey2GIS Navigation" class="border mb-3">

                Von links nach rechts:
                <ol class="list-decimal list-inside space-y-1 mt-2">
                  <li>Logo und Home-Button - Klicken Sie hier, um zur Startseite zurückzukehren</li>
                  <li>Auswahl für:
                    <ul class="list-disc list-inside pl-6">
                      <li>Hochladen einer Parser-Datei, die lokal auf Ihrer Festplatte gespeichert ist</li>
                      <li>Laden einer Beispiel-Parser-Datei zu Lernzwecken</li>
                      <li>Durchsuchen der Community-Parser-Bibliothek nach geteilten Konfigurationen</li>
                    </ul>
                  </li>
                  <li>Zwischen deutscher und englischer Sprache wechseln</li>
                  <li>Impressum dieser Website</li>
                  <li>Diese Hilfe öffnen</li>
                </ol>
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-5">
            <h5 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span class="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Einen neuen Parser starten
            </h5>
            <p class="text-gray-600 mb-3">
                Klicken Sie auf der linken Seite auf die folgende Schaltfläche, um eine neue Parser-Konfiguration zu starten.
            </p>
            <img src="img/start_new.jpeg" alt="Neuen Parser starten" class="border mb-3">
            <p class="text-gray-600">
                Sie sehen Ihren definierten Parser in der Live-Vorschau auf der rechten Seite.
            </p>
            <img src="img/parser_definition.jpeg" alt="Parser GUI" class="border mt-2 mb-2">
            <p class="text-gray-600 text-sm">
                Für weitere Informationen besuchen Sie den nächsten Tab "Parser definieren".
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-5">
            <h5 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span class="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Parser-Repository
            </h5>
            <p class="text-gray-600 mb-3">
                Durch Auswahl der Option "Community-Parser durchsuchen" in der Navigationsleiste können Sie auf das Parser-Repository zugreifen.
            </p>
            <img src="img/parser_repository.jpeg" alt="Parser Repository" class="border mb-2">
            <p class="text-gray-600 text-sm">
                Hier können Sie nach von der Community geteilten Parsern suchen. Sie können nach Namen filtern.
            </p>
          </div>
        </div>
      </div>

      <!-- Parser Content -->
<div v-show="activeTab === 'parser'">
  <h2 class="text-2xl font-bold text-gray-900 mb-4">Wie man einen Parser definiert</h2>
  <p class="text-gray-600 mb-6">Parser-Modi verstehen und Ihre Parser-Datei konfigurieren.</p>

  <!-- Understanding Parser Modes -->
  <div class="bg-white rounded-lg shadow-sm p-5 mb-4">
    <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
      <span class="bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
      <span>Parser-Modi verstehen</span>
    </h4>
    <p class="text-gray-600 text-sm mb-4">
      Bevor Sie Ihren Parser erstellen, sollten Sie verstehen, wie Ihre Tachymeter-Daten strukturiert sind. 
      Wählen Sie den Modus, der zu Ihrem Datenformat passt.
    </p>

    <div class="space-y-4">
      <div class="border-l-4 border-gray-300 pl-4">
        <h6 class="font-semibold text-gray-900 mb-1">Modus: "Min" (Minimale Codierung)</h6>
        <p class="text-gray-600 text-sm mb-2">
Reduziert den Aufwand beim Aufnehmen. Nur der erste Punkt einer Linie oder Fläche braucht vollständige Angaben - die folgenden Punkte nicht mehr.        </p>
        <div class="bg-gray-50 p-3 rounded">
          <p class="text-xs text-gray-600 mb-1">Beispiel:</p>
          <pre class="text-xs text-gray-700">1 polygon 1<span class="bg-red-200"> @ </span>10.00 10.00 1.00
10.00 20.00 1.05
20.00 20.00 1.10</pre>
        </div>
      </div>

      <div class="border-l-4 border-gray-300 pl-4">
        <h6 class="font-semibold text-gray-900 mb-1">Modus: "Max" (Maximale Kontrolle)</h6>
        <p class="text-gray-600 text-sm mb-2">
          Jede Messung muss ein Geometrie-Tag haben. Jeder Stützpunkt hat vollständige Attribute. Erfordert ein separates Schlüsselfeld.
        </p>
        <div class="bg-gray-50 p-3 rounded">
          <p class="text-xs text-gray-600 mb-1">Beispiel:</p>
          <pre class="text-xs text-gray-700">1 polygon 1<span class="bg-red-200"> @ </span>10.00 10.00 1.00
2 polygon 1<span class="bg-red-200"> @ </span>10.00 20.00 1.05
3 polygon 1<span class="bg-red-200"> @ </span>20.00 20.00 1.10</pre>
        </div>
      </div>

      <div class="border-l-4 border-gray-300 pl-4">
        <h6 class="font-semibold text-gray-900 mb-1">Modus: "End" (Flexible Vermessung)</h6>
        <p class="text-gray-600 text-sm mb-2">
          Der Geometrietyp wird bei der letzten Messung entschieden. Das Tag erscheint nur beim letzten Stützpunkt.
        </p>
        <div class="bg-gray-50 p-3 rounded">
          <p class="text-xs text-gray-600 mb-1">Beispiel:</p>
          <pre class="text-xs text-gray-700">1 polygon 1 10.00 10.00 1.00
2 polygon 1 10.00 20.00 1.05
4 polygon 1<span class="bg-red-200"> @ </span>20.00 10.00 1.00</pre>
        </div>
      </div>

      <div class="border-l-4 border-gray-300 pl-4">
        <h6 class="font-semibold text-gray-900 mb-1">Modus: "None" (Nur Punkte)</h6>
        <p class="text-gray-600 text-sm mb-2">
          Keine Geometrie-Markierungen. Alle Messungen sind einfache Punkte (z.B. Höhenmodelle).
        </p>
        <div class="bg-gray-50 p-3 rounded">
          <p class="text-xs text-gray-600 mb-1">Beispiel:</p>
          <pre class="text-xs text-gray-700">1 10.00 10.00 1.00
2 10.00 20.00 1.05
3 20.00 20.00 1.10</pre>
        </div>
      </div>
    </div>
  </div>

  <!-- Understanding the Forms -->
  <div class="bg-white rounded-lg shadow-sm p-5 mb-4">
    <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
      <span class="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
      <span>Die zwei Formulare verstehen</span>
    </h4>
    <p class="text-gray-600 text-sm mb-4">
      Das Erstellen eines Parsers erfordert das Ausfüllen von zwei Arten von Formularen: ein Parser-Abschnitt und mehrere Feld-Abschnitte.
    </p>

    <div class="mb-4">
      <h6 class="font-semibold text-gray-900 mb-2">Parser-Abschnitt Formular</h6>
      <div class="border-l-4 border-blue-500 pl-4">
      <p class="text-gray-600 text-sm mb-2">
        <img src="img/parser.jpeg" alt="Parser-Abschnitt Formular" class="border mb-2 h-80"><br>
        <strong>Zweck:</strong> Definiert die Gesamtstruktur und Regeln zum Lesen Ihrer Datendatei. <br>
        Dies teilt Survey2GIS mit, welche Felder Koordinaten enthalten, welche Zeichen Geometrietypen markieren 
        und welcher Parser-Modus verwendet werden soll.
      </p>
      <p class="text-gray-600 text-sm">
        <strong>Sie füllen dies einmal aus</strong> - es enthält globale Einstellungen für Ihre gesamte Datendatei.
      </p>
      <div class="space-y-4 mt-4">
        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Name (Erforderlich)</h6>
          <p class="text-gray-600 text-sm">Geben Sie Ihrem Parser einen beschreibenden Namen zur Identifikation.</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Tagging-Modus (Erforderlich)</h6>
          <p class="text-gray-600 text-sm mb-2">Wählen Sie den Parser-Modus, der zu Ihrer Datenstruktur passt (siehe oben).</p>
          <p class="text-sm text-gray-700">Optionen: <code class="bg-gray-100 px-1">min</code>, <code class="bg-gray-100 px-1">max</code>, <code class="bg-gray-100 px-1">end</code>, <code class="bg-gray-100 px-1">none</code></p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Geometrie-Tags</h6>
          <p class="text-gray-600 text-sm mb-2">Definieren Sie spezielle Markierungen, die verschiedene Geometrietypen in Ihren Daten identifizieren.</p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li><strong>geom tag point:</strong> z.B. "*" (optional für einige Modi)</li>
            <li><strong>geom tag line:</strong> z.B. "-" (erforderlich außer "None")</li>
            <li><strong>geom tag poly:</strong> z.B. "@" (erforderlich außer "None")</li>
          </ul>
          <p class="text-xs text-gray-500 mt-1">Tags müssen eindeutig sein und dürfen sich nicht mit Feldtrennzeichen überschneiden.</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Tag-Feld</h6>
          <p class="text-gray-600 text-sm">Das Feld, das die Geometrie-Markierungen enthält. Muss für alle Modi außer "None" definiert werden.</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Schlüssel-Feld</h6>
          <p class="text-gray-600 text-sm">Feld mit Werten, die Messungen verknüpfen, die zur selben Geometrie gehören. Erforderlich für die Modi "End" und "Max".</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Kommentarzeichen (Optional)</h6>
          <p class="text-gray-600 text-sm">Zeichen, die Kommentare in Ihren Daten markieren (z.B. # oder //). Text nach diesen wird ignoriert.</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Keine-Daten-Wert (Optional)</h6>
          <p class="text-gray-600 text-sm">Ganzzahlwert, der null/fehlende Daten repräsentiert (z.B. -99999). Wird verwendet, wenn Felder leer sind.</p>
        </div>
      </div>
      </div>
    </div>

    <div class="">
      <h6 class="font-semibold text-gray-900 mb-2">Feld-Abschnitt Formulare</h6>
            <div class="border-l-4 border-green-500 pl-4">

      <p class="text-gray-600 text-sm mb-2">
        <img src="img/field.jpeg" alt="Feld-Abschnitt Formular" class="border mb-2 h-80"><br>
        <strong>Zweck:</strong> Beschreibt jede Datenspalte in Ihrer Datei - ihren Namen, Datentyp (integer, double, text) 
        und wie sie vom nächsten Feld getrennt ist.
      </p>
      <p class="text-gray-600 text-sm mb-3">
        <strong>Sie benötigen einen Feld-Abschnitt für jede Spalte</strong> in Ihren Daten, definiert in der exakten Reihenfolge, in der sie erscheinen (von links nach rechts).
      </p>
      <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded text-sm">
        <p class="text-gray-800 mb-0">
          <strong>Beispiel:</strong> Wenn Ihre Daten so aussehen: <code class="bg-white px-1 py-0.5">1 boundary @ 10.00 20.00 1.50</code><br>
          Benötigen Sie 6 Feld-Abschnitte: ID (integer), label (text), tag (text), X (double), Y (double), Z (double)
        </p>
      </div>
      <p class="text-gray-600 text-sm mb-4 mt-4">
        Fügen Sie einen Feld-Abschnitt für jede Spalte in Ihren Tachymeter-Daten hinzu. Felder müssen in derselben Reihenfolge sein, wie sie in Ihren Daten erscheinen.
      </p>

      <div class="space-y-4">
        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Feldname (Erforderlich)</h6>
          <p class="text-gray-600 text-sm">Bezeichner für Ihr Feld (max. 10 Zeichen). Gültig: nur Buchstaben, Zahlen, Unterstrich.</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Feldtyp (Erforderlich)</h6>
          <p class="text-gray-600 text-sm mb-2">Definiert den Datentyp des Feldes:</p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li><strong>integer:</strong> Ganze Zahlen (-1, 0, 100)</li>
            <li><strong>double:</strong> Dezimalzahlen (-10.05, 0.0) - erforderlich für Koordinaten</li>
            <li><strong>text:</strong> Generischer Textinhalt</li>
          </ul>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Trennzeichen (Erforderlich außer für letztes Feld)</h6>
          <p class="text-gray-600 text-sm">Zeichen, die dieses Feld vom nächsten trennen. Kann mehrere Zeichen oder spezielle Werte verwenden: "tab" und "space".</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Koordinatenfelder (Erforderlich)</h6>
          <p class="text-gray-600 text-sm mb-2">Nach der Definition Ihrer Felder geben Sie an, welche Koordinaten enthalten:</p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li><strong>coor x:</strong> Feldname für X-Koordinaten (erforderlich, Typ: double)</li>
            <li><strong>coor y:</strong> Feldname für Y-Koordinaten (erforderlich, Typ: double)</li>
            <li><strong>coor z:</strong> Feldname für Z-Koordinaten (optional, Typ: double)</li>
          </ul>
        </div>
      </div>

      <h4 class="text-lg font-semibold text-gray-900 mb-3 mt-6 flex items-center gap-2">
        <span>Optionale Feld-Einstellungen</span>
      </h4>
      
      <div class="space-y-3">
        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Leer erlaubt</h6>
          <p class="text-gray-600 text-sm">Erlaubt, dass Felder leer sind. Kann nicht mit Schlüssel- oder Tag-Feldern verwendet werden.</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Feld überspringen</h6>
          <p class="text-gray-600 text-sm">Verarbeiten Sie das Feld, speichern Sie es aber nicht in der Ausgabe (nützlich für unerwünschte Datenspalten).</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Groß-/Kleinschreibung ändern</h6>
          <p class="text-gray-600 text-sm">Text in Groß-/Kleinbuchstaben umwandeln (nur Textfelder).</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Textersetzung (@)</h6>
          <p class="text-gray-600 text-sm">Codes durch vollständigen Text ersetzen (z.B. @P1 = Punkt vom Typ 1).</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Anführungszeichen</h6>
          <p class="text-gray-600 text-sm">Anführungszeichen aus Textfeldinhalt entfernen (z.B. ' oder ").</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Trennzeichen zusammenführen</h6>
          <p class="text-gray-600 text-sm">Aufeinanderfolgende Trennzeichen als eines behandeln (nützlich für variable Leerzeichen).</p>
        </div>
      </div>
    </div>
    </div>
  </div>

  <!-- Important Notes -->
  <div class="bg-white rounded-lg shadow-sm p-5">
    <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
      <span class="bg-yellow-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
      <span>Wichtige Hinweise</span>
    </h4>
    <ul class="space-y-1 text-sm text-gray-700 mb-0 list-disc list-inside pl-3">
      <li>Geometrie-Tags müssen eindeutig sein und dürfen sich nicht mit Feldtrennzeichen überschneiden</li>
      <li>Koordinatenfelder müssen vom Typ "double" sein</li>
      <li>Die Feldreihenfolge muss exakt mit Ihrer Datendatei übereinstimmen</li>
      <li>Polygone werden automatisch geschlossen (keine doppelten Stützpunkte erforderlich)</li>
      <li>Schlüssel-Feldwerte sind groß-/kleinschreibungssensitiv</li>
      <li>Stützpunkte einer Geometrie müssen in derselben Datei und aufeinanderfolgend sein (nur durch Kommentare unterbrochen)</li>
    </ul>
  </div>

</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  section: {  
    type: String,
    default: 'introduction'
  }
});

const activeTab = ref('introduction');

// Map section to tab
watch(() => props.section, (newSection) => {
  const mapping = {
    'field': 'parser',
    'parser': 'parser',
    'interface': 'interface',
    'help': 'introduction'
  };
  activeTab.value = mapping[newSection] || 'introduction';
}, { immediate: true });

// Expose method to allow parent to change tab programmatically
const openTab = (tabName) => {
  if (['introduction', 'interface', 'parser'].includes(tabName)) {
    activeTab.value = tabName;
  }
};

defineExpose({
  openTab
});
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>