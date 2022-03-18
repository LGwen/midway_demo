import { Rule, RuleType } from '@midwayjs/decorator';

// 验证请求参数
export class adminDto {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  pwd: string;
}
