# Stöpsel

## Product specification

**Status:** Initial product specification  
**Project type:** Non-commercial open-source project  
**Primary audience:** Swedish-speaking people in Finland  
**Primary purpose:** Collect contemporary, everyday Finland-Swedish dialect data

---

## 1. Purpose

Stöpsel is a mobile-first web application. It collects written examples of how
people say everyday things in Finland-Swedish dialects.

The main question is:

> How would you naturally say this in your dialect?

The application shows a prompt in standard Swedish. A contributor writes how
they would say the same thing in their dialect. The corpus is the main long-term
result. It can support research, dictionaries, open data, and language
technology.

Stöpsel collects prompted, self-reported written responses that represent spoken
dialect. It does not collect natural conversations. Contributor spelling is not
a formal phonetic transcription. The source prompt can also affect the response.

Do not describe the corpus as a complete record of natural speech.

For each product decision, ask:

> Does this help collect useful, trustworthy, and privacy-conscious everyday
> Finland-Swedish dialect data?

Use these product terms consistently:

- **Prompt:** The standard-Swedish text shown to a contributor.
- **Response:** The dialect text entered by a contributor.
- **Contribution:** The stored record that contains a response and its metadata.
- **Daily phrase:** The shared prompt feature for one calendar day.

## 2. Goal and success

The first version must answer this question:

> Will people regularly submit natural dialect responses and review responses
> from other contributors?

Initial success can mean:

- contributors from several Finland-Swedish regions;
- 10 to 20 weekly active pseudonymous contributors;
- at least 500 contributions;
- regular daily-phrase activity;
- a working community-review process;
- a useful internal corpus export.

Measure daily-phrase responses, returning contributors, additional responses,
reviews, represented dialect areas, and contributions that pass moderation.

## 3. Product principles

- **Everyday language:** Use ordinary conversations, common expressions,
  contemporary subjects, and common language structures.
- **Simple questions:** Contributors must not need knowledge of linguistics.
- **Variation is data:** Keep different words, spellings, sentence structures,
  and expressions. Do not select one canonical response.
- **Account-free participation:** Contributors do not need accounts. This does
  not mean that their contributions are anonymous.
- **Minimum personal data:** Collect only data that has a clear product,
  research, legal, or security need.
- **Mobile and accessible use:** A new visitor should be able to contribute in
  less than one minute.
- **Light engagement:** Do not use strict streak loss, pressure, excessive
  rewards, or many competing scores.

Historical dialect material is valuable, but it is not the main purpose of
Stöpsel. Optional speaker metadata can come later after its value and privacy
risk are clear.

## 4. Core flow

```text
Select dialect
      ↓
See today's phrase
      ↓
Write a natural dialect response
      ↓
Submit
      ↓
Optionally review other responses
      ↓
Return tomorrow or continue with more prompts
```

The first visit must not start with registration or demographic questions.

Dialect selection can include a region, municipality or dialect area, and an
optional locality or village. Do not infer dialect from current position. Start
with broad and clear areas. Language experts can improve the list later.

## 5. Daily phrase and prompts

The daily phrase is the main return feature. All contributors see the same
standard-Swedish prompt on the same day.

```text
Dagens fras

Hur säger du det här på din dialekt?

"Jag vet inte var han är."

[ __________________________ ]

[ Skicka ]
```

Daily-phrase rules:

- Use the Europe/Helsinki calendar day.
- Do not show other responses before submission.
- After submission, show only responses with enough review support.
- If no reviewed responses exist, show a response count and offer a review task.
- Let the contributor continue with other prompts.
- Do not punish a missed day.
- Store the scheduled date with the prompt.

An administrator schedules phrases in advance. If none is scheduled, the
system selects and stores one active fallback for all contributors that day.

After the daily phrase, contributors can answer more curated prompts. Prompts
must cover useful everyday words and language structures. Do not use random
sentences from a general text collection.

The first prompt tool must let an administrator add, disable, and schedule a
prompt. An administrator can edit a prompt only before it has responses. A
correction after that point creates a new version. This keeps old results
reproducible.

A simple count such as `Du har bidragit under 6 dagar` is sufficient. The first
version does not need points, badges, or a competitive streak.

## 6. Contributions and guest identity

A contribution stores:

- prompt and prompt version;
- selected dialect area;
- response text;
- pseudonymous guest identifier;
- submission time and moderation state;
- applicable notice and submission-terms versions.

Allow several responses for the same prompt and dialect. Keep the submitted text
unless moderation or a valid deletion request requires another action.

On the first contribution, the browser creates a private random guest token.
The server stores a related pseudonymous identifier. It links the contributor's
contributions and reviews without an account.

Use this identifier only to:

- count participation days;
- prevent self-review and repeated review;
- reduce repeated submissions;
- support linked-contribution deletion;
- support proportionate abuse prevention.

Do not include the token or identifier in public pages, shared links, or corpus
exports. The privacy page must explain its purpose and retention period. It must
also explain that clearing browser data can remove direct access to contribution
controls.

The identifier is pseudonymous personal data. It is not anonymous data.

### 6.1 Guest deletion and recovery

