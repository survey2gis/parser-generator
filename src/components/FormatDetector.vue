<template>
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">{{ $t('format.title') }}</h2>
  
      <!-- Input Area -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('format.paste_label') }}
        </label>
        <textarea 
          v-model="inputData"
          rows="10"
          class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :placeholder="$t('format.placeholder')"
        ></textarea>
      </div>
  
      <!-- Analyze Button -->
      <button
        @click="analyzeFormat"
        class="cursor-pointer px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        :disabled="!inputData"
      >
        {{ $t('format.analyze') }}
      </button>
  
      <!-- Results -->
      <div v-if="result" class="mt-6 p-4 bg-gray-50 rounded-md space-y-4">
        <h3 class="font-medium text-lg mb-3">{{ $t('format.results') }}</h3>
        
        <div class="space-y-2">
          <p class="text-sm">
            <span class="font-medium">{{ $t('format.detected_mode') }}:</span> 
            <span class="text-blue-600"> {{ result.mode }}</span>
          </p>
          <p class="text-sm">
            <span class="font-medium">{{ $t('format.explanation') }}:</span>
            <span class="ml-1">{{ result.explanation }}</span>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "FormatDetector",
    data() {
      return {
        inputData: "",
        result: null, // To store the final result
      };
    },
    methods: {
      analyzeFormat() {
        console.log("Starting format analysis...");
        console.log("Raw input data:", this.inputData);
  
        // Split and clean input lines
        let lines = this.inputData.split('\n').filter(line => line.trim());
        console.log("Input after splitting and cleaning:", lines);
  
        // Remove comments and descriptive lines
        lines = lines.filter(line => {
          const isComment = line.trim().startsWith('#');
          const isDescriptive = !/\d/.test(line); // Remove lines without numeric data
          console.log(`Analyzing line: "${line}" - Is comment: ${isComment}, Is descriptive: ${isDescriptive}`);
          return !(isComment || isDescriptive);
        });
        console.log("Filtered lines after removing comments/descriptions:", lines);
  
        // Check for End mode
        console.log("Checking for End mode...");
        if (this.isEndMode(lines)) {
          console.log("End mode detected!");
          this.result = {
            mode: 'End',
            explanation: 'The data follows the End mode pattern.',
          };
          return;
        } else {
          console.log("End mode not detected.");
        }
  
        // Check for Min mode
        console.log("Checking for Min mode...");
        if (this.isMinMode(lines)) {
          console.log("Min mode detected!");
          this.result = {
            mode: 'Min',
            explanation: 'The data follows the Min mode pattern.',
          };
          return;
        } else {
          console.log("Min mode not detected.");
        }
  
        // Check for Max mode
        console.log("Checking for Max mode...");
        if (this.isMaxMode(lines)) {
          console.log("Max mode detected!");
          this.result = {
            mode: 'Max',
            explanation: 'The data follows the Max mode pattern.',
          };
          return;
        } else {
          console.log("Max mode not detected.");
        }
  
        // Default to None mode
        console.log("No valid mode detected. Defaulting to None mode.");
        this.result = {
          mode: 'None',
          explanation: 'The data format could not be determined.',
        };
      },
  
      isEndMode(lines) {
        console.log("=== Checking for End mode ===");
        let currentKeyField = null;
        let isEndMode = false;
  
        for (const [index, line] of lines.entries()) {
          console.log(`Processing line ${index + 1}: "${line}"`);
  
          const parts = line.trim().split(/\s+/);
          if (parts.length < 4) {
            console.log(`Line rejected - Not enough parts.`);
            continue; // Skip invalid lines but continue processing other lines
          }
  
          const [keyFieldWithMarker, ...coords] = parts;
          const hasMarker = keyFieldWithMarker.includes('@');
  
          // Extract the last 3 parts as coordinates and validate
          const lastThreeParts = coords.slice(-3);
          if (lastThreeParts.length !== 3 || lastThreeParts.some(part => isNaN(parseFloat(part)))) {
            console.log(`Line skipped due to missing or invalid coordinates.`);
            continue;
          }
  
          if (hasMarker) {
            isEndMode = true;
          }
  
          if (!hasMarker && currentKeyField === null) {
            // Skip initial non-marker lines but continue processing others
            continue;
          }
  
          if (hasMarker) {
            currentKeyField = null; // Reset for next geometry
          }
        }
  
        console.log(`End mode detection result: ${isEndMode}`);
        return isEndMode;
      },
  
      isMinMode(lines) {
        console.log("=== Checking for Min mode ===");
        let isPolygonDetected = false;
        let reducedRecordDetected = false;
  
        for (const [index, line] of lines.entries()) {
          console.log(`Processing line ${index + 1}: "${line}"`);
  
          const parts = line.trim().split(/\s+/);
  
          if (line.includes('@')) {
            console.log(`Line contains '@': "${line}"`);
            isPolygonDetected = true;
          } else if (isPolygonDetected) {
            const isReducedRecord = parts.every(part => !isNaN(parseFloat(part)));
            if (isReducedRecord) {
              console.log(`Line recognized as reduced record: "${line}"`);
              reducedRecordDetected = true;
            } else {
              console.log(`Line does not match reduced record: "${line}"`);
              break;
            }
          }
        }
  
        const isMinMode = isPolygonDetected && reducedRecordDetected;
        console.log(`Min mode detection result: ${isMinMode}`);
        return isMinMode;
      },
  
      isMaxMode(lines) {
        console.log("=== Checking for Max mode ===");
  
        if (lines.length === 0) {
          console.log("No lines to process. Failing Max mode check.");
          return false;
        }
  
        let sharedCode = null; // Store shared code to validate consistency
  
        for (const [index, line] of lines.entries()) {
          console.log(`Processing line ${index + 1}: "${line}"`);
  
          const parts = line.trim().split(/\s+/);
          console.log(`Split line into parts:`, parts);
  
          // Validate line structure
          if (parts.length < 6) {
            console.log(`Line rejected - Not enough parts (found ${parts.length}, expected at least 6).`);
            continue; // Skip invalid lines but continue processing other lines
          }
  
          // Extract components
          const lineNumber = parts[0]; // Must be an integer
          const keyField = parts[2]; // The field that contributes to the shared code
          const geometryMarker = parts[3]; // Must be "@"
          const coordinates = parts.slice(4); // The remaining are coordinates
  
          // Extract the last 3 parts as coordinates and validate
          const lastThreeParts = coordinates.slice(-3);
          if (lastThreeParts.length !== 3 || lastThreeParts.some(part => isNaN(parseFloat(part)))) {
            console.log(`Line skipped due to missing or invalid coordinates.`);
            continue; // Skip invalid lines but continue processing other lines
          }
  
          // Validate line number (must be an integer)
          if (isNaN(parseInt(lineNumber, 10))) {
            console.log(`Line rejected - Line number "${lineNumber}" is not an integer.`);
            continue; // Skip invalid lines but continue processing other lines
          }
  
          // Validate the geometry marker
          if (geometryMarker !== "@") {
            console.log(`Line rejected - Missing or incorrect '@' marker: "${geometryMarker}".`);
            continue; // Skip invalid lines but continue processing other lines
          }
  
          // Check if we have a shared code, set for validation
          if (sharedCode === null) {
            sharedCode = keyField;
          } else if (sharedCode !== keyField) {
            console.log(`Shared code mismatch: Expected "${sharedCode}", but found "${keyField}".`);
            return false;
          }
        }
  
        const isMaxMode = sharedCode !== null;
        console.log(`Max mode detection result: ${isMaxMode}`);
        return isMaxMode;
      },
    },
  };
  </script>
  