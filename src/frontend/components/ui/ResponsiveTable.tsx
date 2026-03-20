'use client';

import { Button } from '@/frontend/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/frontend/components/ui/DropdownMenu';
import {
  TableBody as TableBodyRaw,
  TableCell as TableCellRaw,
  TableHead as TableHeadRaw,
  TableHeader as TableHeaderRaw,
  Table as TableRaw,
  TableRow as TableRowRaw,
} from '@/frontend/components/ui/Table';
import { cn } from '@/frontend/lib/cn';
import type {
  Cell,
  Column,
  Header,
  HeaderGroup,
  Row,
  RowData,
  SortingState,
  Table,
  ColumnDef as TanstackColumnDef,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { atom, useAtom } from 'jotai';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  Loader2,
} from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';
import React, { createContext, useContext, useRef, useState } from 'react';

export type ColumnDef<TData = RowData, TValue = unknown> = TanstackColumnDef<
  TData,
  TValue
> & {
  defaultWidth?: number;
  minWidth?: number;
};

const DEFAULT_DEFAULT_WIDTH = 100;
const DEFAULT_MIN_WIDTH = 50;

const sortingAtom = atom<SortingState>([]);
const columnVisibilityAtom = atom<Record<string, boolean>>({});

export const TableContext = createContext<{
  data: unknown[];
  columns: ColumnDef<unknown, unknown>[];
  table: Table<unknown> | null;
  columnWidths: Record<string, number>;
}>({
  data: [],
  columns: [],
  table: null,
  columnWidths: {},
});

export type TableProviderProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children: ReactNode;
  className?: string;
  columnVisibility?: Record<string, boolean>;
};

export function TableProvider<TData, TValue>({
  columns,
  data,
  children,
  className,
  columnVisibility: initialColumnVisibility,
}: TableProviderProps<TData, TValue>) {
  const [sorting, setSorting] = useAtom(sortingAtom);
  const [columnVisibility, setColumnVisibility] = useAtom(columnVisibilityAtom);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const containerRef = useRef<HTMLTableElement>(null);

  // 更新列可见性
  React.useEffect(() => {
    if (initialColumnVisibility) {
      setColumnVisibility(initialColumnVisibility);
    }
  }, [initialColumnVisibility, setColumnVisibility]);

  // 计算列宽度
  React.useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const calculateColumnWidths = () => {
      // 获取容器宽度
      const containerWidth = containerRef.current?.clientWidth ?? 0;

      // 获取可见列
      const visibleColumns = columns.filter(
        (col) => columnVisibility[col.id ?? ''] !== false
      );

      // 初始化列宽 (使用 defaultWidth)
      let widths: Record<string, number> = {};
      let totalWidth = 0;

      // 第一轮：使用 defaultWidth 设置初始宽度
      visibleColumns.forEach((col) => {
        // 优先使用id，如果没有则使用accessorKey
        const id = col.id ?? '';
        // 获取defaultWidth (从列定义的任何位置获取)
        const defaultWidth = col.defaultWidth ?? DEFAULT_DEFAULT_WIDTH;
        widths[id] = defaultWidth;
        totalWidth += defaultWidth;
      });

      // 第二轮：如果总宽度超过容器宽度，根据拉伸距离压缩列宽
      if (totalWidth > containerWidth) {
        // 计算每列的拉伸距离 (defaultWidth - minWidth)
        const stretchDistances: Array<{
          id: string;
          index: number;
          distancePercent: number;
          minWidth: number;
        }> = visibleColumns.map((col, index) => {
          // 优先使用id，如果没有则使用accessorKey
          const id = col.id ?? '';
          // 获取minWidth (从列定义的任何位置获取)
          const minWidth = col.minWidth ?? DEFAULT_MIN_WIDTH;
          const distancePercent = (widths[id] - minWidth) / minWidth;

          return {
            id,
            index,
            distancePercent: Math.max(0, distancePercent),
            minWidth,
          };
        });

        // 按拉伸距离从大到小排序，距离相等时按索引从大到小排序（从右侧开始）
        stretchDistances.sort((a, b) => {
          if (b.distancePercent === a.distancePercent) {
            return b.index - a.index; // 从右侧开始
          }
          return b.distancePercent - a.distancePercent; // 从距离大的开始
        });

        // 按顺序压缩列，直到总宽度不超过容器宽度或无法再压缩
        let excess = totalWidth - containerWidth;
        let i = 0;

        while (excess > 0 && i < stretchDistances.length) {
          const {
            id,
            distancePercent: distance,
            minWidth,
          } = stretchDistances[i];

          // 如果没有拉伸距离，跳过当前列
          if (distance <= 0) {
            i++;
            continue;
          }

          // 计算当前列可以压缩的空间
          const reduction = Math.min(excess, distance);

          // 压缩当前列宽度
          widths[id] = Math.max(minWidth, widths[id] - reduction);

          // 更新超出部分
          excess -= reduction;

          // 如果当前列已压缩到最小宽度，移到下一列
          if (widths[id] <= minWidth) {
            i++;
          }
        }
      }

      // 设置计算出的列宽
      setColumnWidths(widths);
    };

    // 立即计算一次
    calculateColumnWidths();

    // 创建 ResizeObserver 监听容器大小变化
    const resizeObserver = new ResizeObserver(() => {
      calculateColumnWidths();
    });

    // 开始监听容器大小变化
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // 同时也监听窗口大小变化
    const handleWindowResize = () => {
      calculateColumnWidths();
    };
    window.addEventListener('resize', handleWindowResize);

    // 清理函数
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [columns, columnVisibility]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updater) => {
      // @ts-expect-error updater is a function that returns a sorting object
      const newSorting = updater(sorting);
      setSorting(newSorting);
    },
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <TableContext.Provider
      value={{
        data,
        columns: columns as never,
        table: table as never,
        columnWidths,
      }}
    >
      <TableRaw
        ref={containerRef}
        className={cn('bg-background text-foreground', className)}
        style={{
          tableLayout: 'fixed',
          width: '100%',
        }}
      >
        {children}
      </TableRaw>
    </TableContext.Provider>
  );
}

