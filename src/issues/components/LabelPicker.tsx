import { FC } from 'react';
import { useLabels } from '../../hooks/useLabels';
import { LoadingIcon } from '../../shared/components/LoadingIcon';

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker: FC<Props> = ({ selectedLabels, onChange }: Props) => {
  const labelsQuery = useLabels();

  if (labelsQuery.isLoading) {
    return <LoadingIcon />;
  }
  /* //! DIFERENCIA ENTRE isLoading y isFetching
  Con el isLoading este <h1>Loading...</h1> se va a mostrar sólo 
  la primera vez, ya que luego aunque vuelva a hacer otra peticion al 
  endpoint va a tener data en cache por lo tanto va a mostrar dicha data
  hasta que termine de traer la nueva, mientras que usar el isFetching 
  mostraría ese Loading siempre que dispare una petición al endpoint. 
*/
  return (
    <div>
      {labelsQuery.data?.map((label) => (
        <span
          className={`badge rounded-pill m-1 label-picker ${
            selectedLabels.includes(label.name) ? 'label-active' : ''
          } `}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
          key={label.id}
          onClick={() => onChange(label.name)}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
