/**
 * Logger utility
 */

enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

class Logger {
  private isDevelopment = __DEV__;

  private formatMessage(level: LogLevel, message: string, extra?: any): string {
    const timestamp = new Date().toISOString();
    const extraStr = extra ? ` | ${JSON.stringify(extra)}` : '';
    return `[${timestamp}] [${level}] ${message}${extraStr}`;
  }

  debug(message: string, extra?: any): void {
    if (this.isDevelopment) {
      // eslint-disable-next-line no-console
      console.log(this.formatMessage(LogLevel.DEBUG, message, extra));
    }
  }

  info(message: string, extra?: any): void {
    if (this.isDevelopment) {
      // eslint-disable-next-line no-console
      console.info(this.formatMessage(LogLevel.INFO, message, extra));
    }
  }

  warn(message: string, extra?: any): void {
    console.warn(this.formatMessage(LogLevel.WARN, message, extra));
  }

  error(message: string, error?: any): void {
    console.error(this.formatMessage(LogLevel.ERROR, message, error));
  }
}

export const logger = new Logger();