The privacy page must use the private guest token to show contributions linked
to the current browser. The contributor can delete selected contributions or
all data linked to the guest identifier, including contributions, reviews, and
participation records.

After the first contribution, offer a private recovery code. The contributor
can use it to restore access to the guest identity on another browser or after
local browser data is lost.

Treat the recovery code as a secret:

- Show it only when the contributor requests it.
- Do not include it in URLs, logs, analytics, or corpus exports.
- Do not store the readable code on the server.
- Explain that anyone with the code can control the linked contributions.

If both the guest token and recovery code are lost, the contributor can contact
the project. The project must explain that it might not be possible to confirm
which contributions belong to that person.

## 7. Community review and moderation

Community review asks whether a contribution sounds natural for the selected
dialect. It does not select one official response.

Use the choices `Ja`, `Delvis`, `Nej`, and `Hoppa över`.

Review rules:

- Do not let a person review their own contribution.
- Do not show the same review task to the same person twice.
- Let the reviewer skip a response or submit another response.
- Show tasks only for dialects that the reviewer says they understand.
- Store each review event, not only a calculated score.

Moderation asks whether content is legitimate and safe. Use simple checks for
links, script content, very long answers, repeated content, copies of the source
prompt, fast submission, and known spam patterns.

Every visible contribution must have a report action. Reports can identify
spam, no real response, abusive content, or personal data. Do not reject
borderline dialect content automatically.

## 8. Administration

The first version has one administrator role. Add a separate moderator role
only when another person needs limited access.

Use Better Auth with its Admin plugin for administrator access. Use email and a
password for the first-version sign-in method. Public contributors must not need
a Better Auth account.

There is no public administrator registration or password-reset page. Disable
public sign-up. Create the first administrator with the Better Auth
`create-admin` command. Use the same controlled process for additional
administrators until staff-management tools are necessary.

Use a strong, unique generated password. Apply sign-in rate limits. Reset an
administrator password only through a controlled server-side command. The first
version does not need an email-delivery service, magic links, or passkeys.

The server must check the administrator role for every protected action. Each
administrator action that changes data must create an audit record with the
administrator, action, affected item, time, and optional reason.

The admin interface needs:

- reports and a moderation queue;
- contribution lookup;
- prompt management and daily-phrase scheduling;
- internal corpus export.

Show only contributor data that is necessary for moderation. The admin
interface must not become a general contributor-tracking tool.

## 9. Privacy and submission terms

Use these terms consistently:

- **Account-free:** A person can contribute without an account.
- **Pseudonymous:** Records use an indirect identifier but can still be linked.
- **De-identified:** Direct links are removed, but other data can still identify
  a person.
- **Anonymous:** Identification is not reasonably possible and the identifying
  link cannot be restored.
- **Privacy-filtered public corpus:** A release removes or groups data that
  creates an unnecessary identification risk.

Do not describe pseudonymous or de-identified contributions as anonymous.

Keep operational, research, and future public-corpus data separate. A public
corpus must not include emails, account IDs, guest identifiers, raw IP
addresses, or moderation history. Do not attach raw IP addresses to
contributions for long-term storage.

Before launch, publish privacy and submission terms that explain:

- who controls the data and how to make contact;
- each purpose and legal basis;
- stored data and retention periods;
- access and deletion processes;
- planned research use and possible public release;
- the license or permission for submitted text;
- what can happen to data in an existing corpus release.

The contributor must confirm that the response is their own and does not
intentionally contain another person's private information. Store the applicable
notice and terms versions with each contribution.

Do not make a public corpus release until its license, privacy filter,
withdrawal process, and release documentation are ready.

## 10. First public version

The first public version includes:

- landing page and dialect selection;
- daily phrase and additional curated prompts;
- pseudonymous guest identity;
- text contributions and community review;
- simple participation feedback and dialect statistics;
- basic spam controls, reports, and deletion controls;
- Better Auth for one administrator role;
- protected admin interface and audit records;
- prompt management and scheduling;
- clear privacy and submission terms;
- internal corpus export;
- automated and tested backups.

The public interface should use clear Swedish. It must provide keyboard access,
screen-reader labels, sufficient contrast, large touch controls, visible focus,
clear errors, and no gesture-only action.

Treat contributor text as untrusted input. Use secure cookies, server-side
access checks, input validation, output escaping, request-forgery protection,
rate limits, and protected secrets. Keep backups separate from the live
database and test restoration.

## 11. Not in the first version

- contributor accounts and profiles;
- moderator roles and staff invitation tools;
- leaderboards, points, badges, and competitive streaks;
- sharing cards, public explorers, and dialect maps;
- public corpus releases;
- optional speaker metadata;
- advanced prompt statistics;
- PWA and offline functions;
- public APIs and research-access tools;
- audio recording;
- NLP and dialect translation work;
- native mobile applications;
- complex social functions or infrastructure.

Audio is a separate future area. It requires explicit permission, a clear
license, secure storage, deletion support, and expert privacy review. Processed
audio must not be described as anonymous. `Voice-protected` can describe
reduced voice features, but it is not a promise that identification is
impossible.

Technical architecture, detailed data schemas, deployment, corpus release
policy, licensing, and detailed privacy controls belong in separate documents.
