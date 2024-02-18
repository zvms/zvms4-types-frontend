export interface Activity {
  _id: string
  type: 'specified' | 'special' | 'social' | 'scale'
  name: string
  description: string
  members: ActivityMember[]
  date: string // ISO-8601
  createdAt: string // ISO-8601
  updatedAt: string // ISO-8601
  creator: string // ObjectId
  status: 'pending' | 'effective' | 'refused'
  url?: string // FTP Social Practice Report Location.
  special?: SpecialInstance
  registration?: Registration
}

export interface Registration {
  deadline: string // ISO-8601
  place: string
  duration: number // Predicted duration in hours.
  classes: ClassRegistration[]
}

export interface ClassRegistration {
  class: number
  min?: number
  max: number
}

export interface ActivityMember {
  _id: string // ObjectId
  status: 'draft' | 'pending' | 'effective' | 'refused' | 'rejected'
  impression: string
  mode: 'on-campus' | 'off-campus' | 'social-practice'
  duration: number
  history: ActivityMemberHistory[]
  images: string[]
}

export interface ActivityMemberHistory {
  impression: string
  duration: number // hours
  time: string // ISO-8601
  actioner: string // ObjectId
  action: 'draft' | 'pending' | 'effective' | 'refused' | 'rejected'
}

export type ActivityType = Activity['type']

export type MemberActivityStatus = ActivityMember['status']

export type ActivityStatus = Activity['status']

export type ActivityMode = ActivityMember['mode']

export interface SpecifiedActivity extends Activity {
  type: 'specified'
  registration: Registration
}

export interface SocialActivity extends Activity {
  type: 'social'
}

export interface ScaleActivity extends Activity {
  type: 'scale'
  url: string // FTP Social Practice Report Location.
}

export interface Special {
  classify: 'prize' | 'import' | 'club' | 'deduction' | 'other'
  prize?: string // ObjectId
  origin?: string // Path to the file.
  reason?: string
}

export type SpecialActivityClassification = Special['classify']

export interface PrizeSpecial extends Special {
  classify: 'prize'
  prize: string // ObjectId
}

export interface ImportSpecial extends Special {
  classify: 'import'
  origin: string // Path to the file.
}

export interface ClubSpecial extends Special {
  classify: 'club'
}

export interface DeductionSpecial extends Special {
  classify: 'deduction'
  reason: string
}

export type SpecialInstance =
  | PrizeSpecial
  | ImportSpecial
  | ClubSpecial
  | DeductionSpecial
  | Special

export interface SpecialActivity extends Activity {
  type: 'special'
  special: SpecialInstance
}

export type ActivityInstance = SpecifiedActivity | SocialActivity | ScaleActivity | SpecialActivity
