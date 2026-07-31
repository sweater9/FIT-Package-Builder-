import Link from "next/link";
import { requireChatGPTUser, chatGPTSignOutPath } from "../chatgpt-auth";
import { listQuotesForOwner } from "../../lib/quotes";

function money(value: number) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function QuotesPage() {
  const user = await requireChatGPTUser("/quotes");
  const result = await listQuotesForOwner(user.email);

  return (
    <main className="history-shell">
      <header className="history-header">
        <div>
          <span className="eyebrow">Sales workspace</span>
          <h1>Saved quotations</h1>
          <p>Permanent proposals created by {user.displayName}.</p>
        </div>
        <div className="history-actions">
          <Link className="primary-link" href="/">Create quotation</Link>
          <Link className="text-link" href={chatGPTSignOutPath("/")}>Sign out</Link>
        </div>
      </header>

      <section className="history-card">
        {result.results.length === 0 ? (
          <div className="empty-state">
            <strong>No saved quotations yet</strong>
            <p>Create your first package, then select “Save quotation”.</p>
          </div>
        ) : (
          <div className="quote-table-wrap">
            <table className="quote-table">
              <thead><tr><th>Reference</th><th>Destination</th><th>Created</th><th>Total</th><th /></tr></thead>
              <tbody>
                {result.results.map((quote) => (
                  <tr key={quote.quote_number}>
                    <td><strong>{quote.quote_number}</strong></td>
                    <td>{quote.destination}</td>
                    <td>{new Date(quote.created_at).toLocaleDateString("en-AE", { dateStyle: "medium" })}</td>
                    <td>{money(quote.total)}</td>
                    <td><Link href={`/?proposal=${quote.public_token}`}>Open</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
