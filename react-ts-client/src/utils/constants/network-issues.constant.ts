import { AppMessage } from '../../store/message.store';

export const NetworkIssues: AppMessage[] = [
  <AppMessage>{ type: 'error', title: 'Network issues' },
];
