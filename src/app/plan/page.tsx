import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

// Temporary destination until the Planning page is built in a separate task.
export default function PlanPage() {
  return (
    <main className="plan-page">
      <SiteHeader />
      <section className="plan-placeholder" aria-labelledby="plan-heading">
        <p className="eyebrow">YOUR NEXT TRIP STARTS HERE</p>
        <h1 id="plan-heading">Planning is coming next.</h1>
        <p>
          Soon, your group will be able to share dates, budgets, and interests here.
        </p>
        <Link className="text-link" href="/">
          <span aria-hidden="true">←</span> BACK TO HOME
        </Link>
      </section>
    </main>
  );
}
