export const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
  
      reader.onload = (event) => {
        try {
          resolve(event.target.result)
        } catch (error) {
          reject(error)
        }
      }
  
      reader.onerror = (event) => {
        reject(new Error(event.target.error))
      }
  
      reader.readAsText(file)
    })
  }