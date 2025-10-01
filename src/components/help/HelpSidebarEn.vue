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
          Introduction
        </button>
        <button 
          class="flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2"
          :class="activeTab === 'interface' ? 'text-blue-600 border-blue-600 bg-blue-50' : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'"
          @click="activeTab = 'interface'"
        >
          Website UI
        </button>
        <button 
          class="flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2"
          :class="activeTab === 'parser' ? 'text-blue-600 border-blue-600 bg-blue-50' : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'"
          @click="activeTab = 'parser'"
        >
          Define Parser
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="flex-1  p-6">
      
      <!-- Introduction Content -->
      <div v-show="activeTab === 'introduction'">
        <h2 class="text-2xl font-bold text-gray-900 mb-3">Survey2GIS Parser Builder</h2>
        <p class="text-gray-600 mb-6">
          This tool helps you create parser files that enable Survey2GIS to convert your tachymeter data into Shapefiles, GeoJSON, and other GIS formats.
        </p>

        <div class="border-blue-500 rounded mb-6">
          <h5 class="font-semibold text-blue-900 mb-3">What is a Parser File?</h5>
          <p class="text-sm mb-4">
            A parser file is a configuration that tells Survey2GIS how to read and interpret your tachymeter data. <br>
            It defines which columns contain coordinates, what characters mark different geometry types, and how to process the measurements.
          </p>
          
          <h6 class="font-semibold text-blue-900 mb-2 text-sm">Compatible with:</h6>
          <ul class="space-y-2 text-sm">
            <li>
              <strong>Command Line Tool:</strong> 
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
              <strong>Full Documentation:</strong>
            </p>
            <a href="https://s2g-docs.survey-tools.org/parser-schema.html" class="text-blue-700 hover:text-blue-600 font-medium underline text-sm" target="_blank" rel="noopener noreferrer">
              Parser Schema Documentation
            </a>
          </div>
        </div>
      </div>

      <!-- Interface Content -->
      <div v-show="activeTab === 'interface'">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Understanding the Interface</h2>

        <div class="space-y-4">
          <div class="bg-white rounded-lg shadow-sm p-5">
            <h5 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span class="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              The Navigation Bar
            </h5>
            <p class="text-gray-600 mb-3">
                <img src="img/nav.jpeg" alt="Survey2GIS Navigation" class="border mb-3">

                From left to right:
                <ol class="list-decimal list-inside space-y-1 mt-2">
                  <li>Logo and Home Button - Click to return to the homepage</li>
                  <li>Select for:
                    <ul class="list-disc list-inside pl-6">
                      <li>Uploading a parser file locally saved on your hard drive</li>
                      <li>Load a sample parser file for learning purposes</li>
                      <li>Search the community parser library for shared configurations</li>
                    </ul>
                  </li>
                  <li>Switch between German and English language</li>
                  <li>Imprint of this website</li>
                  <li>Open this help sidebar</li>
                </ol>
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-5">
            <h5 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span class="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Start a New Parser
            </h5>
            <p class="text-gray-600 mb-3">
                On the left side, click the following button to start a new parser configuration.
            </p>
            <img src="img/start_new.jpeg" alt="Start new parser" class="border mb-3">
            <p class="text-gray-600">
                You will see your defined parser in live preview on the right side.
            </p>
            <img src="img/parser_definition.jpeg" alt="Parser GUI" class="border mt-2 mb-2">
            <p class="text-gray-600 text-sm">
                For more information visit the next tab "Define Parser".
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-5">
            <h5 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span class="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Parser Repository
            </h5>
            <p class="text-gray-600 mb-3">
                By choosing the "Search Community Parsers" option in the navigation bar you can access the parser repository.
            </p>
            <img src="img/parser_repository.jpeg" alt="Parser Repository" class="border mb-2">
            <p class="text-gray-600 text-sm">
                Here you can search for parsers shared by the community. You can filter by name.
            </p>
          </div>
        </div>
      </div>

      <!-- Parser Content -->
<div v-show="activeTab === 'parser'">
  <h2 class="text-2xl font-bold text-gray-900 mb-4">How to Define a Parser</h2>
  <p class="text-gray-600 mb-6">Understanding parser modes and configuring your parser file.</p>

  <!-- Understanding Parser Modes -->
  <div class="bg-white rounded-lg shadow-sm p-5 mb-4">
    <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
      <span class="bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
      <span>Understanding Parser Modes</span>
    </h4>
    <p class="text-gray-600 text-sm mb-4">
      Before creating your parser, understand how your tachymeter data is structured. 
      Choose the mode that matches your data format.
    </p>

    <div class="space-y-4">
      <div class="border-l-4 border-gray-300 pl-4">
        <h6 class="font-semibold text-gray-900 mb-1">Mode: "Min" (Minimal Coding)</h6>
        <p class="text-gray-600 text-sm mb-2">
          Best for reducing field work. Only the first vertex of lines/polygons needs full attributes.
        </p>
        <div class="bg-gray-50 p-3 rounded">
          <p class="text-xs text-gray-600 mb-1">Example:</p>
          <pre class="text-xs text-gray-700">1 polygon 1<span class="bg-red-200"> @ </span>10.00 10.00 1.00