export type TableHeadProps = {
  header: Header<unknown, unknown>;
  className?: string;
};

export const TableHead = ({ header, className }: TableHeadProps) => {
  const { columnWidths } = useContext(TableContext);
  const width = columnWidths[header.id] || 0;

  return (
    <TableHeadRaw
      key={header.id}
      className={cn(className)}
      style={{
        width: width ? `${width}px` : 'auto',
        maxWidth: width ? `${width}px` : 'auto',
        minWidth: width ? `${width}px` : 'auto',
        boxSizing: 'border-box',
      }}
    >
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </TableHeadRaw>
  );
};

export type TableHeaderGroupProps = {
  headerGroup: HeaderGroup<unknown>;
  children: (props: { header: Header<unknown, unknown> }) => ReactNode;
};

export const TableHeaderGroup = ({
  headerGroup,
  children,
}: TableHeaderGroupProps) => (
  <TableRowRaw key={headerGroup.id} className="table-outer border-b">
    {headerGroup.headers.map((header) => children({ header }))}
  </TableRowRaw>
);

export type TableHeaderProps = {
  className?: string;
  children: (props: { headerGroup: HeaderGroup<unknown> }) => ReactNode;
};

export const TableHeader = ({ className, children }: TableHeaderProps) => {
  const { table } = useContext(TableContext);

  return (
    <TableHeaderRaw className={cn('bg-table-header', className)}>
      {table?.getHeaderGroups().map((headerGroup) => children({ headerGroup }))}
    </TableHeaderRaw>
  );
};

export interface TableColumnHeaderProps<
  TData,
  TValue,
> extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function TableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: TableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div
        className={cn(
          'text-body text-muted-foreground p-0 font-bold',
          className
        )}
      >
        {title}
      </div>
    );
  }

  return (
    <div className={cn('p-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-accent text-body text-muted-foreground hover:bg-primary/3.5 -ml-2 h-8 p-0 font-bold"
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className="ml-2 size-4" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className="ml-2 size-4" />
            ) : (
              <ChevronsUpDownIcon className="ml-2 size-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="text-muted-foreground mr-2 size-4" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="text-muted-foreground mr-2 size-4" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export type TableCellProps = {
  cell: Cell<unknown, unknown>;
  className?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLTableCellElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLTableCellElement>;
};

export const TableCell = ({
  cell,
  className,
  onMouseEnter,
  onMouseLeave,
}: TableCellProps) => {
  const { columnWidths } = useContext(TableContext);
  const width = columnWidths?.[cell.column.id] || 0;

  return (
    <TableCellRaw
      className={cn('text-body p-2', className)}
      style={{
        width: width ? `${width}px` : 'auto',
        maxWidth: width ? `${width}px` : 'auto',
        minWidth: width ? `${width}px` : 'auto',
        boxSizing: 'border-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCellRaw>
  );
};

export type TableRowProps = {
  row: Row<unknown>;
  children: (props: { cell: Cell<unknown, unknown> }) => ReactNode;
  className?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLTableRowElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLTableRowElement>;
};

export const TableRow = ({
  row,
  children,
  className,
  onMouseEnter,
  onMouseLeave,
}: TableRowProps) => (
  <TableRowRaw
    key={row.id}
    data-state={row.getIsSelected() && 'selected'}
    className={cn(
      'table-inner hover:bg-blue-primary/3.5 dark:hover:bg-accent/25',
      className
    )}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {row.getVisibleCells().map((cell) => children({ cell }))}
  </TableRowRaw>
);

export type TableBodyProps = {
  children: (props: { row: Row<unknown> }) => ReactNode;
  className?: string;
  isLoading?: boolean;
};

export const TableBody = ({
  children,
  className,
  isLoading = false,
}: TableBodyProps) => {
  const { columns, table } = useContext(TableContext);
  const rows = table?.getRowModel().rows;

  return (
    <TableBodyRaw className={className}>
      {rows?.length ? (
        rows.map((row) => children({ row }))
      ) : (
        <TableRowRaw>
          <TableCellRaw
            colSpan={columns.length}
            className="text-muted-foreground text-body-large h-12 p-2 text-center"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              'No results.'
            )}
          </TableCellRaw>
        </TableRowRaw>
      )}
    </TableBodyRaw>
  );
};
