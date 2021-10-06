import PropTypes from 'prop-types';
import React, {
  PureComponent,
} from 'react';
import {
  Link,
} from 'react-router-dom';
import './styles.module.scss';

class GitRepo extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      contributorsData: [],
      description: '',
      issuesData: [],
      title: '',
    };
  }

  componentDidMount () {
    const repo = fetch('https://api.github.com/repos/aagavin/randyhub').then((r) => {
      return r.json();
    });
    const issues = fetch('https://api.github.com/repos/aagavin/randyhub/issues').then((r) => {
      return r.json();
    });
    const contributors = fetch('https://api.github.com/repos/aagavin/randyhub/contributors').then((r) => {
      return r.json();
    });

    Promise.all([repo, issues, contributors]).then((values) => {
      const title = values[0].name;
      const description = values[0].description;
      const issuesData = values[1].map((issue) => {
        return {
          createdAt: new Date(issue.created_at).toLocaleDateString(),
          name: issue.user.login,
          state: issue.state,
        };
      });
      const contributorsData = values[2].map((contributor) => {
        return {
          contributions: contributor.contributions,
          login: contributor.login,
          url: contributor.html_url,
        };
      });
      this.setState({
        contributorsData,
        description,
        issuesData,
        title,
      });
    });
  }

  render () {
    return (
      <>
        <h1>{this.state.title}</h1>
        <h2>{this.state.description}</h2>
        <table id='issues-table'>
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
              this.state.issuesData.map((issue) => {
                return <tr>
                  <td>{issue.name}</td>
                  <td>{issue.createdAt}</td>
                  <td>{issue.state}</td>
                </tr>;
              })
            }
          </tbody>
        </table>
        <br /><br /><br />
        <table id='contributors-table'>
          <caption>Top Contributors to <Link target='_blank' to='/'>randyhub.live</Link></caption>
          <thead>
            <tr>
              <th>User</th>
              <th># of contributions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.contributorsData.map((contributor) => {
                return <tr>
                  <td><a href={contributor.url}>{contributor.login}</a></td>
                  <td>{contributor.contributions}</td>
                </tr>;
              })
            }
          </tbody>
        </table>
      </>
    );
  }
}

GitRepo.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default GitRepo;
