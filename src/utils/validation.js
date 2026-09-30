export function validateConfiguration(configuration) {
  const errors = {}
  if (!Number.isInteger(Number(configuration.taskCount)) || configuration.taskCount < 2 || configuration.taskCount > 20) {
    errors.taskCount = 'Use between 2 and 20 tasks.'
  }
  if (!Number.isInteger(Number(configuration.machineCount)) || configuration.machineCount < 2 || configuration.machineCount > 5) {
    errors.machineCount = 'Use between 2 and 5 machines.'
  }
  if (!configuration.taskTimes?.length || configuration.taskTimes.some((row) => row.length !== Number(configuration.machineCount) || row.some((value) => !value || Number(value) <= 0))) {
    errors.taskTimes = 'Every processing time must be a positive number.'
  }
  return errors
}
