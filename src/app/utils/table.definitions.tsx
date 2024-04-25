import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import MintDialog from '@/components/mint-dialog'

export interface VaultType {
  accountId: string
  id: string
  name: string
  frequency: number
  amount: number
  mint(): any
}

const columnHelper = createColumnHelper<VaultType>()

export const vaultDefinition = [
  columnHelper.accessor('accountId', {
    header: 'Owner',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('frequency', {
    header: 'Frequency',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('amount', {
    header: 'Amount (N)',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('id', {
    header: 'Contract id',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('mint', {
    header: 'Pass',
    cell: (props) => {
      return (
        <button>
          <MintDialog />
        </button>
      )
    },
  }),
] as Array<ColumnDef<unknown, VaultType>>
