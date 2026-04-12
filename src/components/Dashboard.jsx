import { useState } from "react";
import { toast } from "sonner";
import { SummaryCard } from "./SummaryCard";
import { ActionForm } from "./forms/ActionForm";
import { ActivityList } from "./ActivityList";
import { SectionTitle } from "./ui/SectionTitle";
import { bankApi } from "../services/bankApi";

export function Dashboard({ profile, onProfileChange }) {
  const [processingAction, setProcessingAction] = useState("");

  const runAction = async (actionKey, values) => {
    setProcessingAction(actionKey);

    try {
      const result = await bankApi.performAction(actionKey, values, profile);

      onProfileChange((currentProfile) => ({
        ...currentProfile,
        ...result.profileUpdates,
        accounts: currentProfile.accounts.map((account) =>
          account.id === currentProfile.accounts[0].id
            ? { ...account, ...result.accountUpdates }
            : account,
        ),
        activity: [result.activityItem, ...currentProfile.activity].slice(0, 8),
      }));

      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setProcessingAction("");
    }
  };

  const primaryAccount = profile.accounts[0];
  const actionCards = [
    {
      key: "transfer",
      title: "Transfer money",
      description: "Move funds between accounts or send to a beneficiary.",
      fields: [
        { name: "recipient", label: "Recipient", placeholder: "Amina Holdings" },
        { name: "amount", label: "Amount", type: "number", placeholder: "5000" },
      ],
      submitLabel: "Send transfer",
    },
    {
      key: "billPay",
      title: "Pay a bill",
      description: "Settle utilities or recurring service payments quickly.",
      fields: [
        { name: "biller", label: "Biller", placeholder: "Nairobi Water" },
        { name: "amount", label: "Amount", type: "number", placeholder: "2400" },
      ],
      submitLabel: "Pay bill",
    },
    {
      key: "cardToggle",
      title: "Card controls",
      description: "Instantly freeze or unfreeze your debit card.",
      fields: [
        {
          name: "status",
          label: "Card status",
          type: "select",
          options: ["Freeze", "Unfreeze"],
        },
      ],
      submitLabel: "Update card",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[30px] border border-white/70 px-5 py-6 shadow-panel sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.35em] text-secondary">
              Portfolio pulse
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold text-primary">
              KES {primaryAccount.balance.toLocaleString()} ready to deploy.
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Your primary account remains the operating hub for transfers, bills,
              and card security actions.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white px-4 py-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Primary account
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {primaryAccount.accountNumber}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white px-4 py-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Card state
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {profile.cards[0].frozen ? "Frozen" : "Active"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          label="Available balance"
          value={`KES ${primaryAccount.balance.toLocaleString()}`}
          accent="primary"
          meta={`Account ${primaryAccount.accountNumber}`}
        />
        <SummaryCard
          label="Monthly spend"
          value={`KES ${profile.insights.monthlySpend.toLocaleString()}`}
          accent="secondary"
          meta={`${profile.insights.spendingTrend} from last month`}
        />
        <SummaryCard
          label="Card status"
          value={profile.cards[0].frozen ? "Frozen" : "Active"}
          accent={profile.cards[0].frozen ? "slate" : "emerald"}
          meta={`${profile.cards[0].type} ending ${profile.cards[0].last4}`}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <SectionTitle
            eyebrow="Account actions"
            title="Handle everyday banking tasks"
            description="Reusable action cards keep transfers, bills, and controls consistent."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {actionCards.slice(0, 2).map((action) => (
              <ActionForm
                key={action.key}
                title={action.title}
                description={action.description}
                fields={action.fields}
                submitLabel={action.submitLabel}
                loading={processingAction === action.key}
                onSubmit={(values) => runAction(action.key, values)}
              />
            ))}
            <ActionForm
              title={actionCards[2].title}
              description={actionCards[2].description}
              fields={actionCards[2].fields}
              submitLabel={actionCards[2].submitLabel}
              loading={processingAction === actionCards[2].key}
              onSubmit={(values) => runAction(actionCards[2].key, values)}
              className="lg:col-span-2"
            />
          </div>
        </div>

        <div className="space-y-5">
          <SectionTitle
            eyebrow="Recent activity"
            title="Track movement in real time"
            description="A compact feed of the latest payments, transfers, and card events."
          />
          <ActivityList items={profile.activity} />
        </div>
      </section>
    </div>
  );
}
