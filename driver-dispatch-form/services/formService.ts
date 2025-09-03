import { FormData, Submission, User } from '../types';

const SUBMISSIONS_KEY = 'dispatch_submissions';

export const getSubmissions = (): Submission[] => {
  const submissionsJson = localStorage.getItem(SUBMISSIONS_KEY);
  return submissionsJson ? JSON.parse(submissionsJson) : [];
};

export const saveSubmission = (formData: FormData, user: User): void => {
  const submissions = getSubmissions();
  const newSubmission: Submission = {
    id: new Date().toISOString() + '-' + user.username,
    username: user.username,
    submittedAt: new Date().toISOString(),
    formData: formData,
  };
  submissions.unshift(newSubmission); // Add to the beginning
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
};
