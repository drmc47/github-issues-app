import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues, useIssuesInfinite } from '../../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces';

export const ListView = () => {
  const [selectedLabels, setSelectedLabel] = useState<string[]>([]);
  const [state, setState] = useState<State>();
  const { issuesQuery } = useIssuesInfinite({
    state,
    labels: selectedLabels,
  });

  const onLabelChange = (labelName: string) => {
    selectedLabels?.includes(labelName)
      ? setSelectedLabel(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabel([...selectedLabels, labelName]);
  };
  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data?.pages.flat() || []}
            state={state}
            onStateChange={(newState) => setState(newState)}
          />
        )}
        <button
          className="mt-2 btn btn-outline-primary"
          onClick={() => issuesQuery.fetchNextPage()}
          disabled={!issuesQuery.hasNextPage}
          // ? Este boton se puede cambiar por el evento de  cuando
          // ? el usuario esté llegando al final de la pag
        >
          Load More...
        </button>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChange(labelName)}
        />
      </div>
    </div>
  );
};
