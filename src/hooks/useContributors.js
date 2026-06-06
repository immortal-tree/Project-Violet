import { CONTRIBUTORS, CONTRIBUTORS_RANKED, LETTERS, ACTIVITY_FEED, UPCOMING_TASKS } from '../store/mockData';

export const useContributors = () => {
  const getContributors = () => CONTRIBUTORS;
  const getRankedContributors = () => CONTRIBUTORS_RANKED;
  
  const getContributorById = (id) => {
    return CONTRIBUTORS.find(c => c.id === id) || null;
  };

  const getLetterByRecipientId = (recipientId) => {
    return LETTERS.find(l => l.recipientId === recipientId) || null;
  };

  const getActivityByContributorId = (contributorId) => {
    return ACTIVITY_FEED.filter(a => a.contributorId === contributorId);
  };

  const getUpcomingTasks = () => UPCOMING_TASKS;
  const getLetters = () => LETTERS;

  return {
    getContributors,
    getRankedContributors,
    getContributorById,
    getLetterByRecipientId,
    getActivityByContributorId,
    getUpcomingTasks,
    getLetters,
  };
};
