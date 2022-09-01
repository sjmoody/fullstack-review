import React from 'react';
import Table from 'react-bootstrap/Table'

const RepoList = (props) => (
  <div>
    <h4>
    There are {props.total} repos.
    </h4>
    <h4>
    Top {props.repos.length} repos Sorted by size
    </h4>


    <Table striped bordered hover size='sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Repo Name</th>
          <th>Size</th>
          <th>Watchers Count</th>
        </tr>
      </thead>
      <tbody>
        {props.repos.map((repo) => {
          return(
            <tr key={repo.id}>
              <td>{repo.id}</td>
              <td><a href={repo.html_url}>{repo.name}</a></td>
              <td>{repo.size}</td>
              <td>{repo.watchers_count}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>

  </div>
)
// const RepoList = (props) => (
//   <div>
//     <h4> Repo List Component </h4>
//     There are {props.total} repos.
//     There are {props.repos.length} repos to show here.
//     <ul>
//       {props.repos.map((repo) => {
//         return(<div key={repo.id}>Repo ID: {repo.id} Repo Name: {repo.name} Size: {repo.size} Watchers Count: {repo.watchers_count}</div>)
//       })}
//     </ul>
//   </div>
// )

export default RepoList;