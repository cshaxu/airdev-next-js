export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  imageUrl: string | null;
  isAdmin: boolean;
  createdAt: Date;
};
