import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { transactionCategoryStyles } from "@/constants";
import { getAccount } from "@/lib/actions/bank.actions";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";
import { Pagination } from "./Pagination";

const CategoryBadage = ({ category }: { category: string }) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    transactionCategoryStyles[
      category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default;
  return (
    <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)} />
      <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
    </div>
  );
};

const TransactionsTable = async ({
  appwriteItemId,
  currentPage,
}: TransactionTableProps) => {
  const account = await getAccount({ appwriteItemId });

  const rowsPerPage = 10;
  const totalPages = Math.ceil(account.transactions.length / rowsPerPage);
  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const transactions = account.transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  return (
    <>
      <div>
        <Table>
          <TableHeader className="bg-[#f9fafb]">
            <TableRow>
              <TableHead className="px-2">Transactions</TableHead>
              <TableHead className="px-2">Amount</TableHead>
              <TableHead className="px-2">Status</TableHead>
              <TableHead className="px-2">Date</TableHead>
              <TableHead className="px-2 max-md:hidden">Channel</TableHead>
              <TableHead className="px-2 max-md:hidden">Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction: Transaction) => {
              const status = getTransactionStatus(new Date(transaction.date));
              const amount = formatAmount(transaction.amount);
              const isDebit = transaction.type === "debit";

              return (
                <TableRow
                  key={transaction.id}
                  className={`${
                    isDebit || amount[0] === "-"
                      ? "bg-[#FFFBFA]"
                      : "bg-[#F6FEF9]"
                  } hover:!bg-white border-b-default`}
                >
                  <TableCell className="max-w-[250px] pl-2 pr-10">
                    <div className="flex items-center gap-3">
                      <h1 className="text-14 truncate font-semibold text-[#344054]">
                        {removeSpecialCharacters(transaction.name)}
                      </h1>
                    </div>
                  </TableCell>

                  <TableCell
                    className={`pl-2 pr-10 font-semibold ${
                      isDebit || amount[0] === "-"
                        ? "text-[#f04438]"
                        : "text-[#039855]"
                    }`}
                  >
                    {isDebit ? `-${amount}` : amount}
                  </TableCell>

                  <TableCell className={`pl-2 pr-10`}>
                    <CategoryBadage category={status} />
                  </TableCell>

                  <TableCell className="pl-2 pr-10 min-w-32">
                    {formatDateTime(new Date(transaction.date)).dateTime}
                  </TableCell>

                  <TableCell className="max-md:hidden pl-2 pr-10 capitalize min-2-24">
                    {transaction.paymentChannel}
                  </TableCell>

                  <TableCell className="max-md:hidden pl-2 pr-10">
                    <CategoryBadage category={transaction.category} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="my-4 w-full">
          <Pagination page={currentPage} totalPages={totalPages} />
        </div>
      )}
    </>
  );
};
export default TransactionsTable;
