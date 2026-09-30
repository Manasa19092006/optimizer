import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { performance } from 'node:perf_hooks'
import { runClassicalScheduler } from './src/algorithms/classicalScheduler.js'
import { runSimulatedAnnealing } from './src/algorithms/simulatedAnnealing.js'
import { validateConfiguration } from './src/utils/validation.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = Number(process.env.PORT) || 4173

app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'opticompare-api' })
})

app.post('/api/optimize', (request, response) => {
  const configuration = request.body
  const errors = validateConfiguration(configuration)
  if (Object.keys(errors).length) {
    response.status(400).json({ message: 'Invalid optimization configuration.', errors })
    return
  }

  try {
    const classicalStart = performance.now()
    const classical = runClassicalScheduler(configuration)
    classical.executionTime = Number((performance.now() - classicalStart).toFixed(2))

    const quantumStart = performance.now()
    const quantum = runSimulatedAnnealing(configuration)
    quantum.executionTime = Number((performance.now() - quantumStart).toFixed(2))

    response.json({
      results: { classical, quantum, completedAt: new Date().toISOString(), executionEnvironment: 'server' },
    })
  } catch (error) {
    response.status(500).json({ message: error instanceof Error ? error.message : 'Optimization failed.' })
  }
})

const distPath = path.join(__dirname, 'dist')
app.use(express.static(distPath))
app.use((_request, response) => response.sendFile(path.join(distPath, 'index.html')))

app.listen(port, () => {
  console.log(`OptiCompare server listening on http://localhost:${port}`)
})
