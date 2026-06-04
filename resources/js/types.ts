// Shared Inertia prop types

export interface Programme {
  key: string
  emoji: string
  name: string
  subtitle: string
  short_desc: string
  full_desc: string
  days: string
  schedule: string
  experience: string[]
  activities: string[]
  outcome_text: string
  about_outcomes: string[]
}

// Slimmer shape sent to the Register page
export interface ProgrammeSlim {
  key: string
  emoji: string
  name: string
  short_desc: string
  days: string
  schedule: string
}

// Slimmer shape sent to the About page
export interface ProgrammeAbout {
  key: string
  emoji: string
  name: string
  desc: string
  outcomes: string[]
  days: string
}

export interface EventData {
  start_date: string              // "15 Jun 2026"
  end_date: string                // "13 Mar 2027"
  start_date_raw: string          // "2026-06-15"
  end_date_raw: string            // "2027-03-13"
  weekday_time: string
  weekend_time: string
  phone: string
  age_group_min: number
  age_group_max: number
  fee_1_bundle: number
  fee_2_bundles: number
  fee_3_bundles: number
  registration_open_date: string  // "May 01, 2026"
}
