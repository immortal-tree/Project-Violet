/**
 * Impact Score Calculation
 * Weights reflect the "invisible work" philosophy:
 * - PR reviews score higher than raw commits (reviews help others ship)
 * - Unblocking/mentoring weighted heavily (multiplicative team effect)
 * - Bug catches weighted by severity (silent bugs = high impact)
 */
export const IMPACT_WEIGHTS = {
  prReviews:           2.5,   // per review
  developersHelped:    8.0,   // per unique person helped (unblocking)
  bugsPrevented:       4.0,   // per bug caught in review
  majorFeaturesImpacted: 15.0, // per feature they influenced
  slackThreadsAnswered: 1.8,  // per thread resolved
  jiraTicketsResolved: 3.0,   // per ticket
  documentationUpdated: 2.0,  // per doc update
  mentoringSessions:   6.0,   // per session flagged in Slack/Jira
};

export function calculateImpactScore(contributor) {
  const s = contributor.stats;
  return Math.round(
    (s.prReviews           * IMPACT_WEIGHTS.prReviews) +
    (s.developersHelped    * IMPACT_WEIGHTS.developersHelped) +
    (s.bugsPrevented       * IMPACT_WEIGHTS.bugsPrevented) +
    (s.majorFeaturesImpacted * IMPACT_WEIGHTS.majorFeaturesImpacted) +
    (s.slackThreadsAnswered * IMPACT_WEIGHTS.slackThreadsAnswered) +
    (s.jiraTicketsResolved * IMPACT_WEIGHTS.jiraTicketsResolved) +
    (s.documentationUpdated * IMPACT_WEIGHTS.documentationUpdated) +
    (s.mentoringSessions   * IMPACT_WEIGHTS.mentoringSessions)
  );
}

export const CONTRIBUTORS = [
  {
    id: "c001",
    name: "Isabella Ray",
    role: "Senior Developer",
    team: "Platform",
    avatar: null, // use initials avatar
    tagline: "Not all heroes wear capes. Some review pull requests at 2 AM.",
    stats: {
      prReviews: 412, developersHelped: 38, bugsPrevented: 27,
      majorFeaturesImpacted: 3, slackThreadsAnswered: 89,
      jiraTicketsResolved: 44, documentationUpdated: 12, mentoringSessions: 7
    },
    sources: { github: true, slack: true, jira: true },
    lastActivity: "2024-05-02",
  },
  {
    id: "c002",
    name: "Marcus Hale",
    role: "Backend Engineer",
    team: "Infrastructure",
    avatar: null,
    tagline: "The person who keeps everything running while everyone else ships.",
    stats: {
      prReviews: 183, developersHelped: 27, bugsPrevented: 19,
      majorFeaturesImpacted: 2, slackThreadsAnswered: 134,
      jiraTicketsResolved: 68, documentationUpdated: 8, mentoringSessions: 5
    },
    sources: { github: true, slack: true, jira: true },
    lastActivity: "2024-04-28",
  },
  {
    id: "c003",
    name: "Aria Patel",
    role: "QA Engineer",
    team: "Quality",
    avatar: null,
    tagline: "Found edge cases others missed and improved quality, quietly.",
    stats: {
      prReviews: 97, developersHelped: 14, bugsPrevented: 44,
      majorFeaturesImpacted: 4, slackThreadsAnswered: 56,
      jiraTicketsResolved: 112, documentationUpdated: 22, mentoringSessions: 3
    },
    sources: { github: false, slack: true, jira: true },
    lastActivity: "2024-05-01",
  },
  {
    id: "c004",
    name: "Rohan Iyer",
    role: "DevOps Engineer",
    team: "Infrastructure",
    avatar: null,
    tagline: "Resolved 68 incidents. Kept systems stable.",
    stats: {
      prReviews: 78, developersHelped: 31, bugsPrevented: 12,
      majorFeaturesImpacted: 5, slackThreadsAnswered: 201,
      jiraTicketsResolved: 68, documentationUpdated: 31, mentoringSessions: 9
    },
    sources: { github: true, slack: true, jira: true },
    lastActivity: "2024-04-30",
  },
  {
    id: "c005",
    name: "Meera Joseph",
    role: "Product Designer",
    team: "Design",
    avatar: null,
    tagline: "Shaped 42 features. Aligned 6 teams.",
    stats: {
      prReviews: 34, developersHelped: 22, bugsPrevented: 6,
      majorFeaturesImpacted: 8, slackThreadsAnswered: 178,
      jiraTicketsResolved: 55, documentationUpdated: 18, mentoringSessions: 11
    },
    sources: { github: false, slack: true, jira: true },
    lastActivity: "2024-05-02",
  },
  {
    id: "c006",
    name: "Kabir Singh",
    role: "Support Engineer",
    team: "Support",
    avatar: null,
    tagline: "Answered 256 threads. Calmed many storms.",
    stats: {
      prReviews: 12, developersHelped: 19, bugsPrevented: 8,
      majorFeaturesImpacted: 1, slackThreadsAnswered: 312,
      jiraTicketsResolved: 201, documentationUpdated: 45, mentoringSessions: 6
    },
    sources: { github: false, slack: true, jira: true },
    lastActivity: "2024-04-25",
  },
];

