import HeaderBox from "@/components/HeaderBox";
import Loader from "@/components/Loader";
import { Pagination } from "@/components/Pagination";
import TransactionsTable from "@/components/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";
import { Suspense } from "react";

const TransactionHistory = async ({
  searchParams: { id, page },
}: SearchParamProps) => {
  const loggedIn = await getLoggedInUser();
  const currentPage = Number(page) || 1;
  if (!loggedIn) return;
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  if (!accounts) return;

  const accountsData = accounts?.data;

  const appwriteItemId = (id as string) || accountsData[0].appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>
      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account.data.name}
            </h2>
            <p className="text-14 text-blue-25">{account.data.officialName}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●●{" "}
              <span className="taxt-16">{account.data.mask}</span>
            </p>
          </div>
          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <div className="text-24 text-center font-bold">
              {formatAmount(account.data.currentBalance)}
            </div>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          <TransactionsTable
            appwriteItemId={appwriteItemId}
            currentPage={currentPage}
          />
        </section>
      </div>
    </div>
  );
};
export default TransactionHistory;