10.00 20.00 1.05
20.00 20.00 1.10</pre>
        </div>
      </div>

      <div class="border-l-4 border-gray-300 pl-4">
        <h6 class="font-semibold text-gray-900 mb-1">Mode: "Max" (Maximum Control)</h6>
        <p class="text-gray-600 text-sm mb-2">
          Every measurement must have a geometry tag. Each vertex has complete attributes. Requires separate key field.
        </p>
        <div class="bg-gray-50 p-3 rounded">
          <p class="text-xs text-gray-600 mb-1">Example:</p>
          <pre class="text-xs text-gray-700">1 polygon 1<span class="bg-red-200"> @ </span>10.00 10.00 1.00
2 polygon 1<span class="bg-red-200"> @ </span>10.00 20.00 1.05
3 polygon 1<span class="bg-red-200"> @ </span>20.00 20.00 1.10</pre>
        </div>
      </div>

      <div class="border-l-4 border-gray-300 pl-4">
        <h6 class="font-semibold text-gray-900 mb-1">Mode: "End" (Flexible Surveying)</h6>
        <p class="text-gray-600 text-sm mb-2">
          Geometry type is decided at the final measurement. Tag appears only on last vertex.
        </p>
        <div class="bg-gray-50 p-3 rounded">
          <p class="text-xs text-gray-600 mb-1">Example:</p>
          <pre class="text-xs text-gray-700">1 polygon 1 10.00 10.00 1.00