// Derive impact scores and sort
export const CONTRIBUTORS_RANKED = CONTRIBUTORS
  .map(c => ({ ...c, impactScore: calculateImpactScore(c) }))
  .sort((a, b) => b.impactScore - a.impactScore);

export const LETTERS = [
  {
    id: "l001",
    recipientId: "c001",
    status: "draft",             // draft | pending_review | approved | delivered
    scheduledDate: "2024-05-24",
    generatedAt: "2024-05-20",
    body: `Dear Isabella,\n\nOver the past six months, you've reviewed 412 pull requests and helped 38 different engineers ship their work with confidence.\n\nYour thoughtful reviews, clear suggestions, and patience have made our codebase stronger and our team better.\n\nThe late-night feedback you left on PR #482 helped prevent a critical bug. The guidance you shared in #backend-help unblocked countless teammates.\n\nImpact like yours often goes unseen.\nWe see it. And we're grateful.\n\nThank you for being the kind of engineer every team hopes to have.\n\n— The Team`,
    signals: {
      github: ["Reviewed PR #482 — Apr 12", "Commented on PR #317 — Apr 18", "Reviewed PR #638 — May 2", "+180 more"],
      slack: ["#backend-help — Mar 3", "#onboarding — Mar 7", "#deployments — Apr 21", "+34 more"],
      jira: ["Resolved INC-1042 — Mar 6", "Updated ticket BUG-2087 — Mar 11", "Commented on TASK-771 — Apr 5", "+22 more"],
    }
  },
  {
    id: "l002",
    recipientId: "c002",
    status: "delivered",
    scheduledDate: "2024-05-22",
    generatedAt: "2024-05-18",
    deliveredAt: "2024-05-22",
    body: `Dear Marcus,\n\nYou have a rare gift for turning messy ideas into clear, beautiful systems that everyone can rely on. Your quiet diligence behind the scenes unblocks our core platform systems constantly.\n\nThank you for being the foundation of our engineering team.\n\n— The Team`,
    signals: { github: [], slack: [], jira: [] }
  },
  {
    id: "l003",
    recipientId: "c004",
    status: "delivered",
    scheduledDate: "2024-05-20",
    generatedAt: "2024-05-16",
    deliveredAt: "2024-05-20",
    body: `Dear Rohan,\n\nWhen things break, you are the calm in the chaos. Thank you for keeping everyone grounded and maintaining our systems with such care.\n\n— The Team`,
    signals: { github: [], slack: [], jira: [] }
  },
];

export const ACTIVITY_FEED = [
  { id: "a1", contributorId: "c001", type: "answer", label: "Answered a question that unblocked the team", date: "Feb 3, 2024", source: "slack" },
  { id: "a2", contributorId: "c001", type: "code",   label: "Suggested a better approach in PR #482",     date: "Mar 12, 2024", source: "github" },
  { id: "a3", contributorId: "c001", type: "shield", label: "Caught a critical issue in review",          date: "Apr 7, 2024",  source: "github" },
  { id: "a4", contributorId: "c001", type: "mentor", label: "Mentored a new team member",                 date: "May 2, 2024",  source: "slack" },
];

export const UPCOMING_TASKS = [
  { id: "t1", type: "draft_ready",   contributorId: "c001", label: "Draft ready for Isabella Ray",         dueDate: "May 24, 2024" },
  { id: "t2", type: "generate",      contributorId: "c003", label: "Generate letter for Aria Patel",       dueDate: null },
  { id: "t3", type: "pending_review",contributorId: "c002", label: "Review draft for Marcus Hale",        dueDate: "May 26, 2024" },
];

export const MOCK_USER = {
  name: "Violet Evergarden",
  role: "Project Admin",
  avatar: null,
  workspace: "Acme Engineering",
  connectedSources: ["github", "slack", "jira"],
};

export const WORKSPACE_SOURCES = [
  { id: "github", label: "GitHub",  icon: "github",  color: "#6e40c9" },
  { id: "slack",  label: "Slack",   icon: "slack",   color: "#4a154b" },
  { id: "jira",   label: "Jira",    icon: "jira",    color: "#0052cc" },
  { id: "notion", label: "Notion",  icon: "notion",  color: "#ffffff" },
];
