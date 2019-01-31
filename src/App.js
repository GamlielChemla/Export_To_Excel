import React, { Component } from "react";
import "./App.css";
import ExportToExcel from "./ExportToexcel";
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentWillMount() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url, {
      method: "GET"
    })
      .then(response => response.json())
      .then(posts => {
        this.setState({ posts: posts });
      });
  }

  deleteRow(id) {
    const index = this.state.posts.findIndex(post => {
      return post.id === id;
    });

    let copyPosts = [...this.state.posts];

    copyPosts.splice(index, 1);

    this.setState({ posts: copyPosts });
  }
  render() {

    
    const columns = [
      {
        Header: "User ID",
        accessor: "userId",
        style: {
          textAlign: "right"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },

      {
        Header: "ID",
        accessor: "id",
        style: {
          textAlign: "right"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },

      {
        Header: "Title",
        accessor: "title",
        sortable: false,
        filterable: false
      },

      {
        Header: "Content",
        accessor: "body",
        sortable: false,
        filterable: false
      },

      {
        Header: "Actions",
        Cell: props => {
          return (
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => {
                this.deleteRow(props.original.id);
              }}
            >
              Delete
            </button>
          );
        },
        sortable: false,
        filterable: false,
        width: 100,
        maxWidth: 100,
        minWidth: 100
      }
    ];
    return (
      <div className="App">
        <ReactTable
          columns={columns}
          data={this.state.posts}
          filterable
          defaultPageSize={10}
          noDataText={"please wait ...."}
          // showPagination = {false}
        >
          {(state, filtredData, instance) => {
            this.reactTable = state.pageRows.map(post => {
              return post._original;
            });
            return (
              <div>
                {filtredData()}
                <ExportToExcel posts={this.reactTable} />
              </div>
            );
          }}
        </ReactTable>
      </div>
    );
  }
}

export default App;
