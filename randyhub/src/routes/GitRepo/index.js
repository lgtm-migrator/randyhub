import React, {
  PureComponent,
} from 'react';
import {
  Link,
} from 'react-router-dom';
import './styles.module.scss';

class GitRepo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contributorsData: [],
      description: '',
      issuesData: [],
      title: '',
    };
  }

  componentDidMount() {
    const repo = fetch('https://api.github.com/repos/aagavin/randyhub').then((response) => response.json());
    const issues = fetch('https://api.github.com/repos/aagavin/randyhub/issues').then((response) => response.json());
    const contributors = fetch('https://api.github.com/repos/aagavin/randyhub/contributors').then((response) => response.json());

    Promise.all([repo, issues, contributors]).then((values) => {
      const title = values[0].name;
      const { description } = values[0];
      const issuesData = values[1].map((issue) => ({
        createdAt: new Date(issue.created_at).toLocaleDateString(),
        name: issue.user.login,
        state: issue.state,
      }));
      const contributorsData = values[2].map((contributor) => ({
        contributions: contributor.contributions,
        login: contributor.login,
        url: contributor.html_url,
      }));

      return this.setState({
        contributorsData,
        description,
        issuesData,
        title,
      });
    });
  }

  render() {
    const {
      issuesData, title, description, contributorsData,
    } = this.state;
    return (
      <>
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
            {
              issuesData.map((issue) => (
                <tr key={`${issue.name}-${issue.createdAt}`}>
                  <td>{issue.name}</td>
                  <td>{issue.createdAt}</td>
                  <td>{issue.state}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <br />
        <br />
        <br />
        <table id="contributors-table">
          <caption>
            Top Contributors to
            {' '}
            <Link target="_blank" to="/">randyhub.live</Link>
          </caption>
          <thead>
            <tr>
              <th>User</th>
              <th># of contributions</th>
            </tr>
          </thead>
          <tbody>
            {
              contributorsData.map((contributor) => (
                <tr key={contributor.login}>
                  <td><a href={contributor.url}>{contributor.login}</a></td>
                  <td>{contributor.contributions}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </>
    );
  }
}

export default GitRepo;
