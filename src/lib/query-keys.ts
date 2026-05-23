export const queryKeys = {
  categories: ["categories"] as const,
  users: ["users"] as const,
  adminStats: ["admin", "stats"] as const,
  userProfile: (userId: string) => ["users", userId] as const,
};
