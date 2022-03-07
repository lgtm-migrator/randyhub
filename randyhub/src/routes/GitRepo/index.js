import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { simpleCircles, marblesVisualization } from './visualizations';

const GitRepo = () => {
  const [contributorsData, setContributorsData] = useState([]);
  const [description, setDescription] = useState('');
  const [issuesData, setIssuesData] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchRepoData = async () => {
      const repoReq = await fetch(
        'https://api.github.com/repos/aagavin/randyhub',
      ).then((response) => response.json());
      const issuesReq = await fetch(
        'https://api.github.com/repos/aagavin/randyhub/issues',
      ).then((response) => response.json());
      const contributorsReq = await fetch(
        'https://api.github.com/repos/aagavin/randyhub/contributors',
      ).then((response) => response.json());
      const [repoRes, issuesRes, contributorsRes] = await Promise.all([
        repoReq,
        issuesReq,
        contributorsReq,
      ]);

      const issues = issuesRes.map((issue) => ({
        createdAt: new Date(issue.created_at).toLocaleDateString(),
        name: issue.user.login,
        state: issue.state,
      }));

      const contributors = contributorsRes.map((contributor) => ({
        contributions: contributor.contributions,
        login: contributor.login,
        url: contributor.html_url,
      }));

      setTitle(repoRes.name);
      setDescription(repoRes.description);
      setContributorsData(contributors);
      setIssuesData(issues);
    };

    fetchRepoData();
  }, []);

  return (
    <>
      <div className={`${styles['git-repo']}`}>
        <h1>{title}</h1>
        <h2>{description}</h2>
        <table id="issues-table">
          <caption>Current Open Issues</caption>
          <thead>
            <tr>
              <th>User</th>
              <th>Created At</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {issuesData.map((issue) => (
              <tr key={`${issue.name}-${issue.createdAt}`}>
                <td>{issue.name}</td>
                <td>{issue.createdAt}</td>
                <td>{issue.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <br />
        <br />
        <table id="contributors-table">
          <caption>
            Top Contributors to
            {' '}
            <Link target="_blank" to="/">
              randyhub.live
            </Link>
          </caption>
          <thead>
            <tr>
              <th>User</th>
              <th># of contributions</th>
            </tr>
          </thead>
          <tbody>
            {contributorsData.map((contributor) => (
              <tr key={contributor.login}>
                <td>
                  <a href={contributor.url}>{contributor.login}</a>
                </td>
                <td>{contributor.contributions}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        {simpleCircles(contributorsData)}
        <br />
        {marblesVisualization(contributorsData)}
      </div>
    </>
  );
};
export default GitRepo;
