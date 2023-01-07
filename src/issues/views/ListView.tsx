import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';

export const ListView = () => {
  const [selectedLabels, setSelectedLabel] = useState<string[]>([]);

  const onLabelChange = (labelName: string) => {
    selectedLabels?.includes(labelName)
      ? setSelectedLabel(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabel([...selectedLabels, labelName]);
  };
  return (
    <div className="row mt-5">
      <div className="col-8">
        <IssueList />
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
