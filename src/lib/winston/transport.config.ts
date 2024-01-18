import { AppHelper, DataMaskingHelper, LOG_TYPES, LogFormatHelper } from '@/common';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

const { timestamp, printf } = format;
const getLogTypes = () => Object.keys(LOG_TYPES).join('');

const maskData = format((info) => {
  info = true || AppHelper.isProd() ? DataMaskingHelper.maskData(info) : info;
  return info;
});

const inlineFormat = printf((info) => {
  const { level, message, timestamp, type } = info;
  const logMessage = `${level.toUpperCase()} ${timestamp}`;

  if (getLogTypes().includes(type)) {
    return LogFormatHelper[type as keyof typeof LogFormatHelper](logMessage, message);
  }

  return logMessage + ` ${JSON.stringify(message)}`;
});

export const NestTransports = [
  new transports.DailyRotateFile({
    level: 'error',
    datePattern: 'YYYY:MM:DD',
    format: format.combine(timestamp({ format: 'YYYY:MM:DD HH:MM:SS' }), maskData(), inlineFormat),
    filename: `${process.cwd()}/logs/error-%DATE%.log`,
  }),

  new transports.DailyRotateFile({
    level: 'info',
    format: format.combine(timestamp({ format: 'YYYY:MM:DD HH:MM:SS' }), maskData(), inlineFormat),
    filename: `${process.cwd()}/logs/info-%DATE%.log`,
  }),
];
