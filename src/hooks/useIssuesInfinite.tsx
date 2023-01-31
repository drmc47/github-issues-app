import { useInfiniteQuery } from '@tanstack/react-query';
import { Issue, State } from '../issues/interfaces';
import { githubApi } from '../api/githubApi';

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

interface QueryProps {
  pageParam?: number;
  queryKey: (string | Props)[];
}
const getIssues = async ({
  pageParam = 1,
  queryKey,
}: QueryProps): Promise<Issue[]> => {
  const [, , args] = queryKey;
  const { state, labels } = args as Props;

  const params = new URLSearchParams();

  if (state) {
    params.append('state', state);
  }

  if (labels.length > 0) {
    //la documentacion de github pide que se pasen las labels separadas por coma
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }

  params.append('page', pageParam.toString());
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};
/* 
? pages es un arrays de arrays [[issue1, issue2, issue3], [issue4, issue5, issue6]...]
? donde cada uno de los arrays internos son las páginas, por lo que sabiendo
? la cantidad length de pages sabemos cuantas paginas hay  */
export const useIssuesInfinite = ({ state, labels }: Props) => {
  const issuesQuery = useInfiniteQuery(
    ['issues', 'infinite', { state, labels }],
    (data) => getIssues(data),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 5) return;

        return pages.length + 1;
      },
    }
  );
  return {
    issuesQuery,
  };
};
