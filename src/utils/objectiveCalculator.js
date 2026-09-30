export function calculateSchedule(assignments, configuration) {
  const { taskTimes, machineCount } = configuration
  const machineClocks = Array(machineCount).fill(0)
  const rows = assignments.map((machine, taskIndex) => {
    const start = machineClocks[machine]
    const duration = Number(taskTimes[taskIndex][machine])
    const end = start + duration
    machineClocks[machine] = end
    return { task: taskIndex + 1, machine: machine + 1, start, end, duration }
  })
  const makespan = Math.max(...machineClocks)
  const totalProcessing = rows.reduce((sum, row) => sum + row.duration, 0)
  return {
    assignments,
    rows,
    objectiveValue: configuration.objective === 'processing' ? totalProcessing : makespan,
    makespan,
    totalProcessing,
    feasible: rows.every((row) => row.duration > 0) && new Set(rows.map((row) => row.task)).size === configuration.taskCount,
  }
}

export function objectiveValue(assignments, configuration) {
  return calculateSchedule(assignments, configuration).objectiveValue
}
