import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Issue } from '../interfaces';

interface Props {
  issue: Issue;
}

export const IssueComment: FC<Props> = ({ issue }) => {
  return (
    <div className="col-12">
      <div className="card border-white mt-2">
        <div className="card-header bg-dark">
          <img
            src={issue.user.avatar_url}
            alt="User Avatar"
            className="avatar"
          />
          <span className="mx-2">{issue.user.login} commented</span>
        </div>
        <div className="card-body text-dark">
          {issue.body ? (
            <ReactMarkdown>{issue.body}</ReactMarkdown>
          ) : (
            <h2>Empty issue</h2>
          )}
        </div>
      </div>
    </div>
  );
};
