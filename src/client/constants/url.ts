export const URLS = {
  create: "/api/booking/create",
  verify: (bookingId: string) => `/api/booking/verification/${bookingId}`,
  confirmation: (bookingId: string) => `/api/booking/issue-confirmation/${bookingId}`,
};
