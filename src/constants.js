// constants.js

export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_TITLE_DUE_DATE: 'required-title-dueDate',
  NO_SUCH_ID: 'noSuchId',
};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
};

export const MESSAGES = {
  [SERVER.AUTH_INSUFFICIENT]: 'This user is not allowed to log in (e.g. dog)',
  [SERVER.REQUIRED_USERNAME]: 'Username cannot be empty',
  [SERVER.REQUIRED_TITLE_DUE_DATE]: 'Title and due date cannot be empty',
  [SERVER.NO_SUCH_ID]: 'No matching classwork found',
  [CLIENT.NETWORK_ERROR]: 'Network error. Please try again later.',
  default: 'An unknown error occurred. Please try again later.',
};
