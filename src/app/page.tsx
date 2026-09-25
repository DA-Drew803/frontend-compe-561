import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const benefits = [
  { number: "01", title: "GROUP PLANNING", detail: "Made for friends" },
  { number: "02", title: "SMART MATCHING", detail: "Dates + budget" },
  { number: "03", title: "PERSONALIZED", detail: "Shared interests" },
  { number: "04", title: "ITINERARY", detail: "Built for your group" },
];

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-heading">
        <SiteHeader overlay />
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">PLAN TOGETHER</p>
          <h1 id="hero-heading">Find a trip everyone can agree on.</h1>
          <p className="hero-description">Shared dates, budgets, and interests.</p>
          <Link className="primary-button" href="/plan">
            START PLANNING <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <span className="hero-index" aria-hidden="true">01 / 04</span>
      </section>

      <section className="benefits" aria-label="Why plan with Vacation Together">
        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <article className="benefit" key={benefit.number}>
              <span className="benefit-number">{benefit.number}</span>
              <div>
                <h2>{benefit.title}</h2>
                <p>{benefit.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-heading">
        <div className="about-inner">
          <p className="eyebrow about-eyebrow">ABOUT VACATION TOGETHER</p>
          <div className="about-copy">
            <h2 id="about-heading">Better trips begin together.</h2>
            <p>
              Group travel should start with the people going on the trip. Bring everyone&apos;s
              dates, budget, and interests into one shared plan, then find a direction that
              feels right for the whole group.
            </p>
            <Link className="text-link" href="/plan">
              START PLANNING <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
