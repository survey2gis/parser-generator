<!-- HelpSidebar.vue -->
<template>
    <div 
      v-if="isVisible" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
      @click.self="close"
    >
      <div class="w-1/2 bg-white h-full p-4 overflow-y-auto">
        <div class="flex justify-between items-center mb-1">
          <h1 class="text-xl font-semibold">{{ title }}</h1>
          <button @click="close" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
  
        <!-- Parser Section Help Content -->
        <div v-if="section === 'parser'" class="prose prose-sm">
          
          <div class="mb-8">
            <p class="text-gray-600 mb-1">
                This guide explains how to configure the parser section [Parser] in your configuration file. Each option controls specific aspects of how your input data is processed and interpreted.
            </p>
        </div>

        <div class="space-y-8">
            <!-- Required Options Section -->
            <div class="border-b pb-6">
                <h4 class="text-xl font-semibold mb-1 text-blue-600">Required Options</h4>
                
                <div class="grid gap-6">
                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h3 class="font-semibold text-gray-800 text-lg">Coordinates (Required)</h3>
                        <div class="mt-3 space-y-3">
                            <p class="text-gray-600">Specifies which fields in your input data contain the spatial coordinates of your measurements. The X and Y coordinates are mandatory, while Z is optional.</p>
                            
                            <ul class="list-disc list-inside text-gray-600 ml-4 space-y-1">
                                <li><span class="font-medium">coor x, coor y:</span> Must be specified and reference existing numeric fields of type "double"</li>
                                <li><span class="font-medium">coor z:</span> Optional - if not specified, Z coordinates default to 0.0</li>
                            </ul>
                            
                            <code class="block bg-gray-100mt-2 text-sm rounded">
                                coor x = xfield<br>
                                coor y = yfield<br>
                                coor z = zfield
                            </code>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h3 class="font-semibold text-gray-800 text-lg">Geometry Tags (Required)</h3>
                        <div class="mt-3 space-y-3">
                            <p class="text-gray-600">Defines special markers that identify different types of geometries in your data. These tags allow the parser to convert simple point measurements into complex geometries like lines and polygons.</p>
                            
                            <ul class="list-disc list-inside text-gray-600 ml-4 space-y-1">
                                <li><span class="font-medium">geom tag point:</span> Marks point features (optional in some parser modes)</li>
                                <li><span class="font-medium">geom tag line:</span> Marks line features</li>
                                <li><span class="font-medium">geom tag poly:</span> Marks polygon features</li>
                            </ul>
                            
                            <p class="text-gray-600">You can define up to 32 tags per geometry type, but they must be unique and not overlap with field separators or quotation marks.</p>
                            
                            <code class="block bg-gray-100mt-2 text-sm rounded">
                                geom tag point = "*"<br>
                                geom tag line = "-"<br>
                                geom tag poly = "@"<br>
                                geom tag poly = "@ "  # Alternative polygon tag
                            </code>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h3 class="font-semibold text-gray-800 text-lg">Key Field (Required for some modes)</h3>
                        <div class="mt-3 space-y-3">
                            <p class="text-gray-600">Specifies the field that contains identifier values linking multiple measurements that belong to the same geometry (like points in a line or polygon).</p>
                            
                            <ul class="list-disc list-inside text-gray-600 ml-4 space-y-1">
                                <li>Mandatory for parser modes "End" and "Max"</li>
                                <li>All measurements with the same key value are considered part of the same geometry</li>
                                <li>Can be used with "key unique" option to handle multi-part geometries</li>
                            </ul>
                            
                            <code class="block bg-gray-100mt-2 text-sm rounded">
                                key field = key<br>
                                key unique = yes  # Optional, for multi-part geometries
                            </code>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h3 class="font-semibold text-gray-800 text-lg">Tagging Mode (Required)</h3>
                        <div class="mt-3 space-y-3">
                            <p class="text-gray-600">Determines how the parser interprets geometry tags and processes measurements into features.</p>
                            
                            <ul class="list-disc list-inside text-gray-600 ml-4 space-y-1">
                                <li><span class="font-medium">min:</span> Minimal tagging - typically used when each geometry has one record with complete attributes</li>
                                <li><span class="font-medium">max:</span> Maximum tagging - for complex geometries with multiple attribute records</li>
                                <li><span class="font-medium">end:</span> End tagging - processes geometries based on ending markers</li>
                                <li><span class="font-medium">none:</span> No tagging - treats all records as simple point measurements</li>
                            </ul>
                            
                            <code class="block bg-gray-100mt-2 text-sm rounded">
                                tagging mode = end
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Optional Options Section -->
            <div>
                <h4 class="text-xl font-semibold mb-1 text-green-600">Optional Settings</h4>
                
                <div class="grid gap-6">
                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h3 class="font-semibold text-gray-800 text-lg">Comment Mark</h3>
                        <div class="mt-3 space-y-3">
                            <p class="text-gray-600">Defines special characters that mark the beginning of comments in your input data. Any text after these markers will be ignored during processing.</p>
                            
                            <ul class="list-disc list-inside text-gray-600 ml-4">
                                <li>Multiple comment marks can be specified</li>
                                <li>Must not conflict with field separators or quotation marks</li>
                            </ul>
                            
                            <code class="block bg-gray-100mt-2 text-sm rounded">
                                comment mark = #<br>
                                comment mark = //
                            </code>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h4 class="font-semibold text-gray-800 text-lg">No Data Value</h4>
                        <div class="mt-3 space-y-3">
                            <p class="text-gray-600">Specifies an integer value to represent null or missing data in your attributes. This value should be unique and not appear in valid data.</p>
                            
                            <p class="text-gray-600">This value will be written to output files when a field is empty or contains no valid data.</p>
                            
                            <code class="block bg-gray-100mt-2 text-sm rounded">
                                no data = -99999
                            </code>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h4 class="font-semibold text-gray-800 text-lg">Tag Strict Mode</h4>
                        <div class="mt-3 space-y-3">
                            <p class="text-gray-600">Controls how strictly the parser enforces geometry tagging rules. When enabled, every measurement must contain a valid geometry tag or it will be discarded.</p>
                            
                            <p class="text-gray-600">Defaults to "off" if not specified. Enable this for stricter data validation.</p>
                            
                            <code class="block bg-gray-100mt-2 text-sm rounded">
                                tag strict = yes
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8 p-6 bg-blue-50 rounded-lg">
            <h4 class="font-semibold text-blue-800 mb-3 text-lg">Important Considerations</h4>
            <ul class="list-disc list-inside space-y-1 text-blue-700">
                <li>All geometry tags must be unique and not overlap with other special characters</li>
                <li>Coordinate fields must be numeric and of type "double"</li>
                <li>When using the key field, consider whether your geometries might have multiple parts</li>
                <li>The parser mode significantly affects how your data is processed - choose carefully</li>
                <li>Tag strict mode can help catch data errors but may discard valid measurements if not properly tagged</li>
            </ul>
        </div>

        </div>
  
        <!-- Imprint  Content -->
        <div v-if="section === 'imprint'" class="prose prose-sm">

        <!-- Contact Information Card -->
        <div class="bg-white rounded-lg mb-3 mt-6">
            <h4 class="text-xl font-bold text-gray-800 mb-1">Anbieter</h4>
            <div class="space-y-1 text-gray-600">
                <p class="font-medium">
                    Landesamt für Denkmalpflege im Regierungspräsidium Stuttgart<br>
                    Berliner Straße 12<br>
                    73728 Esslingen (Neckar)</p>
            </div>
            

        </div>

        <!-- Usage Terms Card -->
        <div class="bg-white rounded-lg mb-3">
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
        <div class="bg-white rounded-lg mb-3">
            <h4 class="text-xl font-bold text-gray-800 mb-1">Projektteam</h4>
            <ul class="space-y-1 text-gray-600">
                <li>Jonas Abele</li>
                <li>Claus Brenner</li>
                <li>José Canalejo</li>
                <li>Toni Schönbuchner</li>
            </ul>
        </div>

        <!-- Implementation Details Card -->
        <div class="bg-white rounded-lg ">
            <h4 class="text-xl font-bold text-gray-800 mb-1">Projektumsetzung</h4>
            <div class="text-gray-600">
                <p class="font-medium">CSGIS GbR</p>
                <p>Am Eichbüchl 7</p>
                <p>D - 82223 Eichenau</p>
                <a href="http://www.csgis.de" target="_blank" rel="noopener noreferrer" 
                   class="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                    www.csgis.de
                </a>
            </div>
        </div>
        </div>

        <!-- Help  Content -->
        <div v-if="section === 'help'" class="prose prose-sm">
          <p class="text-lg text-gray-600 mb-8">A web tool to create parser files for Survey2GIS.</p>

                <!-- Quick Start -->
                <div class="bg-blue-50 rounded-lg p-6 mb-8">
                <h4 class="text-xl font-semibold text-blue-900 mb-4">🚀 Quick Start</h4>
                <ol class="space-y-2 text-blue-900">
                    <li>1. Start with the <span class="font-semibold">Parser Section</span> at the top</li>
                    <li>2. Fill in the required fields (marked with <span class="text-red-500">*</span>)</li>
                    <li>3. Add <span class="font-semibold">Field Sections</span> for each data field</li>
                    <li>4. Download your configuration file</li>
                </ol>
                </div>

                <!-- Required Settings -->
                <div class="mb-8">
                <h4 class="text-xl font-semibold text-gray-900 mb-4">Required Settings</h4>

                <!-- Parser Section -->
                <div class="bg-white shadow rounded-lg p-6 mb-6">
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">⚙️ Parser Section</h4>
                    <p class="text-gray-600 mb-2">These fields must be filled out:</p>
                    <ul class="space-y-2 text-gray-700">
                    <li class="flex items-start">
                        <span class="font-semibold min-w-[100px]">Name:</span>
                        <span>Your configuration name</span>
                    </li>
                    <li class="flex items-start">
                        <span class="font-semibold min-w-[100px]">COORX:</span>
                        <span>Field name for X coordinates</span>
                    </li>
                    <li class="flex items-start">
                        <span class="font-semibold min-w-[100px]">COORY:</span>
                        <span>Field name for Y coordinates</span>
                    </li>
                    </ul>
                </div>

                <!-- Field Sections -->
                <div class="bg-white shadow rounded-lg p-6">
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">📝 Field Sections</h4>
                    <p class="text-gray-600 mb-3">For each field you need to specify:</p>
                    <div class="space-y-4">
                    <div>
                        <h4 class="font-semibold text-gray-900">Name</h4>
                        <p class="text-gray-600">Maximum 10 characters, letters, numbers, and underscores only</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-900">Type</h4>
                        <ul class="list-disc ml-5 text-gray-600">
                        <li>integer (whole numbers)</li>
                        <li>double (decimal numbers)</li>
                        <li>text (text strings)</li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>

                <!-- Common Tasks -->
                <div class="mb-8">
                <h4 class="text-xl font-semibold text-gray-900 mb-4">Common Tasks</h4>
                
                <!-- Creating Fields -->
                <div class="bg-white shadow rounded-lg p-6 mb-6">
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">Creating a New Field</h4>
                    <ol class="space-y-2 text-gray-600">
                    <li>1. Click the "Add Field Section" button</li>
                    <li>2. Fill in the required Name and Type</li>
                    <li>3. Adjust optional settings as needed</li>
                    </ol>
                </div>
        </div>



            <!-- Parser Modes Section -->
            <div class="mt-12">
                <h4 class="text-xl font-semibold mb-3 text-green-600">Parser Modes</h4>
                <div class="bg-gray-50 p-6 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-1">Understanding Geometry Processing</h4>
                    
                    <div class="space-y-6">
                        <div>
                            <h4 class="font-medium text-gray-700">Key Limitations</h4>
                            <ul class="list-disc list-inside text-gray-600 ml-4">
                                <li>Vertices of a single geometry must be in one file</li>
                                <li>Vertex measurements can only be interrupted by comments/empty lines</li>
                                <li>Available geometry types: point, line, polygon</li>
                            </ul>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-700">Geometry Markers</h4>
                            <ul class="list-disc list-inside text-gray-600 ml-4">
                                <li>Use special characters (e.g., @, $) to mark geometry types</li>
                                <li>Can be separate fields or added to existing fields</li>
                                <li>Must be declared in "tag field" option</li>
                            </ul>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-700">Important Notes</h4>
                            <ul class="list-disc list-inside text-gray-600 ml-4">
                                <li>Polygons are automatically closed - no need for duplicate vertices</li>
                                <li>Key field values are case-sensitive</li>
                                <li>Only one parser mode can be used per schema</li>
                            </ul>
                        </div>


                    </div>

                         <!-- Important Notes Section -->
                         <div class="mt-8 p-6 bg-blue-50 rounded-lg">
                            <h4 class="font-semibold text-blue-800 mb-3 text-lg">Important Considerations</h4>
                            <ul class="list-disc list-inside space-y-1 text-blue-700">
                                <li>Field names are limited to 10 characters and specific valid characters</li>
                                <li>Separator characters must be unique and not overlap with other special characters</li>
                                <li>Empty fields may not work correctly with whitespace separators</li>
                                <li>Text replacement only works on exact matches of field content</li>
                                <li>Parser modes affect how geometry markers and key fields are interpreted</li>
                            </ul>
                        </div>

                </div>
            </div>
        </div>

        <!-- Field Section Help Content -->
        <div v-if="section === 'field'" class="prose prose-sm">
          
          <div class="grid gap-6">
                <div class="bg-gray-50 p-6 rounded-lg">
                    <h4 class="font-semibold text-gray-800 text-lg">Required Field Options</h4>
                    <div class="mt-3 space-y-4">
                        <div>
                            <h4 class="font-medium text-gray-700">name (Required)</h4>
                            <p class="text-gray-600 mt-1">The identifier for your field (max 10 characters)</p>
                            <ul class="list-disc list-inside text-gray-600 ml-4 mt-2">
                                <li>Valid characters: letters, numbers, underscore</li>
                                <li>Case insensitive - stored in lowercase</li>
                            </ul>
                            <code class="block bg-gray-100mt-2 text-sm rounded">
                                name = index_fld
                            </code>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-700">type (Required)</h4>
                            <p class="text-gray-600 mt-1">Defines the data type of the field</p>
                            <ul class="list-disc list-inside text-gray-600 ml-4 mt-2">
                                <li><span class="font-medium">integer:</span> Whole numbers (-1, 0, 100)</li>
                                <li><span class="font-medium">double:</span> Floating point numbers (-10.05, 0.0)</li>
                                <li><span class="font-medium">text:</span> Generic text content</li>
                            </ul>
                            <code class="block bg-gray-100mt-2 text-sm rounded">
                                type = integer
                            </code>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-700">separator</h4>
                            <p class="text-gray-600 mt-1">Defines characters that separate fields (required except for last field)</p>
                            <ul class="list-disc list-inside text-gray-600 ml-4 mt-2">
                                <li>Can use multiple characters</li>
                                <li>Special values: "tab" and "space"</li>
                            </ul>
                            <code class="block bg-gray-100mt-2 text-sm rounded">
                                separator = ;<br>
                                separator = tab<br>
                                separator = space
                            </code>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 p-6 rounded-lg">
                    <h3 class="font-semibold text-gray-800 text-lg">Optional Field Settings</h3>
                    <div class="mt-3 space-y-4">
                        <div>
                            <h4 class="font-medium text-gray-700">empty allowed</h4>
                            <p class="text-gray-600 mt-1">Controls whether fields can be empty</p>
                            <ul class="list-disc list-inside text-gray-600 ml-4 mt-2">
                                <li>Default: off</li>
                                <li>Cannot be used with key or tag fields</li>
                                <li>Not compatible with merge_separators</li>
                            </ul>
                            <code class="block bg-gray-100mt-2 text-sm rounded">
                                empty allowed = yes
                            </code>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-700">change case</h4>
                            <p class="text-gray-600 mt-1">Converts text field content to upper or lower case</p>
                            <ul class="list-disc list-inside text-gray-600 ml-4 mt-2">
                                <li>Values: lower, upper, none</li>
                                <li>Only applies to text fields</li>
                            </ul>
                            <code class="block bg-gray-100mt-2 text-sm rounded">
                                change case = lower
                            </code>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-700">Text Replacement (@)</h4>
                            <p class="text-gray-600 mt-1">Replaces codes or abbreviations with full text</p>
                            <ul class="list-disc list-inside text-gray-600 ml-4 mt-2">
                                <li>Format: @old=new</li>
                                <li>Case insensitive matching</li>
                                <li>Max 254 characters for new text</li>
                            </ul>
                            <code class="block bg-gray-100mt-2 text-sm rounded">
                                @ABB = Abbreviation<br>
                                @P1 = Point of type 1
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
      </div>
  </template>
  
  <script>
  export default {
    name: 'HelpSidebar',
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      section: {
        type: String,
        required: true
      }
    },
    computed: {
      title() {
        const titles = {
          parser: 'Parser Section Help',
          field: 'Field Section Help',
          imprint: 'Imprint',
          help: 'Help',
        }
        return titles[this.section] || ''
      }
    },
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
  </script>
  
  <style scoped>
  .prose h4 { @apply text-lg font-semibold mb-2; }
  .prose h5 { @apply font-semibold mb-1; }
  .prose ul { @apply list-disc ml-4 mb-2; }
  .prose li { @apply mb-1; }
  </style>