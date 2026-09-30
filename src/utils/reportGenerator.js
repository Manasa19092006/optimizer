export function downloadReport(configuration, results) {
  const lines = [
    'OPTICOMPARE EXPERIMENT REPORT',
    '',
    `Problem,${configuration.problem}`,
    `Tasks,${configuration.taskCount}`,
    `Machines,${configuration.machineCount}`,
    `Objective,${configuration.objectiveLabel}`,
    `Dataset,${configuration.datasetLabel}`,
    '',
    'Algorithm,Objective Value,Execution Time (ms),Feasible',
    `Classical Greedy,${results.classical.objectiveValue},${results.classical.executionTime},${results.classical.feasible}`,
    `Quantum-Inspired Simulated Annealing,${results.quantum.objectiveValue},${results.quantum.executionTime},${results.quantum.feasible}`,
    '',
    'Classical Schedule',
    'Task,Machine,Start,End,Duration',
    ...results.classical.rows.map((row) => [row.task, row.machine, row.start, row.end, row.duration].join(',')),
    '',
    'Quantum-Inspired Schedule',
    'Task,Machine,Start,End,Duration',
    ...results.quantum.rows.map((row) => [row.task, row.machine, row.start, row.end, row.duration].join(',')),
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'opticompare-report.csv'
  link.click()
  URL.revokeObjectURL(url)
}
