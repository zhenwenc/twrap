import * as React from 'react'

import { Component } from 'react'
import {
  TableColumnSorter,
} from '../plugins/TableSortPlugin'

export interface ColumnDef {
  /**
   * Header label for this column.
   */
  header: any

  /**
   * Function to read value from the source data.
   */
  field: (rowData: any) => any

  /**
   * If true, table column can be sorted. If multiple column sorting
   * is desired, enable multiSortable in TableSortPlugin. The default
   * value is false.
   *
   * NOTE: TableSortPlugin is required.
   */
  sortable?: TableColumnSorter

  /**
   * The datatype of the column. The reserved column datatype for
   * the plugins in this library are (case insensitive):
   *
   * [string, number, date],
   *
   * any othere value (include undefined) will be fallback to string.
   *
   * NOTE: You can specify your own datatye which will be used for the
   *       custom plugins.
   */
  type?: string

  /**
   * Other custom column definitions. This allow users to specify
   * configurations for the custom plugin.
   */
  [other: string]: any
}

export class Column extends Component<ColumnDef, any> {
  static __DataTableColumn__ = true

  render() {
    if ('development' === process.env.NODE_ENV) {
      throw new Error('<TableColumn /> should never be rendered!')
    }
    return null
  }
}

export function mapColumnDef(child: any): ColumnDef {
  if (!child.type.__DataTableColumn__) {
    throw new Error('DataTable: children should be <Column />')
  }
  return Object.assign({}, child.props)
}
