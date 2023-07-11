import React, { useMemo } from "react";

import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

const series = [
  {
    data: [800, 600, 1000, 800, 600, 1000, 800, 900],
  },
];
const options = {
  chart: {
    toolbar: {
      autoSelected: "pan",
      show: false,
    },
    offsetX: 0,
    offsetY: 0,
    zoom: {
      enabled: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  colors: 'bg-primary',
  tooltip: {
    theme: "light",
  },
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
    },
  },
  yaxis: {
    show: false,
  },
  fill: {
    type: "solid",
    opacity: [0.1],
  },
  legend: {
    show: false,
  },
  xaxis: {
    low: 0,
    offsetX: 0,
    offsetY: 0,
    show: false,
    labels: {
      low: 0,
      offsetX: 0,
      show: false,
    },
    axisBorder: {
      low: 0,
      offsetX: 0,
      show: false,
    },
  },
};

const actions = [
  {
    name: "edit",
    icon: "heroicons:pencil-square",
  }
];

const COLUMNS = [
  {
    Header: "Criado em",
    accessor: "created_at",
    Cell: (row) => {
      return (
        <div className="text-center">
          {new Date(row?.cell?.value).toLocaleDateString()}
        </div>
      );
    }
  },
  {
    Header: "Nome",
    accessor: "full_name",
    Cell: (row) => {
      return (
        <div className="text-center">
          {row?.cell?.value}
        </div>
      );
    }
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: (row) => {
      return (
        <div className="text-center">
          {row?.cell?.value}
        </div>
      );
    }
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: (row) => {
      const status = row?.cell?.value;

      let color = 'green';
      if(status === 'blocked') color = 'red';

      return (
        <div className={`text-center text-${color}-600`}>
          {status}
        </div>
      );
    }
  },

  {
    Header: "Ação",
    accessor: "action",
    Cell: () => {
      return (
        <div>
          {actions.map((item, i) => (
            <div
              className="
                hover:bg-slate-900
                hover:text-white
                dark:hover:bg-slate-600
                dark:hover:bg-opacity-50 
                w-full
                border-b
                border-b-gray-500
                border-opacity-10
                px-2
                py-2
                text-sm
                cursor-pointer 
                first:rounded-t
                last:rounded-b
              "
              key={item.name}
            >
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      );
    },
  },
];

const AdminTable = ({ admins = [] }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => admins.docs, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
      },
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  return (
    <>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
            <table
              className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
              {...getTableProps}
            >
              <thead className="dark:bg-slate-700">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        scope="col"
                        className="table-th uppercase font-thin py-4"
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                {...getTableBodyProps}
              >
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="table-td py-2 text-sm"
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTable;
