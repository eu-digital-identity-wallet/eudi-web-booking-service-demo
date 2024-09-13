 export interface BookingCreateResponse {
    url: string;
    bookingId?: string;
  }
  
export interface PersonalInfo {
family_name: string | null;
given_name: string | null;
date_of_birth: string | null;
}

export interface VerificationResponse {
status: boolean;
personalInfo?: PersonalInfo;
}

export interface IssueConfirmationRespone {
  requestUri: string;
  otp?: string; // Optional field
}