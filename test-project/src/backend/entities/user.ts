import { APP_LOGO_URL } from '@/common/config';
import { UserEmailPayload } from '@/common/types/data/user';

import { Context } from '@/framework/context';
import { UserEntityBase } from '@/generated/entities/user';
import { UserPrimitiveField } from '@/generated/types/user';
import { intersect } from '@/backend/utils/object';

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

  public getIsAdmin = () => this.isAdmin;

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
