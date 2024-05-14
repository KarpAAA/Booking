import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from "./casl-ability.factory/casl-ability.factory";
import { PoliciesGuard } from "../../guard/polices.guard";

@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
