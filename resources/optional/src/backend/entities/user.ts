/* "@airdev/next": "seeded" */

import { UserEmailPayload } from '@/common/types/data/user';
import { privateAppConfig } from '@/config/private-app';
import { publicAppConfig } from '@/config/public-app';
import { UserEntityBase } from '@/generated/entities/user';

export class UserEntity extends UserEntityBase {
  /** computed sync fields */

  public getThisUserId = () => this.context.currentUser?.id ?? null;

  public getIsAdmin = () =>
    privateAppConfig.admin.emails.includes(this.email) || this.isAdminRaw;

  public getVerifiedEmail = () =>
    this.emailVerified === null ? null : this.email;

  /** computed async fields */

  public async getEmailPayload(): Promise<UserEmailPayload> {
    return {
      name: (this.name ?? this.email.split('@')[0]).split(' ')[0],
      imageUrl: this.imageUrl ?? publicAppConfig.app.logoUrl,
    };
  }
}
