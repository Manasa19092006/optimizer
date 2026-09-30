import { calculateSchedule, objectiveValue } from '../utils/objectiveCalculator.js'

function randomAssignment(taskCount, machineCount) {
  return Array.from({ length: taskCount }, () => Math.floor(Math.random() * machineCount))
}

export function runSimulatedAnnealing(configuration, iterations = 900) {
  const { taskCount, machineCount } = configuration
  let current = randomAssignment(taskCount, machineCount)
  let currentValue = objectiveValue(current, configuration)
  let best = [...current]
  let bestValue = currentValue
  let temperature = Math.max(8, currentValue)

  for (let index = 0; index < iterations; index += 1) {
    const candidate = [...current]
    const taskIndex = Math.floor(Math.random() * taskCount)
    candidate[taskIndex] = Math.floor(Math.random() * machineCount)
    const candidateValue = objectiveValue(candidate, configuration)
    const acceptance = Math.exp((currentValue - candidateValue) / temperature)
    if (candidateValue < currentValue || Math.random() < acceptance) {
      current = candidate
      currentValue = candidateValue
    }
    if (currentValue < bestValue) {
      best = [...current]
      bestValue = currentValue
    }
    temperature *= 0.994
  }

  return calculateSchedule(best, configuration)
}
