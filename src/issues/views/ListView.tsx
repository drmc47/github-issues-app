import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../../hooks';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { State } from '../interfaces';

export const ListView = () => {
  const [selectedLabels, setSelectedLabel] = useState<string[]>([]);
  const [state, setState] = useState<State>();
  const { issuesQuery } = useIssues({ state, labels: selectedLabels });
  const prueba: string = 'holis';

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
            issues={issuesQuery.data || []}
            state={state}
            onStateChange={(newState) => setState(newState)}
          />
        )}
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
