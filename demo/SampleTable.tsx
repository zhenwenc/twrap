import * as React from 'react'
import { Component } from 'react'

import {
  Divider,
} from 'material-ui'

import {
  DataTable,
  Column,
  TableToolbar,
  TableFooter,
  FilterPlugin,
  PaginationPlugin,
  SortingPlugin,
  PaginationState,
} from '../src/index'

const tableRows = [
  {id: '1', name: 'John Smith', status: {content: 'Employed'}},
  {id: '3', name: 'Adam Moore', status: {content: 'Employed'}},
  {id: '4', name: 'Adam Moore', status: {content: 'Unemployed'}},
  {id: '2', name: 'Steve Brown', status: {content: 'Employed'}},
  {id: '5', name: 'Steve Brown', status: {content: 'Employed'}},
  {id: '6', name: 'Fake', status: {content: 'Employed'}},
  {id: '7', name: 'Fake', status: {content: 'Employed'}},
  {id: '8', name: 'Fake', status: {content: 'Employed'}},
  {id: '9', name: 'Fake', status: {content: 'Employed'}},
  {id: '10', name: 'Fake', status: {content: 'Employed'}},
  {id: '11', name: 'Fake', status: {content: 'Employed'}},
  {id: '12', name: 'Fake', status: {content: 'Employed'}},
  {id: '13', name: 'Fake', status: {content: 'Employed'}},
  {id: '14', name: 'Fake', status: {content: 'Employed'}},
  {id: '15', name: 'Fake', status: {content: 'Employed'}},
  {id: '16', name: 'Fake', status: {content: 'Employed'}},
]

export interface SampleTableState {
  pagination?: PaginationState
  filter?: FilterPlugin
  sorting?: SortingPlugin
  [key: string]: any
}

export class SampleTable extends Component<{}, SampleTableState> {

  handleSearchChange(event: React.FormEvent, term: string) {
    this.state.filter.setTerm(term)
  }

  handleSortChange(key: string) {
    this.state.sorting.next(key)
  }

  handleDataTableUpdate() {
    this.forceUpdate()
  }

  componentWillMount() {
    const paginationState = new PaginationState({
      fnTableSize: () => tableRows.length
    })

    this.setState({
      pagination: paginationState,
      filter: new FilterPlugin(),
      sorting: new SortingPlugin({ keys: ['id', 'name'] }),
    })
  }

  render() {
    const { filter, sorting } = this.state

    return (
      <div>
        <TableToolbar onSearchChange={this.handleSearchChange.bind(this)} />
        <Divider />
        <DataTable
          data={tableRows}
          plugins={[filter, sorting]}
          onStateUpdate={this.handleDataTableUpdate.bind(this)}
        >
          <Column
            header="ID"
            field={row => row.id}
            type="number"
            sortable={{order: sorting.fnGet('id')}}
            onHeaderTouch={() => this.handleSortChange('id')}
          />
          <Column
            header="Name"
            field={row => row.name}
            sortable={{order: sorting.fnGet('name')}}
            onHeaderTouch={() => this.handleSortChange('name')}
          />
          <Column
            header="Status"
            field={row => row.status.content}
          />
        </DataTable>
        <Divider />
        <TableFooter />
      </div>
    )
  }
}

export default SampleTable
