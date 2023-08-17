import type { QTableColumn, QTablePagination } from '@shared/models/table.model.d'

interface TableOptionsReturnType {
  pagination: Ref<QTablePagination>
  readonly rowsPerPageOptions: Array<{ label: string; value: number }>
  readonly rowsPerPageRawOptions: number[]
  setPagination(v: QTablePagination, forServer?: boolean): void
}

const rowsPerPageRawOptions = [10, 20, 50, 100]

export function useTablePagination(): TableOptionsReturnType {
  const { lang } = useQuasar()

  const pagination = ref<QTablePagination>({
    descending: false,
    page: 1,
    rowsPerPage: 20,
    sortBy: 'id',
  })

  const rowsPerPageOptions = rowsPerPageRawOptions.map(count => ({
    label: count === 0 ? lang.table.allRows : `${count}`,
    value: count,
  }))

  function setPagination(v: QTablePagination, forServer = true): void {
    set(pagination, v)
    if (forServer)
      set(pagination.value!, 'page', v!.page + 1)
  }

  return {
    pagination,
    rowsPerPageOptions,
    rowsPerPageRawOptions,
    setPagination,
  }
}

export function useColumns<T>(headers: Array<QTableColumn<T>>): ComputedRef<Array<Required<QTableColumn<T>>>> {
  const { t } = useI18n()

  return computed(() => headers.map(o => ({
    ...o,
    align: o.align ?? 'left',
    field: o.field ?? (row => row),
    format: o.format ?? ((v: any) => (typeof v === 'boolean' ? v : (v || '-'))),
    label: o.label ?? t(o.name || (o.field?.toString() ?? '')),
    name: o.name || o.field?.toString(),
    sortable: o.sortable ?? false,
  }) as Required<QTableColumn<T>>))
}