2 polygon 1 10.00 20.00 1.05
4 polygon 1<span class="bg-red-200"> @ </span>20.00 10.00 1.00</pre>
        </div>
      </div>

      <div class="border-l-4 border-gray-300 pl-4">
        <h6 class="font-semibold text-gray-900 mb-1">Mode: "None" (Points Only)</h6>
        <p class="text-gray-600 text-sm mb-2">
          No geometry markers. All measurements are simple points (e.g., elevation models).
        </p>
        <div class="bg-gray-50 p-3 rounded">
          <p class="text-xs text-gray-600 mb-1">Example:</p>
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
      <span>Understanding the Two Forms</span>
    </h4>
    <p class="text-gray-600 text-sm mb-4">
      Creating a parser requires filling out two types of forms: one Parser Section and multiple Field Sections.
    </p>

    <div class="mb-4">
      <h6 class="font-semibold text-gray-900 mb-2">Parser Section Form</h6>
      <div class="border-l-4 border-blue-500 pl-4">
      <p class="text-gray-600 text-sm mb-2">
        <img src="img/parser.jpeg" alt="Parser Section Form" class="border mb-2 h-80"><br>
        <strong>Purpose:</strong> Defines the overall structure and rules for reading your data file. <br>
        This tells Survey2GIS which fields contain coordinates, what characters mark geometry types, 
        and which parser mode to use.
      </p>
      <p class="text-gray-600 text-sm">
        <strong>You fill this out once</strong> - it contains global settings for your entire data file.
      </p>
      <div class="space-y-4 mt-4">
        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Name (Required)</h6>
          <p class="text-gray-600 text-sm">Give your parser a descriptive name for identification.</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Tagging Mode (Required)</h6>
          <p class="text-gray-600 text-sm mb-2">Select the parser mode that matches your data structure (see above).</p>
          <p class="text-sm text-gray-700">Options: <code class="bg-gray-100 px-1">min</code>, <code class="bg-gray-100 px-1">max</code>, <code class="bg-gray-100 px-1">end</code>, <code class="bg-gray-100 px-1">none</code></p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Geometry Tags</h6>
          <p class="text-gray-600 text-sm mb-2">Define special markers that identify different geometry types in your data.</p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li><strong>geom tag point:</strong> e.g., "*" (optional for some modes)</li>
            <li><strong>geom tag line:</strong> e.g., "-" (required except "None")</li>
            <li><strong>geom tag poly:</strong> e.g., "@" (required except "None")</li>
          </ul>
          <p class="text-xs text-gray-500 mt-1">Tags must be unique and not overlap with field separators.</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Tag Field</h6>
          <p class="text-gray-600 text-sm">The field that contains the geometry markers. Must be defined for all modes except "None".</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Key Field</h6>
          <p class="text-gray-600 text-sm">Field containing values that link measurements belonging to the same geometry. Required for "End" and "Max" modes.</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Comment Mark (Optional)</h6>
          <p class="text-gray-600 text-sm">Characters that mark comments in your data (e.g., # or //). Text after these will be ignored.</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">No Data Value (Optional)</h6>
          <p class="text-gray-600 text-sm">Integer value representing null/missing data (e.g., -99999). Used when fields are empty.</p>
        </div>
      </div>
      </div>
    </div>

    <div class="">
      <h6 class="font-semibold text-gray-900 mb-2">Field Section Forms</h6>
            <div class="border-l-4 border-green-500 pl-4">

      <p class="text-gray-600 text-sm mb-2">
        <img src="img/field.jpeg" alt="Field Section Form" class="border mb-2 h-80"><br>
        <strong>Purpose:</strong> Describes each data column in your file - its name, data type (integer, double, text), 
        and how it's separated from the next column.
      </p>
      <p class="text-gray-600 text-sm mb-3">
        <strong>You need one Field Section for each column</strong> in your data, defined in the exact order they appear (left to right).
      </p>
      <div class="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded text-sm">
        <p class="text-gray-800 mb-0">
          <strong>Example:</strong> If your data looks like: <code class="bg-white px-1 py-0.5">1 boundary @ 10.00 20.00 1.50</code><br>
          You need 6 Field Sections: ID (integer), label (text), tag (text), X (double), Y (double), Z (double)
        </p>
      </div>
      <p class="text-gray-600 text-sm mb-4 mt-4">
        Add one field section for each column in your tachymeter data. Fields must be in the same order as they appear in your data.
      </p>

      <div class="space-y-4">
        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Field Name (Required)</h6>
          <p class="text-gray-600 text-sm">Identifier for your field (max 10 characters). Valid: letters, numbers, underscore only.</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Field Type (Required)</h6>
          <p class="text-gray-600 text-sm mb-2">Defines the data type of the field:</p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li><strong>integer:</strong> Whole numbers (-1, 0, 100)</li>
            <li><strong>double:</strong> Decimal numbers (-10.05, 0.0) - required for coordinates</li>
            <li><strong>text:</strong> Generic text content</li>
          </ul>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Separator (Required except last field)</h6>
          <p class="text-gray-600 text-sm">Characters separating this field from the next. Can use multiple characters or special values: "tab" and "space".</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Coordinate Fields (Required)</h6>
          <p class="text-gray-600 text-sm mb-2">After defining your fields, specify which ones contain coordinates:</p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li><strong>coor x:</strong> Field name for X coordinates (required, type: double)</li>
            <li><strong>coor y:</strong> Field name for Y coordinates (required, type: double)</li>
            <li><strong>coor z:</strong> Field name for Z coordinates (optional, type: double)</li>
          </ul>
        </div>
      </div>

      <h4 class="text-lg font-semibold text-gray-900 mb-3 mt-6 flex items-center gap-2">
        <span>Optional Field Settings</span>
      </h4>
      
      <div class="space-y-3">
        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Empty Allowed</h6>
          <p class="text-gray-600 text-sm">Allow fields to be empty. Cannot be used with key or tag fields.</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Skip Field</h6>
          <p class="text-gray-600 text-sm">Process but don't save this field in output (useful for unwanted data columns).</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Change Case</h6>
          <p class="text-gray-600 text-sm">Convert text to upper/lower case (text fields only).</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Text Replacement (@)</h6>
          <p class="text-gray-600 text-sm">Replace codes with full text (e.g., @P1 = Point of type 1).</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Quotation</h6>
          <p class="text-gray-600 text-sm">Remove quotation marks from text field content (e.g., ' or ").</p>
        </div>

        <div>
          <h6 class="font-semibold text-gray-900 text-sm mb-1">Merge Separators</h6>
          <p class="text-gray-600 text-sm">Treat adjacent separators as one (useful for variable whitespace).</p>
        </div>
      </div>
    </div>
    </div>
  </div>

  <!-- Important Notes -->
  <div class="bg-white rounded-lg shadow-sm p-5">
    <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
      <span class="bg-yellow-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
      <span>Important Considerations</span>
    </h4>
    <ul class="space-y-1 text-sm text-gray-700 mb-0 list-disc list-inside pl-3">
      <li>Geometry tags must be unique and not overlap with field separators</li>
      <li>Coordinate fields must be type "double"</li>
      <li>Field order must exactly match your data file</li>
      <li>Polygons are automatically closed (no duplicate vertices needed)</li>
      <li>Key field values are case-sensitive</li>
      <li>Vertices of one geometry must be in the same file and consecutive (only interrupted by comments)</li>
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