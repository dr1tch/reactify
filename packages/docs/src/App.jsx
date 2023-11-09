import { useState } from "react"
import { Button } from "ui"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-red-700">Vite + React</h1>
      <div className="card">
        <Button
          variant="ghost"
          colorScheme="green"
          isLoading
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
