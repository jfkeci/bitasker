import { AppMessage } from '../store/message.store';
import { ApiError } from './interfaces/api-error.interface';
import { NetworkIssues } from './constants/network-issues.constant';
import { NetworkIssueResponseCodes } from './constants/network-issue-response-codes.constant';

export const handleNetworkError = (error: any): AppMessage[] => {
  if (NetworkIssueResponseCodes.includes(error.response.status)) {
    return NetworkIssues;
  }

  if (error.response?.data?.errors) {
    const errors: ApiError[] = error.response.data.errors;

    return <AppMessage[]>(
      errors.map((e) => ({ type: 'error', title: e.message }))
    );
  } else {
    return NetworkIssues;
  }
};
