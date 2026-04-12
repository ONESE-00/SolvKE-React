import { handleAsync } from "./request";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const demoProfile = {
  user: {
    firstName: "Amina",
    lastName: "Njoroge",
  },
  accounts: [
    {
      id: "acc-001",
      accountNumber: "1030048291",
      balance: 248500,
      currency: "KES",
    },
  ],
  cards: [
    {
      id: "card-001",
      type: "Debit Card",
      last4: "2209",
      frozen: false,
    },
  ],
  insights: {
    monthlySpend: 42800,
    spendingTrend: "8% lower",
  },
  activity: [
    {
      id: "act-001",
      title: "Salary credit",
      time: "Today, 09:10",
      amount: 120000,
      direction: "credit",
      category: "Income",
    },
    {
      id: "act-002",
      title: "Power bill payment",
      time: "Today, 08:24",
      amount: 3600,
      direction: "debit",
      category: "Utilities",
    },
    {
      id: "act-003",
      title: "Transfer to Savings Pocket",
      time: "Yesterday, 18:30",
      amount: 15000,
      direction: "debit",
      category: "Transfer",
    },
  ],
};

const credentials = {
  accountNumber: "1030048291",
  password: "Secure@123",
};

export const bankApi = {
  login: (payload) =>
    handleAsync(async () => {
      await wait(800);

      if (
        payload.accountNumber !== credentials.accountNumber ||
        payload.password !== credentials.password
      ) {
        throw new Error("Invalid account number or password.");
      }

      return structuredClone(demoProfile);
    }, "Login failed."),

  performAction: (actionKey, payload, profile) =>
    handleAsync(async () => {
      await wait(700);
      const amount = Number(payload.amount || 0);
      const currentBalance = profile.accounts[0].balance;

      if (actionKey !== "cardToggle" && (!amount || amount <= 0)) {
        throw new Error("Enter a valid amount greater than zero.");
      }

      if (actionKey !== "cardToggle" && amount > currentBalance) {
        throw new Error("Insufficient balance for this transaction.");
      }

      if (actionKey === "transfer") {
        return {
          message: `Transfer to ${payload.recipient} completed successfully.`,
          accountUpdates: {
            balance: currentBalance - amount,
          },
          profileUpdates: {
            insights: {
              ...profile.insights,
              monthlySpend: profile.insights.monthlySpend + amount,
            },
          },
          activityItem: {
            id: crypto.randomUUID(),
            title: `Transfer to ${payload.recipient}`,
            time: "Just now",
            amount,
            direction: "debit",
            category: "Transfer",
          },
        };
      }

      if (actionKey === "billPay") {
        return {
          message: `${payload.biller} bill paid successfully.`,
          accountUpdates: {
            balance: currentBalance - amount,
          },
          profileUpdates: {
            insights: {
              ...profile.insights,
              monthlySpend: profile.insights.monthlySpend + amount,
            },
          },
          activityItem: {
            id: crypto.randomUUID(),
            title: `${payload.biller} bill payment`,
            time: "Just now",
            amount,
            direction: "debit",
            category: "Bill payment",
          },
        };
      }

      const frozen = payload.status === "Freeze";
      return {
        message: `Your debit card is now ${frozen ? "frozen" : "active"}.`,
        accountUpdates: {},
        profileUpdates: {
          cards: profile.cards.map((card) => ({
            ...card,
            frozen,
          })),
        },
        activityItem: {
          id: crypto.randomUUID(),
          title: `Card ${frozen ? "frozen" : "unfrozen"}`,
          time: "Just now",
          amount: 0,
          direction: "credit",
          category: "Security",
        },
      };
    }, "Unable to process banking action."),
};
