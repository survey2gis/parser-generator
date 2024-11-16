export async function fetchParserData() {
    try {
      // Fetch parser.json
      const jsonResponse = await fetch('https://raw.githubusercontent.com/survey2gis/parser-repository/main/parser.json')
      if (!jsonResponse.ok) throw new Error('Failed to fetch parser list')
      const parserList = await jsonResponse.json()
  
      // Transform the data structure
      return Object.entries(parserList).map(([key, value]) => ({
        id: key,
        name: key,
        author: value.author,
        description: value.description,
        filename: value.filename
      }))
    } catch (error) {
      console.error('Error fetching parser data:', error)
      throw error
    }
  }
  
  export async function fetchParserContent(filename) {
    try {
      // Remove ./ from the start of the filename if present
      const cleanPath = filename.replace(/^\.\//, '')
      const response = await fetch(`https://raw.githubusercontent.com/survey2gis/parser-repository/main/${cleanPath}`)
      if (!response.ok) throw new Error('Failed to fetch parser content')
      return await response.text()
    } catch (error) {
      console.error('Error fetching parser content:', error)
      throw error
    }
  }