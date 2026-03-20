// import { UserSearchService } from '@/backend/services/data/user-search';
import { intersect } from '@/backend/utils/object';

import { APP_LOGO_URL } from '@/common/config';
import { UserEmailPayload } from '@/common/types/data/user';

import { ADMIN_EMAILS } from '@/backend/config';
import { Context } from '@/framework/context';
import { UserEntityBase } from '@/generated/entities/user';
import { UserPrimitiveField } from '@/generated/types/user';

export class UserEntity extends UserEntityBase {
  protected static async afterCreate(
    _one: UserEntityBase,
    _rc: Context
  ): Promise<void> {
    // await new UserSearchService().indexOne(one as UserEntity, rc);
  }

  protected static async afterUpdate(
    _oneBefore: UserEntityBase,
    _oneAfter: UserEntityBase,
    updatedFields: UserPrimitiveField[],
    _rc: Context
  ): Promise<void> {
    if (intersect<UserPrimitiveField>(updatedFields, ['name'])) {
      // await new UserSearchService().indexOne(oneAfter as UserEntity, rc);
    }
  }

  protected static async beforeDelete(
    _oneBefore: UserEntityBase,
    _rc: Context
  ): Promise<void> {
    // await new UserSearchService().unindexOne(oneBefore as UserEntity, rc);
  }

  /** computed sync fields */

  public getThisUserId = () => this.context.currentUser?.id ?? null;

  public getIsAdmin = () =>
    ADMIN_EMAILS.includes(this.email) ||
    (this.emailVerified !== null &&
      this.email.endsWith('@nanoindies.com') &&
      !this.email.includes('+'));

  public getVerifiedEmail = () =>
    this.emailVerified === null ? null : this.email;

  /** computed async fields */

  public async getEmailPayload(): Promise<UserEmailPayload> {
    return {
      name: (this.name ?? this.email.split('@')[0]).split(' ')[0],
      imageUrl: this.imageUrl ?? APP_LOGO_URL,
    };
  }
}
