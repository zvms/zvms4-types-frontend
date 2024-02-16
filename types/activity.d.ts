export interface Activity {
  _id: string
  type: ActivityType
  name: string
  description: string
  members: ActivityMember[]
  date: string // ISO-8601
  createdAt: string // ISO-8601
  updatedAt: string // ISO-8601
  creator: string // ObjectId
  status: ActivityStatus
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
  status: MemberActivityStatus
  impression: string
  mode: ActivityMode
  duration: number
  history: ActivityMemberHistory[]
  images: string[]
}

export interface ActivityMemberHistory {
  impression: string
  duration: number // hours
  time: string // ISO-8601
  actioner: string // ObjectId
  action: MemberActivityStatus
}

export type ActivityType = 'specified' | 'special' | 'social' | 'scale'

export type MemberActivityStatus = 'draft' | 'pending' | 'effective' | 'refused' | 'rejected'

export type ActivityStatus = 'pending' | 'effective' | 'refused'

export type ActivityMode = 'on-campus' | 'off-campus' | 'social-practice'

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

export type SpecialActivityClassification = 'prize' | 'import' | 'club' | 'deduction' | 'other'

export interface Special {
  classify: SpecialActivityClassification
}

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
