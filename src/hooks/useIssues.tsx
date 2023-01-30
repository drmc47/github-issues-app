import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../api/githubApi';
import { Issue, State } from '../issues/interfaces';
import { sleep } from '../helpers/sleep';

interface Props {
  state?: State;
  labels: string[];
}

const getIssues = async ({ labels, state }: Props): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();

  if (state) params.append('state', state);

  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const issuesQuery = useQuery(['issues', { state, labels }], () =>
    getIssues({ labels, state })
  );

  return {
    issuesQuery,
  };
};
