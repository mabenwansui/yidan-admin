class Logger {
  error(error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error(error)
    }
  }
  info(message: string) {
    console.info(message)
  }
}

const logger = new Logger()
export default logger
