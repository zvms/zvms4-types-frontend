interface Activity {
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

interface Registration {
  deadline: string // ISO-8601
  place: string
  duration: number // Predicted duration in hours.
  classes: ClassRegistration[]
}

interface ClassRegistration {
  classid: number
  min?: number
  max: number
}

interface ActivityMember {
  _id: string // ObjectId
  status: 'draft' | 'pending' | 'effective' | 'refused' | 'rejected'
  impression: string
  mode: 'on-campus' | 'off-campus' | 'social-practice'
  duration: number
  history: ActivityMemberHistory[]
  images: string[]
}

interface ActivityMemberHistory {
  impression: string
  duration: number // hours
  time: string // ISO-8601
  actioner: string // ObjectId
  action: 'draft' | 'pending' | 'effective' | 'refused' | 'rejected'
}

type ActivityType = Activity['type']

type MemberActivityStatus = ActivityMember['status']

type ActivityStatus = Activity['status']

type ActivityMode = ActivityMember['mode']

interface SpecifiedActivity extends Activity {
  type: 'specified'
  registration: Registration
}

interface SocialActivity extends Activity {
  type: 'social'
}

interface ScaleActivity extends Activity {
  type: 'scale'
  url: string // FTP Social Practice Report Location.
}

interface Special {
  classify: 'prize' | 'import' | 'club' | 'deduction' | 'other'
  prize?: string // ObjectId
  origin?: string // Path to the file.
  reason?: string
}

type SpecialActivityClassification = Special['classify']

interface PrizeSpecial extends Special {
  classify: 'prize'
  prize: string // ObjectId
}

interface ImportSpecial extends Special {
  classify: 'import'
  origin: string // Path to the file.
}

interface ClubSpecial extends Special {
  classify: 'club'
}

interface DeductionSpecial extends Special {
  classify: 'deduction'
  reason: string
}

type SpecialInstance =
  | PrizeSpecial
  | ImportSpecial
  | ClubSpecial
  | DeductionSpecial
  | Special

interface SpecialActivity extends Activity {
  type: 'special'
  special: SpecialInstance
}

type ActivityInstance = SpecifiedActivity | SocialActivity | ScaleActivity | SpecialActivity

interface Class {

}

interface Feedback {
  _id: string;
  title: string;
  content: string;
  time: string; // ISO-8601
  publisher: string;
}

interface LoginResult {
  token: string // JSON Web Token
  _id: string // MongoDB ObjectID
}

interface Notification {
  _id: string
  global: boolean
  title: string
  content: string
  time: string // ISO-8601
  publisher: string
  receivers?: string[] // ObjectId[]
  route?: string // Route to URL
  anonymous: boolean
  expire: string // ISO-8601
  type: 'pin' | 'important' | 'normal'
}

interface BraodcastNotification extends Notification {
  global: true
}

interface SendNotification extends Notification {
  global: false
  receivers: string[] // ObjectId[]
}

type NotificationInstance = BraodcastNotification | SendNotification

interface SocialPractice {
  name: string
  origin: string // Department
  charger: string // Person in Charge, ObjectId
  content: string // Practice Content, Support `Markdown`, planning to support $\LATEX{}$
  validity: string // Register Deadline, ISO 8601
  status: 'pending' | 'effective' | 'refused'
}

interface SuccessResponse<T> {
  status: 'ok'
  data: T
  code: number
}

interface ErrorResponse {
  status: 'error'
  message: string
  code: number
}

interface BadRequestResponse extends ErrorResponse {
  code: 400
}

interface UnauthorizedResponse extends ErrorResponse {
  code: 401
}

interface ForbiddenResponse extends ErrorResponse {
  code: 403
  permission: number
}

interface NotFoundResponse extends ErrorResponse {
  code: 404
}

interface ConflictResponse extends ErrorResponse {
  code: 409
}

interface InternalErrorResponse extends ErrorResponse {
  code: 500
}

interface NotImplementedResponse extends ErrorResponse {
  code: 501
}

interface BadGatewayResponse extends ErrorResponse {
  code: 502
}

interface ServiceUnavailableResponse extends ErrorResponse {
  code: 503
}

interface GatewayTimeoutResponse extends ErrorResponse {
  code: 504
}

interface UnknownResponse extends ErrorResponse {
  code: 0
}

type ErrorResponseInstance =
  | BadRequestResponse
  | UnauthorizedResponse
  | ForbiddenResponse
  | NotFoundResponse
  | ConflictResponse
  | InternalErrorResponse
  | NotImplementedResponse
  | BadGatewayResponse
  | ServiceUnavailableResponse
  | GatewayTimeoutResponse
  | UnknownResponse

type Response<T> = SuccessResponse<T> | ErrorResponseInstance

interface LongTermToken {
  _id: string
  token: string
  user: string
  expire: string // ISO-8601
}

interface ShortTermToken { // Only 30 minutes
  _id: string
  token: string
  user: string
}

interface Trophy {
  _id: string // ObjectId
  name: string
  type: 'academic' | 'art' | 'sports' | 'others'
  level: 'district' | 'city' | 'province' | 'national' | 'international'
  awards: TrophyAward[]
  team: boolean
  status: 'pending' | 'effective' | 'refused'
  members: TrophyMember[]
  creator: string // ObjectId
  instructor: string // Leading Teacher
  deadline: string // ISO 8601
  time: string // ISO 8601
  createdAt: string // ISO 8601
}

type TrophyStatus = Trophy['status']
type TrophyType = Trophy['type']
type TrophyLevel = Trophy['level']

interface TrophyAward {
  name: string
  duration: number
}

interface TrophyMember {
  _id: string // ObjectId
  award: string // Bind the `trophy.awards'
  mode: 'on-campus' | 'off-campus'
  status: 'pending' | 'effective' | 'refused'
}

interface User {
  _id: string // ObjectId
  id: number
  name: string
  sex: 'male' | 'female' | 'unknown'
  position: UserPosition[]
  code: number
}

type UserPosition = 'system' | 'admin' | 'auditor' | 'department' | 'secretary' | 'student'

type WithPassword<T> = {
  password: string
} & T

interface UserLogin {
  id: number
  password: string
}

interface ClassType {
  type: 'Z' | 'J'
  grade: number
  year: number
  class: number
  number: number
}

interface UserActivityTimeSums {
  onCampus: number
  offCampus: number
  socialPractice: number
  trophy: number
}

interface Group {
  _id: string; // ObjectId
  name: string;
  type: "class" | "permission" | "group";
  description?: string;
  permissions: UserPosition[];
}

export type { Activity, ActivityInstance, ActivityMember, ActivityMemberHistory, ActivityMode, ActivityStatus, ActivityType, BadGatewayResponse, BadRequestResponse, BraodcastNotification, Class, ClassRegistration, ClassType, ClubSpecial, ConflictResponse, DeductionSpecial, ErrorResponse, ErrorResponseInstance, Feedback, ForbiddenResponse, GatewayTimeoutResponse, Group, ImportSpecial, InternalErrorResponse, LoginResult, LongTermToken, MemberActivityStatus, NotFoundResponse, NotImplementedResponse, Notification, NotificationInstance, PrizeSpecial, Registration, Response, ScaleActivity, SendNotification, ServiceUnavailableResponse, ShortTermToken, SocialActivity, SocialPractice, Special, SpecialActivity, SpecialActivityClassification, SpecialInstance, SpecifiedActivity, SuccessResponse, Trophy, TrophyAward, TrophyLevel, TrophyMember, TrophyStatus, TrophyType, UnauthorizedResponse, UnknownResponse, User, UserActivityTimeSums, UserLogin, UserPosition, WithPassword };
