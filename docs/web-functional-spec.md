# Vacation Together Web Functional Specification

## Purpose and scope

This document defines the behavior of the four desktop web pages in the current [Figma design](https://www.figma.com/design/eAUzix6NADXsGdHoWowikE/Vacation-home?node-id=0-1&p=f): Landing, Planning, Destination Results, and Itinerary. It translates the visual flow into page actions for implementation. No mobile design changes are included.

The first implementation can use clearly identified sample destinations and itineraries. A displayed match percentage or price must not be presented as a calculated or live value until the calculation and data source are implemented.

## Repository boundary

The course project uses **two separate GitHub repositories**. Keep their code, dependencies, configuration, and tests separate.

`AGENTS.md` is a local-only instruction file. Ignore it in each repository and never commit or push it to GitHub.

| Frontend repository | Backend repository |
| --- | --- |
| Next.js, React, TypeScript, Tailwind CSS, and ShadCN UI. | FastAPI, Pydantic, SQL, and PostgreSQL. |
| Owns the four web pages, navigation, form interactions, English website copy, loading/error states, and presentation of results. | Owns request validation, trip persistence, destination matching, price estimates, itinerary data, and refinement rules. |
| Calls the backend API and displays its responses. It must not contain database credentials or a second copy of the production matching algorithm. | Returns data through documented API responses. It must not contain page components or frontend styling. |

The teams should agree on request and response shapes before connecting the repositories. The API outline below is a proposed interface, not an existing implementation.

## Main journey

`Landing → Planning → Destination Results → Itinerary`

The website should never show an itinerary without a selected destination. If a visitor opens Results without a plan, send them to Planning with an English explanation. If they open Itinerary without a selected destination, send them to Results when a plan exists, or to Planning otherwise.

| Page | Proposed route | Main purpose | Primary action |
| --- | --- | --- | --- |
| Landing | `/` | Explain the group trip planner and invite visitors to begin. | **Start Planning** → `/plan` |
| Planning | `/plan` | Collect one group's traveler list, dates, budget, and interests. | **Show Our Matches** → `/results` after validation |
| Destination Results | `/results` | Show ranked destination options with a match score and estimated cost per person. | **Explore [Destination]** → `/itinerary` for that destination |
| Itinerary | `/itinerary` | Show the selected destination and a day-by-day group plan. | Refinement controls update the displayed plan. |

After backend integration, carry the returned trip ID in the Results and Itinerary URLs (for example, `/results?tripId=...`) so a direct link or refresh can request the correct data from the backend.

## Shared navigation

| Control in the design | Expected action |
| --- | --- |
| **Vacation Together** logo | Return to `/`. |
| **Destinations** | Open `/results` when a plan exists; otherwise open `/plan` with a prompt to plan first. |
| **Plan a Trip** | Open `/plan`. Preserve existing form values when returning from Results or Itinerary. |
| **My Trip** | Open `/itinerary` when a destination is selected. Otherwise open `/results` if a plan exists, or `/plan` if it does not. |
| **About** | Go to an English About section on the Landing page (`/#about`). This small section needs to be added during implementation because it is not shown as a separate Figma page. |
| Theme control | Switch between light and dark presentation across the site only after both sets of colors and states are specified. Until then, do not ship a visible control that does nothing. |

## Landing

The page introduces the value of planning a trip together. Its hero message and travel image lead to **Start Planning**. The four short benefit blocks under the hero explain group planning, matching, shared interests, and itineraries; they are informational and do not need to be clickable.

**Acceptance criteria**

- **Start Planning** opens Planning.
- Shared navigation behaves as specified above.
- The About navigation has a real on-page destination and no dead link.

## Planning

The design shows five example travelers (Andrew, My Ky, Celeb, Nathan, and Joy), date presets, a custom-date option, four budget choices, and interest choices. Traveler and interest chips allow multiple selections. Date preset and budget each allow one selection.

| Control | Expected action |
| --- | --- |
| Traveler chip | Toggle the traveler in or out of the trip. Require at least one selected traveler. The displayed names are sample data, not a permanent five-person limit. |
| **Winter Break**, **Spring Break**, **Summer**, **Flexible Dates** | Select one date choice. The actual date range represented by each seasonal choice must be defined before live recommendations. |
| **Choose custom dates** | Reveal start and end date inputs. Require an end date on or after the start date. |
| **Budget**, **Comfort**, **Premium**, **Flexible** | Select one budget tier. Show the amount and currency consistently. |
| Interest choices | Toggle multiple interests; require at least one before requesting matches. |
| **Show Our Matches** | Validate the form. If valid, save the plan and open Results. If invalid, show English field-level messages and keep the visitor's selections. |

The current form captures **one shared set of choices for a group**. It does not yet capture separate dates, budgets, and interests from each traveler. A real per-person group compatibility score therefore requires either an additional input flow or a revised definition of “group match.”

## Destination Results

The current design presents Tokyo as the featured result, with Seoul and Bangkok as additional options. Each option has a destination name, match percentage, and estimated price per person. These values are design examples until a scoring method and price source are defined.

| Control | Expected action |
| --- | --- |
| **Explore Tokyo** | Select Tokyo and open its itinerary. |
| Other destination result | Selecting the result should open an itinerary for that destination. If a destination has no itinerary data yet, show an English unavailable state rather than silently displaying Tokyo's plan. |
| **Plan a Trip** in navigation | Return to Planning with the previous selections intact so the visitor can change the search. |

Results should state why a destination fits the selected dates, budget, and interests once the matching logic exists. They should label cost as **estimated cost per person** and identify what the estimate includes. Provide English loading, empty, and error states when live data is connected.

## Itinerary

The current Figma example shows a Tokyo trip with four day entries: Arrival + Shibuya, Asakusa + Local Food, Museums + City Walk, and Flexible Group Day. The itinerary shown must always correspond to the destination selected on Results.

| Control | Expected action |
| --- | --- |
| **Make It Cheaper** | Request a lower-cost version of the selected itinerary, then update the activities and estimated cost together. If no lower-cost alternative exists, explain that in English. |
| **Reduce Walking** | Replace activities or transport assumptions to reduce walking while keeping the same destination. Explain when no alternative is available. |
| **Swap Activity** | Let the visitor select an activity and choose an alternative for that day. The design does not yet show the activity-selection interaction; define that interaction before implementing this control. |
| **Plan a Trip** in navigation | Return to the existing plan for editing. |

The refinement buttons describe intended behavior. They must not merely change text or numbers without updating the underlying itinerary data. For an initial sample-data implementation, use a small set of explicit alternative itineraries and label them as examples.

## Data needed between pages

- **Trip plan:** selected travelers, date choice or custom date range, budget tier, interests, and currency.
- **Destination result:** destination ID, name, match score, estimated cost per person, image, and a short reason for the match.
- **Selected trip:** plan ID, selected destination ID, day-by-day activities, estimated cost, and applied refinements.

Keep the plan when navigating backward and when revisiting Results. After backend integration, store trips in PostgreSQL and use a trip identifier so refreshing a page can restore the correct plan and itinerary.

## Proposed frontend–backend interface

| User action | Frontend request | Backend responsibility |
| --- | --- | --- |
| Submit Planning | `POST /trips` with travelers, dates, budget, and interests | Validate and save the plan; return a trip ID. |
| Open Results | `GET /trips/{tripId}/matches` | Return ranked destinations, match explanations, and per-person cost estimates. |
| Choose a destination | `POST /trips/{tripId}/destination` with a destination ID | Save the selection and provide the corresponding itinerary. |
| Open or refresh Itinerary | `GET /trips/{tripId}/itinerary` | Return the selected destination and its current day-by-day plan. |
| Refine Itinerary | `POST /trips/{tripId}/itinerary/refinements` with a refinement type and an activity target when needed | Apply a valid change and return the updated itinerary and estimate, or explain why no change is available. |

The frontend should show a clear English message for invalid inputs, unavailable results, and API errors. Endpoint names and payloads should be confirmed by both repository owners before implementation; once confirmed, keep the contract documented in both repositories.

## Decisions needed before calculated recommendations

1. Will each traveler submit separate preferences, or will one person enter a shared group preference? This determines what “group match” means.
2. What exact dates do the seasonal presets mean, and which year and time zone apply?
3. How is the match score calculated and explained to the visitor?
4. Where do estimated prices come from, what do they include, and when were they last updated?
5. What data or rules generate alternatives for the three itinerary refinement controls?

## Out of scope for this first web flow

Account creation, booking, payment, live travel inventory, and changes to the mobile Figma designs are not part of this specification.
