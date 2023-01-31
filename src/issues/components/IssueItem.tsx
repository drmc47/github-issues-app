import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue, State } from '../interfaces';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { getIssueComments, getIssueInfo } from '../../hooks/useIssue';
import { timeSince } from '../../helpers';

interface Props {
  issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const prefetchData = () => {
    //El prefetch data hace una peticion, en este caso cuando el cursor
    //esta sobre la card, para precargar la data y cuando el usuario hace
    //click ya existe data en cache para mostrar, mejorando la UX
    queryClient.prefetchQuery(['issue', issue.number], () =>
      getIssueInfo(issue.number)
    );

    queryClient.prefetchQuery(['issue', issue.number, 'comments'], () =>
      getIssueComments(issue.number)
    );
  };

  const preSetData = () => {
    //Funcion alternativa para usar en el onMouseEnter.
    //El setQueryData setea cierta informacion en cache, en este caso
    //es útil ya que la API de Github trae toda la data del issue cuando
    //hago el get a /issues, por lo que ya puedo usar esa información para
    //tenerla disponible antes que el usuario haga click en la card. En este
    //caso cuando el usuario hace click sólo haría el get de los comments.
    queryClient.setQueryData(['issue', issue.number], issue, {
      updatedAt: new Date().getTime() + 2 * 60 * 1000,
      //con esto le indico a react-query que quiero que se considere "fresh"
      //la data por una duración de 2 minutos, es decir que no va a volver
      //a disparar de vuelta la petición hasta que no pasen esos 2 mins.
    });
  };

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      onMouseEnter={() => preSetData()}
    >
      <div className="card-body d-flex align-items-center">
        {issue.state === State.Open ? (
          <FiInfo size={30} color="red" />
        ) : (
          <FiCheckCircle size={30} color="green" />
        )}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{issue.title}</span>
          <span className="issue-subinfo">
            {` #${issue.number} opened ${timeSince(issue.created_at)} ago by`}
            <span className="fw-bold">{issue.user.login}</span>
            <div>
              {issue.labels.map((label) => (
                <span
                  key={label.id}
                  className="badge rounded-pill m-1"
                  style={{ backgroundColor: `#${label.color}`, color: 'black' }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          </span>
        </div>

        <div className="d-flex align-items-center">
          <img
            src={issue.user.avatar_url}
            alt="User Avatar"
            className="avatar"
          />
          <span className="px-2">{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
