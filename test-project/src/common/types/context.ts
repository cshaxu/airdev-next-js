import { SelectedUserResponse } from '@/generated/types/user';

export const CurrentUserFieldRequest = {
  id: true,
  email: true,
  name: true,
  imageUrl: true,
  isAdmin: true,
  createdAt: true,
};

export type CurrentUser = SelectedUserResponse<typeof CurrentUserFieldRequest>;
