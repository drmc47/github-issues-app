import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../api/githubApi';
import { Label } from '../issues/interfaces/label';
import { sleep } from '../helpers/sleep';

const getLabels = async (): Promise<Label[]> => {
  await sleep(2); // pongo un sleep para ver el loading
  const { data } = await githubApi.get<Label[]>('/labels', {
    headers: { Authorization: null },
  });
  console.log(data);
  return data;
};
export const useLabels = () => {
  const labelsQuery = useQuery(['labels'], getLabels, {
    staleTime: 1000 * 60 * 60,
    placeholderData: [
      {
        id: 69105383,
        node_id: 'MDU6TGFiZWw2OTEwNTM4Mw==',
        url: 'https://api.github.com/repos/facebook/react/labels/Browser:%20IE',
        name: 'Browser: IE',
        color: 'c7def8',
        default: false,
      },
      {
        id: 1205087127,
        node_id: 'MDU6TGFiZWwxMjA1MDg3MTI3',
        url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Concurrent%20Features',
        name: 'Component: Concurrent Features',
        color: 'ffccd3',
        default: false,
      },
    ],
  });
  /* //! Diferencia entre placeholderData e initialData
  La placeholderData es solo una data "ficticia" que queremos mostrar mientras
  carga la petición, mientras que la initialData react-query la toma como
  data válida por lo que si todavía no está dentro del stale time no vuelve
  a hacer la petición y sigue mostrando esta initialData. Esta es útil solamente
  si conocemos la data inicial de antemano. 
  
  */
  return labelsQuery;
};
