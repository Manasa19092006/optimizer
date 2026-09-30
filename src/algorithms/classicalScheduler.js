import { calculateSchedule } from '../utils/objectiveCalculator.js'

export function runClassicalScheduler(configuration) {
  const { taskTimes, machineCount } = configuration
  const machineLoads = Array(machineCount).fill(0)
  const assignments = taskTimes.map((durations, taskIndex) => ({
    taskIndex,
    machine: durations.indexOf(Math.min(...durations)),
  }))

  assignments.sort((a, b) => Math.min(...taskTimes[b.taskIndex]) - Math.min(...taskTimes[a.taskIndex]))
  assignments.forEach(({ taskIndex, machine: preferredMachine }) => {
    const duration = taskTimes[taskIndex][preferredMachine]
    const machine = machineLoads[preferredMachine] + duration <= Math.min(...machineLoads) + duration
      ? preferredMachine
      : machineLoads.indexOf(Math.min(...machineLoads))
    assignments.find((entry) => entry.taskIndex === taskIndex).machine = machine
    machineLoads[machine] += taskTimes[taskIndex][machine]
  })

  return calculateSchedule(assignments.map((entry) => entry.machine), configuration)
}
