import { Injectable } from "@nestjs/common";
import { User } from "../../../entities/user/user.model";
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Apartment } from "../../../entities/appartment/apartment.model";
import { Reservation } from "../../../entities/reservation/reservation.model";
import { Role } from "../../../entities/user/role.type";

export enum Action {
  Manage = "manage",
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

type Subjects = InferSubjects<typeof Apartment | typeof Reservation | typeof User> | "all";
// use createMongoAbility function instead and MongoAbility<Abilities> interface.

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user) {
      if (user.role === Role.OWNER) {
        // @ts-ignore
        can([Action.Update, Action.Delete], Apartment, { "owner.id": user.id });
        can(Action.Create, Apartment);
      } else if (user.role === Role.USER) {
        can([Action.Create, Action.Read], Reservation);
      }

      can(Action.Read, User, { id: user.id });
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>
    });
  }
}